const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const passport = require('passport');

router.get('/login', async (req, res) => {
  passport.authenticate('local', {
    successRedirect: 'http://localhost:3001?fuck=ya',
    failureRedirect: 'http://localhost:3001?fuck=no',
  })(req, res, next);

  // const user = await User.findOne({ email: req.query.email });

  // if (!user || !user.validatePassword(req.query.password)) {
  //   res.status(403).json({
  //     message: 'You have provided incorrect credentials'
  //   });
  // } else {
  //   res.status(200).json(user.toAuthJSON());
  // }
});

router.post('/register', async (req, res) => {
  let user = new User({
    email: req.body.email,
    handle: req.body.handle
  });

  console.log('wtf: ', req.body);
  
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