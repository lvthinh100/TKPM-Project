const express = require("express");
const roomController = require("../controller/roomController");

//Comment API
const router = express.Router();

router.get("/", roomController.getAllRoom);
router.post("/", roomController.createRoom);
router.get("/:id", roomController.getRoomById);
router.post("/:id", roomController.deleteRoomById);
router.get("/maxid/:id", roomController.getMaxIDRoom);

module.exports = router;