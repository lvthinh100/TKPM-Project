const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();
router.get("/profile", userController.renderProfilePage);

module.exports = router;
