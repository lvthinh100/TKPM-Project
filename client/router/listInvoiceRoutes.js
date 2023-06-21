const express = require("express");
const listInvoiceController = require("../controller/listInvoiceController");

const router = express.Router();
router.get("/", listInvoiceController.renderlistInvoicePage);

module.exports = router;
