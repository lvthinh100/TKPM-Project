const express = require("express");

const viewController = require("../controller/viewController");

const router = express.Router();

router.get("/", viewController.renderHome);
// router.get("/transactions/:id", viewController.renderTransaction);
// router.get("/makeTransaction/:id", viewController.renderOFPForm);
router.get("/", viewController.renderDetailRoomInfoPage);

module.exports = router;
