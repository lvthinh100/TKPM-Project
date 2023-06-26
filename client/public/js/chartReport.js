import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import api from "./api.js";

// Chart
let barChart;
let pieChart;
const renderChart = (title, data) => {
  barChart = new Chart(document.getElementById("chartReport"), {
    type: "bar",
    data: {
      labels: data.map((row) => row.typeid),
      datasets: [
        {
          label: title,
          data: data.map((row) => row.amount),
        },
      ],
    },
  });

  pieChart = new Chart(document.getElementById("pieChartReport"), {
    type: "pie",
    data: {
      labels: data.map((row) => row.typeid),
      datasets: [
        {
          label: title,
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

const resetChart = () => {
  if (barChart) barChart.destroy();
  if (pieChart) pieChart.destroy();
};

// renderChart(dataset);

export const reportHandler = async (e) => {
  try {
    e.preventDefault();
    const formData = new FormData(e.target); // create a new FormData object
    const input = Object.fromEntries(formData.entries()); // convert the FormData object to a plain object
    const [year, month] = input.time.split("-");
    const { data } = await api.getReportMetrics(month, year, input.type);

    if (data.data.dataset.length === 0) return;
    console.log(data);
    resetChart();
    switch (input.type) {
      case "revenue":
        renderChart("Thống kê doanh thu", data.data.dataset);
        break;
      case "efficiency":
        renderChart("Thống kê hiệu suất", data.data.dataset);
        break;
      default:
        break;
    }
  } catch (err) {
    console.log(err);
  }
};
