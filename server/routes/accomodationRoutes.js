const express = require("express");
const accomodationController = require("../controller/accomodationController");

const router = express.Router();

router.get("/", accomodationController.getAllAccomodationsInfo);

module.exports = router;