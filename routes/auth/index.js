const router = require("express").Router();
const authRoutes = require("./auth");
const resetPassRoutes = require("./resetpassword");
const registerRoutes = require("./register");

// Book routes
router.use(authRoutes);
router.use(resetPassRoutes);
router.use(registerRoutes);

module.exports = router;
