const renderTicket = (ticketInfo) => {
  const room = document.querySelector(".ticket-room");
  const checkIn = document.querySelector(".ticket-checkIn");
  const id = document.querySelector(".ticket-id");
  const checkOut = document.querySelector(".ticket-checkOut");
  const users = document.querySelector(".ticket-users");
  room.textContent = ticketInfo.room;
  checkIn.textContent = ticketInfo.checkIn;
  id.textContent = ticketInfo.ticketId;
  checkOut.textContent = ticketInfo.checkOut;

  const formMarkup = generateForm(ticketInfo.users);
  users.innerHTML = "";
  users.insertAdjacentHTML("afterbegin", formMarkup);
};

const generateForm = (users) => {
  const items = users.map(
    (user, i) => `
    <div class="carousel-item ${i == 0 ? "active" : ""}">
      <div class="row">
        <div class="col-md-12 fw-bold" ><span>Khách ${i + 1}</span></div>
        <div class="col-md-6">
          <label class="labels">Tên</label>
          <input
            type="text"
            class="form-control"
            placeholder="Họ và tên"
            value="${user.name}"
          />
        </div>
        <div class="col-md-6">
          <label class="labels">CMND</label>
          <input
            type="text"
            class="form-control"
            placeholder="CMND"
            value="${user.cmnd}"
          />
        </div>
        <div class="col-md-6">
          <label class="labels">SDT</label>
          <input
            type="text"
            class="form-control"
            placeholder="Số Điện Thoại"
            value="${user.phone}"
          />
        </div>
        <div class="col-md-6">
          <label class="labels">Địa chỉ</label>
          <input
            type="text"
            class="form-control"
            placeholder="Địa chỉ"
            value="${user.address}"
          />
        </div>
      </div>
    </div>
    `
  );
  const markup = items.join("");
  return markup;
};

const getDetailBookingTicketHandler = async (e) => {
  if (!e.target.classList.contains("btn-checkIn")) return;
  //Get ticket Id
  const { ticket } = e.target.dataset;
  console.log(ticket);

  // Get ticket info
  const ticketInfo = {
    ticketId: "PHKHS12F",
    userId: "KH12KD4D",
    userName: "Lê Văn Thịnh",
    checkIn: "25/02/2002",
    checkOut: "27/02/2002",
    room: 102,
    num: 3,
    status: "checked in",
    users: [
      {
        name: "Thịnh 1",
        cmnd: "054202000061",
        phone: "0796792539",
        address: "Khu B 1",
      },
      {
        name: "Thịnh 2",
        cmnd: "054202000061",
        phone: "0796792539",
        address: "Khu B 1",
      },
      {
        name: "Thịnh 3",
        cmnd: "054202000061",
        phone: "0796792539",
        address: "Khu B 1",
      },
    ],
  };

  // Render ticket info
  renderTicket(ticketInfo);
};

module.exports = getDetailBookingTicketHandler;
