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

const listRoom = [].slice.call(document.getElementsByClassName('card-sl'));
const inputMinBed = document.getElementById('minBed');
const inputMaxBed = document.getElementById('maxBed');
const inputMinGuess = document.getElementById('minGuess');
const inputMaxGuess = document.getElementById('maxGuess');

function checkBed() {
  listRoom.map(x => {
    if ((inputMinBed.value && x.dataset.sogiuong < inputMinBed.value) ||
      (inputMaxBed.value && x.dataset.sogiuong > inputMaxBed.value)) {
      x.parentElement.classList.add("disabledbutton")
      x.children[0].checked = false;
    }
    else {
      x.parentElement.classList.remove("disabledbutton");
    }
  })
  updateForm();
}

function checkGuess() {
  listRoom.map(x => {
    if ((inputMinGuess.value && x.dataset.sokhach < inputMinGuess.value) ||
      (inputMaxGuess.value && x.dataset.sokhach > inputMaxGuess.value)) {
      x.parentElement.classList.add("disabledbutton")
      x.children[0].checked = false;

    }
    else {
      x.parentElement.classList.remove("disabledbutton");
    }
  })
  updateForm();
}