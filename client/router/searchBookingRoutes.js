const express = require("express");
const searchBookingController = require("../controller/searchBookingController");
//const authController = require("../controller/authController");

const router = express.Router();

//router.use(authController.protected, authController.restrictToAdmin);

router.get("/", searchBookingController.renderSearchBookingPage);

module.exports = router;
