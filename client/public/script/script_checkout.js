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
const numuser = document.getElementById('numUser');

currentDate.innerText = formatDate();
checkinDate.innerText = sessionStorage.getItem('checkinDate');
checkoutDate.innerText = sessionStorage.getItem('checkoutDate');

const listBooked = JSON.parse(sessionStorage.getItem('listRoomBooking'));

let temp = document.getElementById('listRoomBooked');
const listRoom = [].slice.call(temp.children);
const total = document.getElementById('total');

function fillData(){
    let cost = 0;
    let numUser = 0;
    listRoom.map(x => {
        if (listBooked.includes(x.id) == false)
            x.parentNode.removeChild(x)
        else {
            cost += parseFloat(x.children[5].innerText.slice(0, -4).split(".").join().replace(/,/g, ""));
            numUser += parseInt(x.children[4].innerText);
        }
    })
    console.log(cost);
    total.innerText = "Tổng chi phí: " + cost.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
    numuser.innerText = numUser;
}

temp.onload = fillData();