const express = require("express");
const listRoomBookedController = require("../controller/listRoomBookedController");
const authController = require("../controller/authController");

const router = express.Router();
router.get("/", authController.protected, listRoomBookedController.renderlistRoomBookedPage);


module.exports = router;
