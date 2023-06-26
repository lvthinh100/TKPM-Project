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

const currentDate = document.getElementById('currentDate');
const checkinDate = document.getElementById('checkinDate');
const checkoutDate = document.getElementById('checkoutDate');

currentDate.innerText = formatDate();
checkinDate.innerText = sessionStorage.getItem('checkinDate');
checkoutDate.innerText = sessionStorage.getItem('checkoutDate');

const listBooked = JSON.parse(sessionStorage.getItem('listRoomBooking'));

let temp = document.getElementById('listRoomBooked');
const listRoom = [].slice.call(temp.children);
const total = document.getElementById('total');

function fillData(){
    let sum = 0;
    listRoom.map(x => {
        if (listBooked.includes(x.id) == false)
            x.parentNode.removeChild(x)
        else
            sum += parseFloat(x.children[5].innerText.substring(1).replace(/,/g, ""));
    })
    total.innerText = "Tổng chi phí: " + sum.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
}

temp.onload = fillData();