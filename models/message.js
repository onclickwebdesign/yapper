const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  user1Id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  user2Id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  conversation: [{
    user: {
      body: { type: String, max: 255 },
      handle: String,
    }
  }],
  createdDate: [{ type: Date, default: Date.now }]
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
