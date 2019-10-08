const router = require("express").Router();
const userRoutes = require("./user");
const yipRoutes = require("./yip");

// User routes
router.use("/user", userRoutes);
router.use("/yip", yipRoutes);

module.exports = router;
