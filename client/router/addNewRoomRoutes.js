const express = require("express");
const addNewRoomController = require("../controller/addNewRoomController");

const router = express.Router();

router.get("/", addNewRoomController.renderAddNewRoomPage);
router.post("/", addNewRoomController.handleAddNewRoom);

module.exports = router;
