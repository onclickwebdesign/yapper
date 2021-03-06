const mongoose = require('mongoose');

const { Schema } = mongoose;

const YipSchema = new Schema({
  // userId: Schema.Types.ObjectId,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  body: String,
  images: [String],
  gif: {
    url: String,
    height: String,
    width: String,
    id: String
  },
  createdDate: { type: Date, default: Date.now },
  yipBackIds: [Schema.Types.ObjectId],
  replyIds: [Schema.Types.ObjectId],
  likeIds: [Schema.Types.ObjectId]
});

const Yip = mongoose.model('Yip', YipSchema);

module.exports = Yip;