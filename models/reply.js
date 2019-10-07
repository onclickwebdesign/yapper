const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReplySchema = new Schema({
  userId: Number,
  body: String,
  yipId: Number,
  yipBackId: Number,
  replyTypeId: Number,
  createdDate: { type: Date, default: Date.now }
});

const Reply = mongoose.model('Reply', ReplySchema);

module.exports = Reply;