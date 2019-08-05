const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
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

router.post('/register', async (req, res) => {
  let user = new User({
    email: req.body.email,
    handle: req.body.handle
  });

  console.log('from /register server route: ', req.body);
  
  try {
    user.setPassword(req.body.password);
    const newUser = await user.save().catch(e => err = e);

    res.status(200).json(newUser.toAuthJSON());
  } catch (err) {
    console.error('Something went wrong attempting to create the new user account.', err);
    res.status(500).json({ message: 'Error attempting to create new user account', err });
  }
});

module.exports = router;