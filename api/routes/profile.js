const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');

router.get('/', async (req, res) => {
  const reqBody = {
    email: 'john.doe@gmail.com',
    handle: 'McHandles',
  };

  //   yipIds: [],
  //   yipBackIds: [],
  //   replyIds: [],
  //   account: {
  //     accountTypeId: 1,
  //     isActive: { type: Boolean, default: false },
  //     isFlagged: { type: Boolean, default: false },
  //     isFrozen: { type: Boolean, default: false }
  //   }
  // }

  let user = new User(reqBody);
  user.setPassword('sailboat1!!');
  const something = await user.save();
  console.log('something: ', something);

  res.send('Boombazzle!');

});

module.exports = router;