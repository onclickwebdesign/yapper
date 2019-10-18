const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Yip = mongoose.model('Yip');
const verify = require('./verify');
const { s3upload, getMonthName } = require('../../util/utilities');

// get user by handle
router.get('/:handle', verify.optional, async (req, res) => {
  const id = req.payload ? req.payload.id : null;

  let err;
  const user = await User.findOne({ handle: req.params.handle }).catch(e => err = e);
  if (!user) {
    res.status(404).json({ success: false, message: 'A user with that handle was not found.' });
  }

  const authUser = id ? await User.findById(id) : null;

  const yips = await Yip.find({ userId: user._id }).sort({createdDate: 'descending'}).catch(e => err = e);

  if (err) {
    console.error('Error: ', err);
    res.status(500).json({ success: false, message: 'Error: ' + err });
  }

  if (!user) {
    res.status(404).json({
      msg: 'No user was found with that handle.'
    });
  }

  const { email, handle, fullName, profileImage, landscapeImage, locationCity, locationState, employer, occupation } = user;

  const joinedDate = new Date(user.date);

  res.status(200).json({
    email, handle, fullName, profileImage, landscapeImage, locationCity, locationState, employer, occupation,
    account: user.account,
    yipCount: yips.length,
    yips,
    followerCount: user.followers.length,
    followingCount: user.following.length,
    dateJoined: `${getMonthName(joinedDate.getMonth())} ${joinedDate.getFullYear()}`,
    isFollowing: id ? authUser.following.indexOf(user._id) > -1 : null
  });
});

// get currently logged in user
router.get('/', verify.required, async (req, res) => {
  const { payload: { id } } = req;

  let err;
  const user = await User.findById(id).catch(e => err = e);
  const yips = await Yip.find({userId: id}).catch(e => err = e);

  if (err) {
    console.error('Mongo error: ', err);
  }

  if (!user) {
    res.status(404).json({
      msg: 'No user was found'
    });
  }

  const { email, handle, fullName, profileImage, landscapeImage, locationCity, locationState, employer, occupation } = user;

  const joinedDate = new Date(user.date);

  res.status(200).json({
    email, handle, fullName, profileImage, landscapeImage, locationCity, locationState, employer, occupation,
    account: user.account,
    yipCount: yips.length,
    followerCount: user.followers.length,
    followingCount: user.following.length,
    dateJoined: `${getMonthName(joinedDate.getMonth())} ${joinedDate.getFullYear()}`
  });
});

// follow a user
router.post('/follow/:handle', verify.required, async (req, res) => {
  const { payload: { id } } = req;
  const followee = await User.findOneAndUpdate({ handle: req.params.handle }, { $push: { followers: id } }, { new: true });
  if (!followee) {
    res.status(404).json({ message: 'Could not follow, the user was not found.' });
  }

  User.findByIdAndUpdate(id, { $push: { following: followee._id } }, { new: true }).then(() => 
    res.status(201).json({ success: true, message: 'User followed successfully.', followerCount: followee.followers.length })
  ).catch(e => res.status(500).json({ success: false, message: 'Error following user.', error: e }));
});

// unfollow a user
router.post('/unfollow/:handle', verify.required, async (req, res) => {
  const { payload: { id } } = req;
  const followee = await User.findOneAndUpdate({ handle: req.params.handle }, { $pullAll: { followers: [id] } }, { new: true });
  if (!followee) {
    res.status(404).json({ message: 'Could not follow, the user was not found.' });
  }

  User.findByIdAndUpdate(id, { $pullAll: { following: [followee._id] } }, { new: true }).then(() => 
    res.status(201).json({ success: true, message: 'User has been unfollowed successfully.', followerCount: followee.followers.length })
  ).catch(e => res.status(500).json({ success: false, message: 'Error following user.', error: e }));
});

router.post('/updateprofilepicture/:type', verify.required, async (req, res) => {
  const singleUpload = s3upload.single(req.params.type);
  const { payload: { id } } = req;
  req.s3Path = `${id}/profile/${req.params.type}-${Date.now().toString()}`;
  
  singleUpload(req, res, async err => {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]}); 
    }

    const profileImage = req.file ? req.file.location : 'Location_not_defined';

    User.findByIdAndUpdate(id, { profileImage }, { new: true }).then(() => 
      res.status(200).json({ success: true, message: 'Image uploaded successfully.', profileImage })
    ).catch(e => res.status(500).json({ success: false, message: 'Error setting user\'s profile picture in database.', error: e }));
  });
});

router.post('/updateprofile', verify.required, async (req, res) => {
  console.log('req body: ', req.body);
  const { payload: { id } } = req;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true }).catch(e => err = e);
  res.status(200).json({ success: true, message: 'Profile updated successfully.', user });
});

module.exports = router;