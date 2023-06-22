const express = require("express");
const detailRoomInfoPageController = require("../controller/detailRoomInfoPageController");

const router = express.Router();

router.get("/", detailRoomInfoPageController.renderDetailRoomInfoPage);
router.post("/", detailRoomInfoPageController.deleteRoomById);

module.exports = router;