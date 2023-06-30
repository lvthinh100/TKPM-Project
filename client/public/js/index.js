import searchTicketHandler from "./searchBookingTicket.js";
import {
  getDetailBookingTicketHandler,
  updateAccommodationInfoHandler,
  checkOutTicketHandler,
} from "./detailBookingTicket.js";
import { handleRegister, handleUserLogin, handleAdminLogin } from "./auth.js";
import { reportHandler } from "./chartReport.js";
import {
  addNewTicketHandler,
  cancelBookingHandler,
  submitUserInfoHandler,
} from "./bookTicket.js";

const searchTicketForm = document.querySelector("#searchTicketForm");
const booking = document.querySelector(".booking");
const userLogin = document.querySelector(".user-login");
const adminLogin = document.querySelector(".admin-login");
const register = document.querySelector("#form__register");
const ticketInfo = document.querySelector(".ticket-info");
const reportForm = document.querySelector(".report");

// New booking Ticket
const bookTicketBtn = document.querySelector(".book-ticket");
const cancelBookingBtn = document.querySelector(".cancel-booking");
const adminBookingForm = document.querySelector(".admin-booking");

if (userLogin) userLogin.addEventListener("submit", handleUserLogin);
if (adminLogin) adminLogin.addEventListener("submit", handleAdminLogin);
if (register) register.addEventListener("submit", handleRegister);

if (booking) {
  booking.addEventListener("click", getDetailBookingTicketHandler);
  booking.addEventListener("click", checkOutTicketHandler);
}
if (searchTicketForm)
  searchTicketForm.addEventListener("submit", searchTicketHandler);
if (ticketInfo)
  ticketInfo.addEventListener("click", updateAccommodationInfoHandler);

if (reportForm) reportForm.addEventListener("submit", reportHandler);

if (cancelBookingBtn)
  cancelBookingBtn.addEventListener("click", cancelBookingHandler);
if (bookTicketBtn) bookTicketBtn.addEventListener("click", addNewTicketHandler);
if (adminBookingForm)
  adminBookingForm.addEventListener("submit", submitUserInfoHandler);
