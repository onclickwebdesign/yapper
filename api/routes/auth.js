const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');

router.get('/login', async (req, res) => {
  const user = await User.findOne({ email: req.query.email });

  if (!user || !user.validatePassword(req.query.password)) {
    res.status(403).json({
      message: 'You have provided incorrect credentials'
    });
  } else {
    res.status(200).json(user.toAuthJSON());
  }
});

router.get('/register', async (req, res) => {
  let user = new User({
    email: req.query.email,
    handle: req.query.handle
  });
  
  user.setPassword(req.query.password);

  let err;
  const newUser = await user.save().catch(e => err = e);

  if (err) {
    console.error('Something went wrong attempting to create the new user account.');
    res.status(500).json({ message: 'Error attempting to create new user account' });
  } else {
    res.status(200).json(newUser.toAuthJSON());
  }
});

module.exports = router;