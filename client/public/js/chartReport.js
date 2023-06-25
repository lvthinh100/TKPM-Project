import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
