import searchTicketHandler from "./searchBookingTicket.js";
import {
  getDetailBookingTicketHandler,
  updateAccommodationInfoHandler,
} from "./detailBookingTicket.js";
import { handleRegister, handleUserLogin, handleAdminLogin } from "./auth.js";
import { reportHandler } from "./chartReport.js";

const searchTicketForm = document.querySelector("#searchTicketForm");
const booking = document.querySelector(".booking");
const userLogin = document.querySelector(".user-login");
const adminLogin = document.querySelector(".admin-login");
const register = document.querySelector("#form__register");
const ticketInfo = document.querySelector(".ticket-info");
const reportForm = document.querySelector(".report");

if (booking) {
  booking.addEventListener("click", getDetailBookingTicketHandler);
}
if (searchTicketForm)
  searchTicketForm.addEventListener("submit", searchTicketHandler);

if (userLogin) userLogin.addEventListener("submit", handleUserLogin);
if (adminLogin) adminLogin.addEventListener("submit", handleAdminLogin);
if (register) register.addEventListener("submit", handleRegister);
if (ticketInfo)
  ticketInfo.addEventListener("click", updateAccommodationInfoHandler);
if (reportForm) reportForm.addEventListener("submit", reportHandler);
