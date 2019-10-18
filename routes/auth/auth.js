const router = require('express').Router();
const passport = require('passport');
require('dotenv').config();

router.post('/login', passport.authenticate('local'), async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: 'You have provided incorrect credentials' });
  } else {
    res.status(200).json({
      user: { profileImage: req.user.profileImage, ...req.user.toAuthJSON() },
      redirect: '/' 
    });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ success: true, message: 'User logged out.' });
});

module.exports = router;