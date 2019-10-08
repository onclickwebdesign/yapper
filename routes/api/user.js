const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const verify = require('./verify');

// get currently logged in user
router.get('/', verify.required, async (req, res) => {
  console.log('req.payload is: ', req.payload);
  
  const { payload: { id } } = req;
  console.log('id is: ', id);

  let err;
  const user = await User.findById(id).catch(e => err = e);

  if (err) {
    console.error('Mongo error: ', err);
  }

  if (!user) {
    res.status(200).json({
      msg: 'No user was found'
    });
  }

  res.status(200).json({
    handle: user.handle,
    email: user.email,
    account: user.account
  });
});

router.post('/updateprofile', verify.required, async (req, res) => {
  console.log('req body: ', req.body);

  res.send('boomshakalaka');
});

module.exports = router;