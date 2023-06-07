const express = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
//Comment API
const router = express.Router();

router.get("/", userController.getCustomer);

//Get user by ID
router.get("/:id", authController.isLoggedIn, userController.getUserById);
router.post("/", userController.createCustomer);

module.exports = router;
