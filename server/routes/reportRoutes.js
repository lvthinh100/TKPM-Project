const express = require("express");
const reportController = require("../controller/reportController");

//Comment API
const router = express.Router();

router.get("/revenue", reportController.getRevenue);
router.get("/efficiency", reportController.getEfficiency);
router.get("/", reportController.getAll);

module.exports = router;