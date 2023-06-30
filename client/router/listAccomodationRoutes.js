const express = require("express");
const listAccomodationController = require("../controller/listAccomodationController");
const authController = require("../controller/authController");

const router = express.Router();

router.use(authController.protected, authController.restrictToAdmin);
router.get("/", listAccomodationController.renderlistAccomodationPage);

module.exports = router;
