const express = require("express");
const roomController = require("../controller/roomController");

//Comment API
const router = express.Router();

router.get("/", roomController.getAllRoom);
router.post("/", roomController.createRoom);
router.get("/:id", roomController.getRoomById);
// router.get("/roomBooking", roomController.getRoomById);

module.exports = router;
