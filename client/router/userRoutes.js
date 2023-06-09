const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");

const router = express.Router();
router.get(
  "/profile",
  authController.protected,
  userController.renderProfilePage
);

module.exports = router;
