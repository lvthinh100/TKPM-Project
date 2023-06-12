const express = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");

//Comment API
const router = express.Router();

router.get("/", userController.getCustomer);
router.post("/", userController.createCustomer);
router.get("/me", authController.isLoggedIn, userController.getMe);

//Get user by ID
router.get("/:id", authController.isLoggedIn, userController.getUserById);

router.delete(
  "/:id",
  authController.isLoggedIn,
  authController.restrictToAdmin,
  userController.deleteById
);
// router.post("/", userController.createCustomer);
router.patch("/:id", userController.updateCustomerById);

module.exports = router;
