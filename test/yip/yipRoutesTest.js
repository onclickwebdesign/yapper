module.exports = (request, app) => {
  describe('Yip routes', () => {

    //   const userBody = {
    //     email: 'alexander@gmail.com',
    //     handle: 'alexanderthegreat',
    //     fullName: 'Alexander Atallah',
    //     password: 'Password'
    //   };

    it('/api/yip/gif/searchgifs - should return 25 John Wick gifs from the Giphy public api', async () => {
      const gifs = await request(app).get('/api/yip/gif/searchgifs?limit=25&search=john+wick');
      expect(gifs.statusCode).toEqual(200);
      expect(gifs.body.data.length).toEqual(25);
      expect(gifs.body.data[0].type).toEqual('gif');
    });
  });
};