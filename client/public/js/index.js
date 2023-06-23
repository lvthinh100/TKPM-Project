import axios from "axios";
import api from "../../api/index.js";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
// const registerForm = document.querySelector("#form__register");
// registerForm?.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const formData = new FormData(form);
//   const data = Object.fromEntries(formData.entries());
//   console.log(data);
// });

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
  console.log(formMarkup);
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
  console.log(items);
  const markup = items.join("");
  return markup;
};

const booking = document.querySelector(".booking");
if (booking)
  booking.addEventListener("click", async (e) => {
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
  });

// Chart
const renderChart = () => {
  const data = [
    { type: "A", amount: 200.0 },
    { type: "B", amount: 300.0 },
    { type: "C", amount: 400.0 },
    { type: "D", amount: 500.0 },
  ];
  new Chart(document.getElementById("chartReport"), {
    type: "bar",
    data: {
      labels: data.map((row) => row.type),
      datasets: [
        {
          label: "Thống kê doanh thu từng loại phòng tháng 4/2022",
          data: data.map((row) => row.amount),
        },
      ],
    },
  });

  new Chart(document.getElementById("pieChartReport"), {
    type: "pie",
    data: {
      labels: data.map((row) => row.type),
      datasets: [
        {
          label: "Thống kê doanh thu từng loại phòng tháng 4/2022",
          data: data.map((row) => row.amount),
          datalabels: {
            anchor: "center",
          },
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          formatter: function (value, context) {
            var dataset = context.chart.data.datasets[context.datasetIndex];
            var total = dataset.data.reduce(function (
              previousValue,
              currentValue,
              currentIndex,
              array
            ) {
              return previousValue + currentValue;
            });
            var currentValue = dataset.data[context.dataIndex];
            var percentage = Math.floor((currentValue / total) * 100 + 0.5);
            return percentage + "%";
          },
          display: function (context) {
            var dataset = context.dataset;
            var count = dataset.data.length;
            var value = dataset.data[context.dataIndex];
            return value > count * 1.5;
          },
          colors: "black",
          font: {
            weight: "bold",
            size: 20,
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });
};

renderChart();
