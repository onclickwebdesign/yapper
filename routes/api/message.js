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
  const user = await User.findById(id).select('-_id'); // .populate('message').populate('messageUserIds', 'handle fullName profileImage -_id');
  console.log('user from messages route: ', user);

  res.status(200).json({ success: true, user });
});

/*
 * Get specific message's entire conversation by messageId
 */
router.get('/:id', verify.required, async (req, res) => {
  const message = await Message.findById(req.params.id).populate('user1Id').populate('user2Id');
  console.log('single message: ', message);
  res.status(200).json({ success: true, message });
});

/*
 * Post a new direct message to user with specified handle
 */
router.post('/:handle', verify.required, async (req, res) => {
  const { payload: { id } } = req;
  const user1 = await User.findById(id); // initiates the message
  const user2 = await User.findOne({ handle: req.params.handle });

  await user1.update({ $pullAll: { messageUserIds: [user2._id] } });
  await user2.update({ $pullAll: { messageUserIds: [id] } });

  const message = new Message({
    user1Id: id,
    user2Id: user2._id,
    conversation: [{ body: req.body.body, handle: user1.handle }],
    createdDate: Date.now()
  });

  const postedMessage = await message.save();
  await user1.update({ $push: { messages: {id: postedMessage._id, profileImage: user2.profileImage, handle: user2.handle, name: user2.fullName} } });
  await user2.update({ $push: { messages: {id: postedMessage._id, profileImage: user1.profileImage, handle: user1.handle, name: user1.fullName} } });
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
  const updatedMessage = await message.update(
    { $push: { conversation: { body: req.body.body, handle: req.payload.handle } } },
    { createdDate: Date.now() }, 
    { new: true });
  
  res.status(200).json({ success: true, message: updatedMessage });
});

module.exports = router;
