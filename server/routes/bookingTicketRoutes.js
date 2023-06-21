const express = require("express");
const bookingTicketController = require("../controller/bookingTicketController");

//Comment API
const router = express.Router();

router.get("/", bookingTicketController.getAllTicket);
router.get("/checkIn/:id", bookingTicketController.getStatusByIdRoom);
router.patch("/checkOut/:id", bookingTicketController.updateStatusById);
router.patch("/checkIn/:id", bookingTicketController.updateInforCheckInByIdRoom);


module.exports = router;