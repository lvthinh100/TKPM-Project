const express = require("express");
const detailInvoiceController = require("../controller/detailInvoiceController");

//Comment API
const router = express.Router();

router.get("/:id", detailInvoiceController.getDetailInvoiceById);

module.exports = router;
