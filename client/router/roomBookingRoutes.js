const express = require("express");
const authController = require("../controller/authController");
const roomBookingController = require("../controller/roomBookingController");

const router = express.Router();
// router.use(authController.isLoggedIn, authController.restrictToAdmin);

router.get("/", roomBookingController.renderRoomBookingPage);

module.exports = router;
