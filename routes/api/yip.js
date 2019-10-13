const router = require('express').Router();
const axios = require('axios');
const mongoose = require('mongoose');
const Yip = mongoose.model('Yip');
const User = mongoose.model('User');
const verify = require('./verify');
const multer  = require('multer');
const upload = multer();
const { s3upload, getDaysHoursFromNow } = require('../../util/utilities');
require('dotenv').config();

// get all yips from logged in user
router.get('/', verify.required, async (req, res) => {
  const { payload: { id } } = req;
  // const user = await User.findById(id).populate('yips').populate('yipBacks').populate('replys').catch(e => console.log('Error: ', e));
  // const user = await User.findById(id).populate('on');

  let err;
  const yips = await Yip.find({userId: id}).sort({createdDate: 'descending'}).catch(e => err = e);
  const dateStampedYips = yips.map(yip => {
    return { timeStamp: getDaysHoursFromNow(new Date(yip.createdDate)), ...yip._doc };
  });

  if (err) {
    res.status(200).json({ success: false, message: 'Error retrieving Yips.' });
  }

  res.status(200).json({ yips: dateStampedYips });
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
router.get('/searchgifs', async (req, res) => {
  const query = req.query.search;
  console.log('query: ', query);
  const gifs = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}&limit=25&offset=0&lang=en`);
  console.log(gifs.data);
  res.status(200).json({ gifs: gifs.data });
});

module.exports = router;