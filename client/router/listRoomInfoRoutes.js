const express = require("express");
const listRoomInfoController = require("../controller/listRoomInfoController");

const router = express.Router();
router.get("/", listRoomInfoController.renderlistRoomInfoPage);

module.exports = router;
