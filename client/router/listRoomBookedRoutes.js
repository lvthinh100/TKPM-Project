const express = require("express");
const listRoomBookedController = require("../controller/listRoomBookedController");

const router = express.Router();
router.get("/", listRoomBookedController.renderlistRoomBookedPage);

module.exports = router;
