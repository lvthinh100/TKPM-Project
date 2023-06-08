const express = require("express");
const detailRoomInfoPageController = require("../controller/detailRoomInfoPageController");

const router = express.Router();
router.get("/", detailRoomInfoPageController.renderDetailRoomInfoPage);

module.exports = router;