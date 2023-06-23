const express = require("express");
const reportController = require("../controller/reportController");

const router = express.Router();

router.get("/", reportController.renderReportPage);

module.exports = router;
