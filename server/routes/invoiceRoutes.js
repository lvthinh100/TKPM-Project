const express = require("express");
const invoiceController = require("../controller/invoiceController");



//Comment API
const router = express.Router();

router.get("/", invoiceController.getAllInvoice);
router.get("/:id", invoiceController.getInvoiceById);
router.post("/", invoiceController.createInvoice);

module.exports = router;
