const mongoose = require('mongoose');

const { Schema } = mongoose;

const YipSchema = new Schema({
  userId: Number,
  body: String,
  yipBackCount: Number,
  createdDate: { type: Date, default: Date.now },
  replyIds: [Number]
});

mongoose.model('Yip', YipSchema);