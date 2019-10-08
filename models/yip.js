const mongoose = require('mongoose');

const { Schema } = mongoose;

const YipSchema = new Schema({
  userId: Schema.Types.ObjectId,
  body: String,
  yipBackCount: Number,
  createdDate: { type: Date, default: Date.now },
  replyIds: [Number]
});

const Yip = mongoose.model('Yip', YipSchema);

module.exports = Yip;