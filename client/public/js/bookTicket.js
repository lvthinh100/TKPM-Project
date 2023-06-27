export const addNewTicketHandler = (e) => {
  const checkinDate = document.getElementById("checkinDate").textContent;
  const checkoutDate = document.getElementById("checkoutDate").textContent;
  const userId = document.querySelector(".user-id").textContent;
  const room = Array.from(document.querySelectorAll(".room-id")).map((e) =>
    e.textContent.trim()
  );
  console.log(room, userId, checkinDate, checkoutDate);
};

export const cancelBookingHandler = (e) => {
  console.log(e.target);
};
