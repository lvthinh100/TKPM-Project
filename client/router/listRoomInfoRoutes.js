const express = require("express");
const listRoomInfoController = require("../controller/listRoomInfoController");
const authController = require("../controller/authController");

const router = express.Router();

router.use(authController.isLoggedIn, authController.restrictToAdmin);
router.get("/", listRoomInfoController.renderlistRoomInfoPage);

module.exports = router;
