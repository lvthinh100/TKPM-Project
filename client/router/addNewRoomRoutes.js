const express = require("express");
const addNewRoomController = require("../controller/addNewRoomController");

const router = express.Router();

router.get("/", addNewRoomController.renderAddNewRoomPage);

module.exports = router;