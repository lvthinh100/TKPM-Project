const express = require("express");
const checkoutController = require("../controller/checkoutController");

const router = express.Router();
router.get("/", checkoutController.rendercheckoutPage);

module.exports = router;
