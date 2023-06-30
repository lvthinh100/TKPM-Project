import api from "./api.js";

export const addNewTicketHandler = async (e) => {
  const checkin = document.getElementById("checkinDate").textContent;
  const checkout = document.getElementById("checkoutDate").textContent;
  const userid = document.querySelector(".user-id").textContent;
  const numuser = document.getElementById("numUser").textContent;
  const room = Array.from(document.querySelectorAll(".room-id")).map((e) =>
    e.textContent.trim()
  );

  if (userid == '') {
    $('#GuessModal').modal('show');
    const name = document.getElementById("name");
    const type = document.getElementById("type");
    const phone = document.getElementById("phone");
    const location = document.getElementById("location");
  }
  else {
    const { data } = await api.createTicket({
      checkin,
      checkout,
      room,
      userid,
      numuser,
    });
    document.querySelector(".ticket-id").textContent = data.data.ticketId;
    $('#SucessModal').modal('show');
    setTimeout(() => window.location.href = "/listRoomForGuess", 2500);
    console.log(data);
  }
};

export const cancelBookingHandler = (e) => {
  window.location.href = "/listRoomForGuess";
};
