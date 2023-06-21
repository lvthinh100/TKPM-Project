const express = require("express");
const listRoomForGuessController = require("../controller/listRoomForGuessController");

const router = express.Router();
router.get("/", listRoomForGuessController.renderlistRoomForGuessPage);

module.exports = router;
