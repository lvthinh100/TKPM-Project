function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

function formatDate(date = new Date()) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }

const dateInput = document.getElementById('checkinDate');
dateInput.value = formatDate();