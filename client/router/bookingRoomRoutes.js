const express = require("express");
const bookingRoomController = require("../controller/bookingRoomController");

const router = express.Router();

router.get("/", bookingRoomController.renderBookingRoomPage);

module.exports = router;
