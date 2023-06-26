const express = require("express");
const listRoomForGuessController = require("../controller/listRoomForGuessController");
const authController = require("../controller/authController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/", listRoomForGuessController.renderlistRoomForGuessPage);

module.exports = router;
