function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

formatDate = (date = new Date()) => {
  return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
  ].join('-');
}

const dateInput = document.getElementById('checkinDate');
dateInput.value = formatDate();

const listRoom = [].slice.call(document.getElementsByClassName('card-sl'));
const checkinDate = document.getElementById('checkinDate');
const checkoutDate = document.getElementById('checkoutDate');
const inputMinBed = document.getElementById('minBed');
const inputMaxBed = document.getElementById('maxBed');
const inputMinGuess = document.getElementById('minGuess');
const inputMaxGuess = document.getElementById('maxGuess');

function checkBed(x){
  const checkMinBed = inputMinBed.value && x.dataset.sogiuong < inputMinBed.value;
  const checkMaxBed = inputMaxBed.value && x.dataset.sogiuong > inputMaxBed.value;
  const result = (inputMinBed.value !== '' || inputMaxBed.value !== '') && (checkMinBed || checkMaxBed) ;
  return result;
}

function checkGuess(x){
  const checkMinGuess = inputMinGuess.value && x.dataset.sokhach < inputMinGuess.value;
  const checkMaxGuess = inputMaxGuess.value && x.dataset.sokhach > inputMaxGuess.value;
  const result = (inputMinGuess.value !== '' || inputMaxGuess.value !== '') && (checkMinGuess || checkMaxGuess);
  return result;
}

function checkDate() {
  let checkin = new Date(checkinDate.value);
  let checkout = new Date(checkoutDate.value);
  result = false;
  return result;
}

function filter(x) {
  const invalid = checkGuess(x) || checkBed(x) || checkDate(x);
  if (invalid) {
    x.parentElement.classList.add("disabledbutton")
    //x.children[0].checked = false;
  }
  else {
    x.parentElement.classList.remove("disabledbutton");
  }
}

function checkCondition() {
  listRoom.map(x => filter(x))
  updateForm();
}