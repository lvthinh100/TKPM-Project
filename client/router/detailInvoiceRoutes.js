const express = require("express");
const detailInvoiceController = require("../controller/detailInvoiceController");
const authController = require("../controller/authController");

const router = express.Router();

router.use(authController.protected, authController.restrictToAdmin);

router.get("/", detailInvoiceController.renderDetailInvoicePage);

module.exports = router;
