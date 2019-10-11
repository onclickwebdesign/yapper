const router = require('express').Router();
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
const passport = require('passport');
const { s3 } = require('../../util/utilities');
require('dotenv').config();

router.post('/login', passport.authenticate('local'), async (req, res, next) => {
  console.log('user from authjs: ', req.user);

  if (!req.user) {
    res.status(403).json({
      message: 'You have provided incorrect credentials',
      redirect: `${process.env.webUrl}?success=no`
    });
  } else {
    // get user profile pic from s3 bucket
    console.log('on login user id: ', req.user.id);
    //const profileImage = await s3.getObject({Bucket: 'yapper-bucket', Key: req.user.id + '/'})
    console.log('user image is: ', req.user.profileImage);
    res.status(200).json({
      user: { profileImage: req.user.profileImage, ...req.user.toAuthJSON() },
      redirect: '/' 
    });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${process.env.webUrl}?loggedout=true`);
});

module.exports = router;