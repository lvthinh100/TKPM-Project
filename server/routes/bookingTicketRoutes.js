const express = require("express");
const bookingTicketController = require("../controller/bookingTicketController");

//Comment API
const router = express.Router();

router.get("/search", bookingTicketController.searchBookingTicket);

router.get("/", bookingTicketController.getAllTicket);
router.get("/:id", bookingTicketController.getStatusByIdRoom);
router.patch("/checkOut/:id", bookingTicketController.updateStatusById);
router.patch("/checkIn/:id", bookingTicketController.updateInforCheckInByIdRoom);



module.exports = router;