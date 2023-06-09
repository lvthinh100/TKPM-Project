import api from "./api.js";
import { showMessage } from "./ui.js";

export const addNewTicketHandler = async (e) => {
  const checkin = document.getElementById("checkinDate").textContent;
  const checkout = document.getElementById("checkoutDate").textContent;
  const userid = document.querySelector(".user-id").textContent;
  const numuser = document.getElementById("numUser").textContent;
  const room = Array.from(document.querySelectorAll(".room-id")).map((e) =>
    e.textContent.trim()
  );

  if (userid == "") {
    $("#GuessModal").modal("show");
  } else {
    const { data } = await api.createTicket({
      checkin,
      checkout,
      room,
      userid,
      numuser,
    });
    document.querySelector(".ticket-id").textContent = data.data.ticketId;
    showMessage(
      "Tạo phiếu thành công",
      "Tạo mới Phiếu đặt phòng thành công. Điều hướng sau 2.5 giây"
    );

    setTimeout(() => (window.location.href = "/listRoomForGuess"), 2500);
    console.log(data);
  }
};

export const cancelBookingHandler = (e) => {
  window.location.href = "/listRoomForGuess";
};

export const submitUserInfoHandler = async (e) => {
  e.preventDefault();
  console.log(e.target);
  const formData = new FormData(e.target); // create a new FormData object
  const input = Object.fromEntries(formData.entries()); // convert the FormData object to a plain object
  const { data } = await api.createUser(input);
  $("#GuessModal").modal("hide");
  showMessage(
    "Tạo mới khách hàng",
    "Tạo mới Khách hàng thành công, sẵn sàng đặt phòng"
  );
  // console.log(data);
  document.querySelector(".user-id").textContent = data.data.userId;
};
