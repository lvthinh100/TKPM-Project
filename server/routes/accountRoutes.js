const express = require("express");
const TaiKhoangController = require("../controller/TaiKhoangController");

//Comment API
const router = express.Router();

// router.get("/", TaiKhoangController.getCustomer);
router.get("/", TaiKhoangController.getAccount);

router.get("/:id", TaiKhoangController.getById);
router.delete("/delete/:id", TaiKhoangController.deleteById);



module.exports = router;