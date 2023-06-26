const express = require("express");
const addNewRoomController = require("../controller/addNewRoomController");
const authController = require("../controller/authController");

const router = express.Router();

router.use(authController.protected, authController.restrictToAdmin);

router.get("/", addNewRoomController.renderAddNewRoomPage);
router.post("/", addNewRoomController.handleAddNewRoom);

module.exports = router;
