const express = require("express");
const KhachHangController = require("../controller/KhachHangController");

//Comment API
const router = express.Router();

router.get("/", KhachHangController.getCustomer);

//Get user by ID
router.get("/:id", KhachHangController.getUserById);

router.delete("/delete/:id", KhachHangController.deleteById);

router.post("/", KhachHangController.createCustomer);

router.post("/update", KhachHangController.updateCustomerById);

module.exports = router;
