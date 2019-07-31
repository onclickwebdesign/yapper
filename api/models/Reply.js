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

mongoose.model('Reply', ReplySchema);