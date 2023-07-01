import api from "./api.js";
import hbsHelper from "../../utils/hbsHelper.js";
import { renderSpinner } from "./ui.js";

const updateStatus = (ticketId, status) => {
  const statusLabel = document.querySelector(
    `.status[data-ticket="${ticketId}"]`
  );
  if (!statusLabel) return;
  statusLabel.textContent = status;
};

const getStatus = (ticketId) => {
  const statusLabel = document.querySelector(
    `.status[data-ticket="${ticketId}"]`
  );
  if (!statusLabel) return;
  return statusLabel.textContent;
};

const renderIndicatorBtn = (num) => {
  const body = document.querySelector(".accommodation-indicators");

  let items = [];
  for (let i = 0; i < num; i++) {
    items.push(`
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="${
      i == 0 ? "active" : ""
    }" aria-current="true" aria-label="Slide 1"></button>
    `);
  }
  body.innerHTML = "";
  body.insertAdjacentHTML("afterbegin", items.join(""));
};

const generateUserForm = (index, user) => {
  return `
    <div class="carousel-item ${index == 0 ? "active" : ""}">
      <form class="accommodationInfo">
      <div class="row">
        <div class="col-md-12 fw-bold" ><span>Khách ${index + 1}</span></div>
        <div class="col-md-6">
          <label class="labels">Mã Khách hàng</label>
          <input
            type="text"
            class="form-control"
            placeholder="Mã Khách Hang"
            value="${user ? user.userid : ""}"
            name="id"
            disabled
          />
        </div>
        <div class="col-md-6">
          <label class="labels">Loại khách</label>
          <select
              id="job"
              name="type"
              value=${user ? user.type.trim().toUpperCase() : "NOIDIA"}
              class="form-control border border-3 custom-select bg-white border-start-0 border-md"
            >
              <option value="NOIDIA" ${
                user?.type === "NOIDIA" ? "selected" : ""
              } >Nội địa</option>
              <option value="NUOCNGOAI" ${
                user?.type === "NUOCNGOAI" ? "selected" : ""
              } >Nước ngoài</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="labels">Tên</label>
          <input
            type="text"
            class="form-control"
            placeholder="Họ và tên"
            value="${user ? user.name : ""}"
            name="name"
          />
        </div>
        <div class="col-md-6">
          <label class="labels">CMND</label>
          <input
            type="text"
            class="form-control"
            placeholder="CMND"
            value="${user ? user.cmnd : ""}"
            name="cmnd"
          />
        </div>
        <div class="col-md-6">
          <label class="labels">SDT</label>
          <input
            type="text"
            class="form-control"
            placeholder="Số Điện Thoại"
            value="${user ? user.phone : ""}"
            name="phone"
          />
        </div>
        <div class="col-md-6">
          <label class="labels">Địa chỉ</label>
          <input
            type="text"
            class="form-control"
            placeholder="Địa chỉ"
            value="${user ? user.address : ""}"
            name="address"
          />
        </div>
      </form>
      
      </div>
    </div>
    `;
};

const renderForm = (num, users) => {
  const body = document.querySelector(".ticket-users");
  let items = [];
  //KHong co thong tin: Chỉ render form trống dua vao num
  for (let i = 0; i < num; i++) {
    items.push(generateUserForm(i, users[i]));
  }
  const markup = items.join("");
  body.innerHTML = "";
  body.insertAdjacentHTML("afterbegin", markup);

  renderIndicatorBtn(num);
};

const renderTicket = (ticketInfo) => {
  const room = document.querySelector(".ticket-room");
  const checkIn = document.querySelector(".ticket-checkIn");
  const id = document.querySelector(".ticket-id");
  const checkOut = document.querySelector(".ticket-checkOut");
  const numUser = document.querySelector(".ticket-num");

  room.textContent = ticketInfo.roomid;
  checkIn.textContent = hbsHelper.formatDate(ticketInfo.checkin);
  id.textContent = ticketInfo.ticketid;
  checkOut.textContent = hbsHelper.formatDate(ticketInfo.checkout);
  numUser.textContent = ticketInfo.num;

  renderForm(ticketInfo.num, ticketInfo.users);
};

export const getDetailBookingTicketHandler = async (e) => {
  if (!e.target.classList.contains("btn-checkIn")) return;
  //Get ticket Id
  const { ticket, room } = e.target.dataset;
  const { data: ticketInfo } = await api.getAccommodationInfo(ticket, room);
  console.log(ticketInfo);
  // Render ticket info
  renderTicket(ticketInfo.data);
};

export const updateAccommodationInfoHandler = async (e) => {
  try {
    if (!e.target.classList.contains("checkInBtn")) return;
    const forms = document.querySelectorAll(".accommodationInfo");
    let users = [];
    forms.forEach((form) => {
      const formData = new FormData(form); // create a new FormData object

      const userIdInput = form.querySelector('input[name="id"]');
      userIdInput.disabled = false;

      // Add the email input to the FormData object
      formData.set("id", userIdInput.value);
      const input = Object.fromEntries(formData.entries()); // convert the FormData object to a plain object

      if (input.id === "") delete input["id"];
      users.push(input);
    });

    const ticketId = document.querySelector(".ticket-id");
    const room = document.querySelector(".ticket-room");
    const num = document.querySelector(".ticket-num");
    console.log(users);
    renderSpinner(".ticket-users");
    const { data } = await api.updateAccommodationInfo(
      ticketId.textContent,
      room.textContent,
      users
    );
    renderForm(+num.textContent, data.data.users);
    updateStatus(ticketId, "DANGSUDUNG");
  } catch (err) {
    console.log(err);
  }
};

export const checkOutTicketHandler = async (e) => {
  if (!e.target.classList.contains("btn-checkOut")) return;
  //Get ticket Id
  const { ticketid, userid } = e.target.dataset;
  // Render ticket info
  const status = getStatus(ticketid);
  if (status === "DASUDUNG") {
    const { data } = await api.getInvoiceByTicketId(ticketid);
    const invoice = data.data.invoice;

    return location.assign(`/detailInvoice?id=${invoice}`);
  }
  const { data } = await api.createInvoice({ ticketId: ticketid, userid });
  updateStatus(ticketid, "DASUDUNG");
  return location.assign(`/detailInvoice?id=${data.data.invoiceId}`);
};
