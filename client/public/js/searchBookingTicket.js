import api from "./api.js";
import hbsHelper from "../../utils/hbsHelper.js";

{
  /* <th scope="row">1</th>
  <td>${ticket.ticketid}</td>
  <td>${ticket.userid}</td>
  <td>${ticket.username}</td>
  <td>${ticket.room}</td>
  <td>${hbsHelper.formatDate(ticket.checkin)}</td>
  <td>${hbsHelper.formatDate(ticket.checkout)}</td>
  <td>${ticket.numuser}</td>
  <td class="status" >${ticket.status}</td> */
}

{
  /* <button 
      class="btn btn-primary btn-checkOut"
      data-ticketid="${ticket.ticketid}"
      data-userid="${ticket.userid}"
    >Check out</button> */
}

{
  /* <td>
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
    
  </td> */
}

const generateMarkup = (data) => {
  const markups = data.map(
    (ticket) => `
  <tr>

  <td scope="row" class="col-1 align-middle text-center ">
    <div
      class="col-12 idBooking"
      id="${ticket.ticketid}"
      style="font-size:1.25em"
    >${ticket.ticketid}</div>
    <div
      class="col-12"
      style="margin-top:1em; color:rgb(30, 30, 218)"
    >Trạng thái: <span class="status" data-ticketid="${ticket.ticketid}" >${
      ticket.status
    }</span> </div>
    <div
      class="col-lg-9 align-middle text-center"
      style="margin-top:1em;"
    >
      <button
        data-ticketid="${ticket.ticketid}"
        data-userid="${ticket.userid}"
        class="btn w-100 btn-checkOut"
        style="background-color: rgb(237, 75, 75);"
      >Checkout</button>
    </div>
  </td>


  <td class="col-1" >${ticket.userid}</td>
  <td class="col-1">${ticket.username}</td>
  <td class="col-1">${hbsHelper.formatDate(ticket.createdat)}</td>
  <td class="col-1">${hbsHelper.formatDate(ticket.checkin)}</td>
  <td class="col-1">${hbsHelper.formatDate(ticket.checkout)}</td>
  <td class="col-1 text-center">${ticket.numuser}</td>
  <td class="col-1">
    <table class="table table-light table-bordered m-auto">
      <thead>
        <tr>
          <th>Phòng</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${ticket.room
          .map(
            (r) => `
        <tr>
          <td>${r}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary btn-checkIn"
              data-bs-toggle="modal"
              data-bs-target="#ticketInfoModal"
              data-ticket="${ticket.ticketid}"
              data-room="${r}"
            >
              Check in
            </button>
          </td>
        </tr>
        
        `
          )
          .join("")}
        
      </tbody>
    </table>

          
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

    const B = data.data.reduce((acc, curr) => {
      const existing = acc.find((item) => item.ticketid === curr.ticketid);
      if (existing) {
        existing.room.push(curr.room.trim());
      } else {
        acc.push({
          ...curr,
          ticketid: curr.ticketid,
          room: [curr.room.trim()],
        });
      }
      return acc;
    }, []);
    console.log(B);

    renderBookingTicketList(B);
  } catch (err) {
    renderMessage("Không tìm thấy thông tin đặt phòng");
  }
};

module.exports = searchTicketHandler;
