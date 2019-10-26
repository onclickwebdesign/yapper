const router = require('express').Router();
// const axios = require('axios');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Message = mongoose.model('Message');
const verify = require('./verify');
// const { getDaysHoursFromNow, objectDateComparator } = require('../../util/utilities');
require('dotenv').config();

/*
 * Get currently logged in user's direct messages
 */
router.get('/', verify.required, async (req, res) => {
  console.log('payload yo: ', req.payload);
  console.log('user yo: ', req.user);
  const { payload: { id } } = req;
  const user = await User.find({ _id: id }).populate('message').populate('messageIds');
  console.log('user from messages route: ', user);

  res.status(200).json({ success: true, message: 'booya' });
});

/*
 * Post a new direct message to user with specified handle
 */
router.post('/:handle', verify.required, async (req, res) => {
  const { payload: { id } } = req;
  const user1 = await User.findById(id); // initiates the message
  const user2 = await User.findOne({ handle: req.params.handle });

  const message = new Message({
    user1Id: id,
    user2Id: user2._id,
    conversation: [{ user: { body: req.body.message, handle: user1.handle } }],
    createdDate: [Date.now()]
  });

  const postedMessage = await message.save();
  await user1.update({ $push: { messages: postedMessage._id }, $push: { messageUserIds: user2._id } });
  await user2.update({ $push: { messages: postedMessage._id }, $push: { messageUserIds: id } });
  res.status(200).json({ success: true, message: 'Message sent successfully.' });
});

/*
 * Reply to a direct message to user with specified handle
 */
router.put('/reply/:id', verify.required, async (req, res) => {
  console.log('payload: ', req.payload);
  // const { payload: { id } } = req;
  const message = Message.findById(req.params.id);
  // const user1 = await User.findById(id);
  // const user2 = await User.findOne({ handle: req.params.handle });
  const updatedMessage = await message.update({ 
    $push: { conversation: { user: { body: req.body.message, handle: req.payload.handle } } },
    $push: { createdDate: Date.now() }
  }, { new: true });
  
  res.status(200).json({ success: true, message: updatedMessage });
});

module.exports = router;
