const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Yip = mongoose.model('Yip');
const verify = require('./verify');
const util = require('../../util/utilities');

// get currently logged in user
router.get('/', verify.required, async (req, res) => {
  console.log('req.payload is: ', req.payload);
  
  const { payload: { id } } = req;
  console.log('id is: ', id);

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
    account: user.account,
    yipCount: yips.length
  });
});

router.post('/updateprofilepicture', verify.required, async (req, res) => {
  console.log(req.body);
  console.log('payload: ', req.payload);
  const params = {
    Key: req.payload.id + '/',
    Bucket: 'yapper-bucket',
    Body: req.body
  };

  const result = await util.s3.putObject(params);
  console.log('s3 result: ', result);
  res.status(200).json({ success: true, result });
});

router.post('/updateprofile', verify.required, async (req, res) => {
  console.log('req body: ', req.body);

  res.send('boomshakalaka');
});

module.exports = router;