const router = require('express').Router();
const mongoose = require('mongoose');
const Yip = mongoose.model('Yip');
const User = mongoose.model('User');
const verify = require('./verify');

// get all yips from logged in user
router.get('/', verify.required, async (req, res) => {
  const { payload: { id } } = req;
  // const user = await User.findById(id).populate('yips').populate('yipBacks').populate('replys').catch(e => console.log('Error: ', e));
  // const user = await User.findById(id).populate('on');
  let err;
  const yips = await Yip.find({userId: id}).catch(e => err = e);

  if (err) {
    res.status(200).json({ success: false, message: 'Error retrieving Yips.' });
  }

  console.log('user yips: ', yips);
  res.status(200).json({ yips });
});

// post a new yip
router.post('/', verify.required, async (req, res) => {
  const { payload: { id } } = req;

  const yip = new Yip({
    userId: id,
    ...req.body
  });

  let err;
  const newYip = await yip.save().catch(e => err = e);
  if (err) {
    console.log('Error saving new yip: ', err);
    res.json({ success: false, error: err });
  }

  res.status(200).json({ success: true, yip: newYip });
});

module.exports = router;