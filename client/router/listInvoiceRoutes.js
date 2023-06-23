const express = require("express");
const listInvoiceController = require("../controller/listInvoiceController");
const authController = require("../controller/authController");

const router = express.Router();

router.use(authController.protected, authController.restrictToAdmin);
router.get("/", listInvoiceController.renderlistInvoicePage);

module.exports = router;
