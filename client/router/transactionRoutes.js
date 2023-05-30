const express = require("express");
const transactionController = require("../controller/transactionController");

const router = express.Router();
router.post("/:id", transactionController.createTransaction);

module.exports = router;
