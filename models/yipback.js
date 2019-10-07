const mongoose = require('mongoose');

const { Schema } = mongoose;

const YipBackSchema = new Schema({
  userId: Number,
  body: String,
  createdDate: { type: Date, default: Date.now },
  yipId: Number,
  replyIds: [Number]
});

const YipBack = mongoose.model('YipBack', YipBackSchema);

module.exports = YipBack;