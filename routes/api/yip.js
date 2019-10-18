const router = require('express').Router();
const axios = require('axios');
const mongoose = require('mongoose');
const Yip = mongoose.model('Yip');
const User = mongoose.model('User');
const verify = require('./verify');
const { s3upload, getDaysHoursFromNow, objectDateComparator } = require('../../util/utilities');
require('dotenv').config();

// get logged in user's timeline
router.get('/', verify.required, async (req, res) => {
  const { payload: { id } } = req;

  // let err;
  const user = await User.findById(id);
  const followingPromises = [];
  user.following.forEach(id => {
    followingPromises.push(Yip.find({ userId: id }).sort({ createdDate: 'descending' }).populate('userId', 'handle fullName profileImage -_id'));
  });

  const yipsArray = await Promise.all(followingPromises);

  let dateStampedYips = [];
  yipsArray.forEach(yips => {
    dateStampedYips = [...dateStampedYips, ...yips.map(yip => ({ timeStamp: getDaysHoursFromNow(new Date(yip.createdDate)), ...yip._doc }))];
  });
  
  dateStampedYips.sort(objectDateComparator); // sort yips by most recent first

  res.status(200).json({ yips: dateStampedYips });
});

// get all yips from a specific user
router.get('/:handle', async (req, res) => {
  let err;
  const user = await User.findOne({ handle: req.params.handle }).catch(e => err = e);
  if (!user) {
    res.status(404).json({ success: false, message: 'No user was found with that handle.' });
  }

  const yips = await Yip.find({userId: user._id}).sort({createdDate: 'descending'}).catch(e => err = e);
  if (err) {
    res.status(500).json({ success: false, message: 'Error retrieving Yips.' });
  }

  const dateStampedYips = yips.map(yip => ({ timeStamp: getDaysHoursFromNow(new Date(yip.createdDate)), ...yip._doc }));
  res.status(200).json({ yips: dateStampedYips });
});

// post a new yip
router.post('/', verify.required, async (req, res) => {
  const { payload: { id } } = req;
  const { body, gif } = req.body;
  
  const yip = new Yip({
    userId: id,
    body,
    gif: gif || null
  });

  let err;
  const newYip = await yip.save().catch(e => err = e);
  if (err) {
    console.log('Error saving new yip: ', err);
    res.status(500).json({ success: false, error: err });
  }

  res.status(200).json({ success: true, message: 'Yip posted successfully.', newYip });
});

// post a new yip with media attached
router.post('/:type/:count', verify.required, async (req, res) => {
  const { payload: { id } } = req;
  const yip = new Yip({
    userId: id,
  });

  let err;
  const newYip = await yip.save().catch(e => err = e);
  if (err) {
    console.log('Error saving new yip: ', err);
    res.status(500).json({ success: false, error: err });
  }

  if (req.params.type && req.params.count) {
    req.s3Path = `${id}/yips/${newYip._id}/${req.params.type}-`;

    const multiUpload = s3upload.array(req.params.type, +req.params.count);
    multiUpload(req, res, async err => {
      if (err) {
        return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]}); 
      }

      const images = req.files ? req.files.map(file => file.location) : ['Location_not_defined'];
      const theYip = await Yip.findByIdAndUpdate(newYip._id, { body: req.body.yipBody, images }, { new: true }).catch(e => err = e);
      res.status(200).json({ success: true, message: 'Yip posted successfully.', theYip });
    });
  } else {
    res.status(200).json({ success: true, message: 'Yip posted successfully.', newYip });
  }
});

// GIF functionality
router.get('/gif/searchgifs', async (req, res) => {
  const query = req.query.search;
  const limit = req.query.limit;
  try {
    const gifs = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}&limit=${limit}&offset=0&lang=en`);
    // const gifs = result.data;
    res.status(200).json(gifs.data);
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error retrieving gifs.', error: e });
  }

});

module.exports = router;