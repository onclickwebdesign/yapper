const { app, mongoose } = require('../../app');
const request = require('supertest');
// const User = mongoose.model('User');

afterAll(async () => {
  // await User.remove({});
  await mongoose.connection.db.dropCollection('users');
  mongoose.connection.close();
});

describe('User and auth routes', () => {
  it('/api/auth/register - should create a new user and login', async () => {
    const userBody = {
      email: 'alexander@gmail.com',
      handle: 'alexanderthegreat',
      fullName: 'Alexander Atallah',
      password: 'Password'
    };

    const user = await request(app).post('/auth/register').send(userBody);
    expect(user.statusCode).toEqual(201);
    expect(user.body.email).toEqual(userBody.email);
    expect(user.body.handle).toEqual(userBody.handle);
    expect(user.body).toHaveProperty('token');

    const { email, password } = userBody;
    const badEmail = await request(app).post('/auth/login').send({ email: 'nouser@nowhere.com', password });
    const badPassword = await request(app).post('/auth/login').send({ email, password: '123456789password' });
    const authUser = await request(app).post('/auth/login').send({ email, password });
    expect(badEmail.statusCode).toEqual(401);
    expect(badPassword.statusCode).toEqual(401);
    expect(authUser.statusCode).toEqual(200);
    expect(authUser.body.user.email).toEqual(userBody.email);
    expect(authUser.body.user.handle).toEqual(userBody.handle);
    expect(authUser.body.user).toHaveProperty('token');
  });
});