const express = require("express");
const accountController = require("../controller/accountController");

//Comment API
const router = express.Router();

router.get("/", accountController.getAccount);

router.get("/:id", accountController.getById);
router.delete("/delete/:id", accountController.deleteById);

module.exports = router;
