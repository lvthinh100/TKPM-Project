const express = require("express");
const detailRoomInfoPageController = require("../controller/detailRoomInfoPageController");
const authController = require("../controller/authController");

const router = express.Router();

router.use(authController.protected, authController.restrictToAdmin);

router.get("/", detailRoomInfoPageController.renderDetailRoomInfoPage);
router.post("/", detailRoomInfoPageController.deleteRoomById);

module.exports = router;
