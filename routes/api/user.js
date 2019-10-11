const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Yip = mongoose.model('Yip');
const verify = require('./verify');
const { s3upload } = require('../../util/utilities');

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
    res.status(200).json({
      msg: 'No user was found'
    });
  }

  res.status(200).json({
    fullName: user.fullName,
    handle: user.handle,
    email: user.email,
    profileImage: user.profileImage,
    account: user.account,
    yipCount: yips.length
  });
});

router.post('/updateprofilepicture', verify.required, async (req, res) => {
  const singleUpload = s3upload.single('profileImage');
  const { payload: { id } } = req;
  
  singleUpload(req, res, async err => {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]}); 
    }

    const profileImage = req.file ? req.file.location : 'Location_not_defined';

    const user = await User.findByIdAndUpdate(id, { profileImage }, { new: true }).catch(e => err = e);
    res.status(200).json({ success: true, message: 'Image uploaded successfully.', profileImage });
  });
});

router.post('/updateprofile', verify.required, async (req, res) => {
  console.log('req body: ', req.body);

  res.send('boomshakalaka');
});

module.exports = router;