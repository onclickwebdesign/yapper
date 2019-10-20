const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  hash: String,
  salt: String,
  handle: String,
  fullName: String,
  profileImage: String,
  landscapeImage: String,
  locationCity: String,
  locationState: String,
  occupation: String,
  employer: String,
  date: {
    type: Date,
    default: Date.now
  },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  messageUserIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [Schema.Types.ObjectId],
  followers: [Schema.Types.ObjectId],
  followingCount: { type: Number, min: 0, default: 0 },
  followerCount: { type: Number, min: 0, default: 0 },
  yipCount: { type: Number, min: 0, default: 0 },
  account: {
    accountTypeId: { type: Number, default: 1 },
    isActive: { type: Boolean, default: false },
    isFlagged: { type: Boolean, default: false },
    isFrozen: { type: Boolean, default: false }
  }
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
};

UserSchema.methods.toAuthJSON = function() {
  return {
    // _id: this._id,
    email: this.email,
    handle: this.handle,
    token: this.generateJWT(),
  };
};

const User = mongoose.model('User', UserSchema);

module.exports = User;