const express = require("express");
const listRoomBookedController = require("../controller/listRoomBookedController");
const authController = require("../controller/authController");

const router = express.Router();
router.get("/", authController.protected, listRoomBookedController.renderlistRoomBookedPage);
router.patch("/", listRoomBookedController.updateStatusById);


module.exports = router;
