const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.post('/resetpassword', async (req, res) => {
  const { email, password } = req.body;
  let user = User.findOne({ email });

  console.log('from /register server route: ', req.body);
  
  try {
    user.setPassword(password);
    const newUser = await user.save().catch(e => err = e);

    res.status(200).json(newUser.toAuthJSON());
  } catch (err) {
    console.error('Something went wrong attempting to create the new user account.', err);
    res.status(500).json({ message: 'Error attempting to create new user account', err });
  }
});

module.exports = router;