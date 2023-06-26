const express = require("express");
const bookingRoomController = require("../controller/bookingRoomController");
const authController = require("../controller/authController");

const router = express.Router();

router.use(authController.isLoggedIn, authController.restrictToAdmin);
router.get("/", bookingRoomController.renderBookingRoomPage);

module.exports = router;
