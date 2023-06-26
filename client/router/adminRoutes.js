const express = require("express");
const authController = require("../controller/authController");
const adminController = require("../controller/adminController");

const router = express.Router();
router.use(authController.protected, authController.restrictToAdmin);
router.get("/", adminController.renderAdminPage);

module.exports = router;
