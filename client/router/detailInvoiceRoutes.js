const express = require("express");
const detailInvoiceController = require("../controller/detailInvoiceController");

const router = express.Router();

router.get("/", detailInvoiceController.renderDetailInvoicePage);

module.exports = router;