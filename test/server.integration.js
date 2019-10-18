const { app, mongoose } = require('../app');
const request = require('supertest');
// const User = mongoose.model('User');

require('./user/userRoutesTest')(request, app);
require('./yip/yipRoutesTest')(request, app);

afterAll(async () => {
  // await User.remove({});
  await mongoose.connection.db.dropCollection('users');
  mongoose.connection.close();
});