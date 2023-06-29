const express = require("express");
const homeController = require("../controller/homeController");

const authController = require("../controller/authController");

const router = express.Router();
router.use(authController.isLoggedIn);

router.get("/", homeController.renderHomePage);

module.exports = router;
