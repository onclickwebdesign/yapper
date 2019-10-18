const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Yip = mongoose.model('Yip');
const verify = require('./verify');
const { s3upload, getMonthName } = require('../../util/utilities');


/*
 * Gets top trending and popular user objects.
 * It includes optional token verification.
 * If a token is included in the request headers, then the response will include a boolean of whether or not the verified user is following each user.
 */
router.get('/explore', verify.optional, async (req, res) => {
  const id = req.payload ? req.payload.id : null;
  let users = await User.find().select('handle fullName followers followerCount followingCount employer occupation profileImage -_id').sort({ followingCount: 'descending', yipCount: 'descending' }).limit(10);

  // todo eric: still need to filter out the currently logged in user from the explore list...

  if (id !== null) {
    // add an isFollowing boolean flag to each user object
    users = users.map(user => ({ isFollowing: user.followers.indexOf(id) > -1, ...user._doc }));
  }

  res.status(200).json({ success: true, users });
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
  const followee = await User.findOneAndUpdate({ handle: req.params.handle }, { $push: { followers: id }, $inc: { followerCount: 1 } }, { new: true });
  if (!followee) {
    res.status(404).json({ message: 'Could not follow, the user was not found.' });
  }

  User.findByIdAndUpdate(id, { $push: { following: followee._id }, $inc: { followingCount: 1 } }, { new: true }).then(() => 
    res.status(201).json({ success: true, message: 'User followed successfully.', followerCount: followee.followerCount })
  ).catch(e => res.status(500).json({ success: false, message: 'Error following user.', error: e }));
});

// unfollow a user
router.post('/unfollow/:handle', verify.required, async (req, res) => {
  const { payload: { id } } = req;
  const followee = await User.findOneAndUpdate({ handle: req.params.handle }, { $pullAll: { followers: [id] }, $inc: { followingCount: -1 } }, { new: true });
  if (!followee) {
    res.status(404).json({ message: 'Could not follow, the user was not found.' });
  }

  User.findByIdAndUpdate(id, { $pullAll: { following: [followee._id] }, $inc: { followingCount: -1 } }, { new: true }).then(() => 
    res.status(201).json({ success: true, message: 'User has been unfollowed successfully.', followerCount: followee.followerCount })
  ).catch(e => res.status(500).json({ success: false, message: 'Error following user.', error: e }));
});

// update current user's profile picture
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
  const { payload: { id } } = req;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true }).catch(e => err = e);
  res.status(200).json({ success: true, message: 'Profile updated successfully.', user });
});

/*
 * Gets a user object by their handle.
 * It includes optional token verification.
 * If a token is included in the request headers, then the response will include a boolean of whether or not the verified user is following this user.
 */
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

module.exports = router;