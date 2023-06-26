import api from "./api.js";
import hbsHelper from "../../utils/hbsHelper.js";

const generateMarkup = (data) => {
  const markups = data.map(
    (ticket) => `
  <tr>
  <th scope="row">1</th>
  <td>${ticket.ticketid}</td>
  <td>${ticket.userid}</td>
  <td>${ticket.username}</td>
  <td>${ticket.room}</td>
  <td>${hbsHelper.formatDate(ticket.checkin)}</td>
  <td>${hbsHelper.formatDate(ticket.checkout)}</td>
  <td>${ticket.numuser}</td>
  <td>${ticket.status}</td>
  <td>
    <button
      type="button"
      class="btn btn-primary btn-checkIn"
      data-bs-toggle="modal"
      data-bs-target="#ticketInfoModal"
      data-ticket="${ticket.ticketid}"
      data-room="${ticket.room}"
    >
      Check in
    </button>
    <button class="btn btn-primary">Check out</button>
  </td>
</tr>
  `
  );
  return markups.join("");
};

const render = (markup) => {
  const body = document.querySelector(".bookingTicket__body");
  body.innerHTML = "";
  body.insertAdjacentHTML("afterbegin", markup);
};

const renderBookingTicketList = (data) => {
  const markup = generateMarkup(data);
  render(markup);
};

const renderMessage = (message) => {
  const markup = ` <h1>${message}</h1> `;
  render(markup);
};

const renderSpinner = () => {
  const markup = `
  <div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  `;
  render(markup);
};

const searchTicketHandler = async (e) => {
  try {
    e.preventDefault();
    const formData = new FormData(e.target); // create a new FormData object
    const input = Object.fromEntries(formData.entries()); // convert the FormData object to a plain object
    renderSpinner();
    const { data } = await api.searchTicket(input.text, input.status);
    renderBookingTicketList(data.data);
  } catch (err) {
    renderMessage("Không tìm thấy thông tin đặt phòng");
  }
};

module.exports = searchTicketHandler;
