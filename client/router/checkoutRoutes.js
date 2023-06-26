const express = require("express");
const checkoutController = require("../controller/checkoutController");
const authController = require("../controller/authController");

const router = express.Router();

router.use(authController.isLoggedIn);
router.get("/", checkoutController.rendercheckoutPage);

module.exports = router;
