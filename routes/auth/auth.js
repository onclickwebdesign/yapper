const router = require('express').Router();
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
const passport = require('passport');
require('dotenv').config();

router.post('/login', passport.authenticate('local'), async (req, res, next) => {
  console.log('user from authjs: ', req.user);

  if (!req.user) {
    res.status(403).json({
      message: 'You have provided incorrect credentials',
      redirect: `${process.env.webUrl}?success=no`
    });
  } else {
    res.status(200).json({
      user: req.user.toAuthJSON(),
      redirect: `${process.env.webUrl}?success=ya` 
    });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${process.env.webUrl}?loggedout=true`);
});

module.exports = router;