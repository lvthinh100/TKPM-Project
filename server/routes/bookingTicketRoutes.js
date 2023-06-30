const express = require("express");
const bookingTicketController = require("../controller/bookingTicketController");
const authController = require("../controller/authController");

//Comment API
const router = express.Router();

router.get("/search", bookingTicketController.searchBookingTicket);
router.get("/detailBooking/:id", bookingTicketController.getTicketsById);
router.post("/", bookingTicketController.createTicket);
router.get("/", bookingTicketController.getAllTicket);

router.get("/search", bookingTicketController.searchBookingTicket);
router.patch("/checkOut/:id", bookingTicketController.updateStatusById);

router.get("/detail/:id", bookingTicketController.getDetailTicket);
router.get("/ticket/", bookingTicketController.getAllTicket);
router.get("/ticket/:id", bookingTicketController.getTicketsByUser);
router.post("/admin", bookingTicketController.adminCreateTicket);

router.get("/:id", bookingTicketController.getStatusByIdRoom);

router.patch(
  "/checkIn/:id",
  bookingTicketController.updateInforCheckInByIdRoom
);

router.post("/deleteBooking/:id", bookingTicketController.deleteBookingById);

module.exports = router;
