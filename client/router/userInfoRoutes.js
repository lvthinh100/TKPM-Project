const express = require("express");
const userInfoController = require("../controller/userInfoController");

const router = express.Router();
router.get("/", userInfoController.renderUserInfoPage);

module.exports = router;
