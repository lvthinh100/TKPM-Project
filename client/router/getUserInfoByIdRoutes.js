const express = require("express");
const userInfoController = require("../controller/userInfoController");

const router = express.Router();
router.get("/", userInfoController.renderGetUserById);
router.post("/", userInfoController.apiGetUserById);

module.exports = router;
