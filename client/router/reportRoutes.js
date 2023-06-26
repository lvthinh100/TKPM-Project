const express = require("express");
const reportController = require("../controller/reportController");
const authController = require("../controller/authController");

const router = express.Router();

router.use(authController.isLoggedIn, authController.restrictToAdmin);

router.get("/", reportController.renderReportPage);

module.exports = router;
