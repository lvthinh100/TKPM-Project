import api from "./api.js";

export const addNewTicketHandler = async (e) => {
  const checkin = document.getElementById("checkinDate").textContent;
  const checkout = document.getElementById("checkoutDate").textContent;
  const userid = document.querySelector(".user-id").textContent;
  const room = Array.from(document.querySelectorAll(".room-id")).map((e) =>
    e.textContent.trim()
  );

  const { data } = await api.createTicket({
    checkin,
    checkout,
    room,
    userid,
    numuser: 3,
  });
  document.querySelector(".ticket-id").textContent = data.data.ticketId;
  console.log(data);
};

export const cancelBookingHandler = (e) => {
  console.log(e.target);
};
