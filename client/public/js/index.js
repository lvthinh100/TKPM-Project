import searchTicketHandler from "./searchBookingTicket.js";
import getDetailBookingTicketHandler from "./detailBookingTicket.js";
import { handleRegister, handleUserLogin, handleAdminLogin } from "./auth.js";

const searchTicketForm = document.querySelector("#searchTicketForm");
const booking = document.querySelector(".booking");
const userLogin = document.querySelector(".user-login");
const adminLogin = document.querySelector(".admin-login");
const register = document.querySelector("#form__register");

if (booking) {
  booking.addEventListener("click", getDetailBookingTicketHandler);
}
if (searchTicketForm)
  searchTicketForm.addEventListener("submit", searchTicketHandler);

if (userLogin) userLogin.addEventListener("submit", handleUserLogin);
if (adminLogin) adminLogin.addEventListener("submit", handleAdminLogin);
if (register) register.addEventListener("submit", handleRegister);
