const router = require('express').Router();
const userRoutes = require('./user');
const yipRoutes = require('./yip');
const messageRoutes = require('./message');

// User routes
router.use('/user', userRoutes);
router.use('/yip', yipRoutes);
router.use('/message', messageRoutes);

module.exports = router;
