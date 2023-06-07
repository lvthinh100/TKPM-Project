const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();
router.get("/register", authController.renderRegisterPage);
router.get("/login", authController.renderLoginPage);

module.exports = router;
