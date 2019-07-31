const mongoose = require('mongoose');

const { Schema } = mongoose;

const YipBackSchema = new Schema({
  userId: Number,
  body: String,
  createdDate: { type: Date, default: Date.now },
  yipId: Number,
  replyIds: [Number]
});

mongoose.model('YipBack', YipBackSchema);