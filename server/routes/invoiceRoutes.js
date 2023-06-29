const express = require("express");
const invoiceController = require("../controller/invoiceController");

//Comment API
const router = express.Router();

router.get("/ticket/:ticketId", invoiceController.getInvoiceByTicketId);

router.get("/", invoiceController.getAllInvoice);
router.post("/", invoiceController.createInvoice);
router.get("/:id", invoiceController.getInvoiceById);

module.exports = router;
