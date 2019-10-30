const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConversationSchema = new Schema({
  body: { type: String, max: 255 },
  handle: String
}, { _id: false });

const MessageSchema = new Schema({
  user1Id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  user2Id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  conversation: [ConversationSchema],
  createdDate: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
