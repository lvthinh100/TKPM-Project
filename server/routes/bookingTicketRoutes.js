const express = require("express");
const bookingTicketController = require("../controller/bookingTicketController");
const authController = require("../controller/authController");

//Comment API
const router = express.Router();

router.get("/search", bookingTicketController.searchBookingTicket);
router.post("/", bookingTicketController.createTicket);

router.get("/", bookingTicketController.getAllTicket);
router.patch("/checkOut/:id", bookingTicketController.updateStatusById);

router.get("/detail/:id", bookingTicketController.getDetailTicket);
router.get("/ticket/", bookingTicketController.getAllTicket);
router.get("/ticket/:id", bookingTicketController.getTicketsByUser);
router.get("/:id", bookingTicketController.getStatusByIdRoom);

router.patch(
  "/checkIn/:id",
  bookingTicketController.updateInforCheckInByIdRoom
);

module.exports = router;
