const express = require("express");
const authController = require("../controller/authController");

//Comment API
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/admin/login", authController.adminLogin);
router.post(
  "/admin/register",
  authController.isLoggedIn,
  authController.restrictToAdmin,
  authController.createAdminAccount
);

module.exports = router;
