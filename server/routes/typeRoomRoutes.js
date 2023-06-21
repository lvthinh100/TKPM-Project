const express = require("express");
const typeRoomController = require("../controller/typeRoomController");

//Comment API
const router = express.Router();

router.get("/", typeRoomController.getAllTypeRoom);
router.get("/:id", typeRoomController.getTypeRoomInfoById);

module.exports = router;
