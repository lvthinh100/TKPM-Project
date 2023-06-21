const formBookingRoom = document.getElementById('bookingRoom');
//listRoom đã được tạo bên script_searchingRoom nên có thể xài tại đây
const btnCheckout = document.getElementById('btnCheckout');

const modalMaPhong = document.getElementById('modalMaPhong');
const modalImage = document.getElementById('modalImage');
const modalLoaiPhong = document.getElementById('modalLoaiPhong');
const modalTang = document.getElementById('modalTang');
const modalSoGiuong = document.getElementById('modalSoGiuong');
const modalSoKhach = document.getElementById('modalSoKhach');
const modalTinhTrang = document.getElementById('modalTinhTrang');
const modalMoTa = document.getElementById('modalMoTa');
const modalGhiChu = document.getElementById('modalGhiChu');


function updateForm() {
    formBookingRoom.innerHTML = '';
    listRoom.map(x => {
        if (x.children[0].checked) {
            const phong = x.children[2].cloneNode(true);
            phong.classList.add('card-text', 'float-start', 'mx-2');
            formBookingRoom.append(phong);
        }
    })
    if (!formBookingRoom.innerHTML)
        btnCheckout.classList.add("disabled");
    else
        btnCheckout.classList.remove("disabled");
}

function showInfoRoom(id) {
    const Room = document.getElementById(id + `     `).children[0];

    modalMaPhong.innerText = Room.children[2].innerText;
    modalImage.src = `public/image/` + Room.children[1].children[0].dataset.img;
    modalLoaiPhong.innerText = Room.children[3].innerText.split(' ').slice(2).join(' ');
    modalTang.innerText = Room.children[4].innerText.split(' ').slice(1).join(' ');
    modalSoGiuong.innerText = Room.children[5].innerText.split(' ').slice(2).join(' ');
    modalSoKhach.innerText = Room.children[6].innerText.split(' ').slice(4).join(' ');
    modalTinhTrang.innerText = Room.children[7].innerText.split(' ').slice(2).join(' ');
    modalMoTa.innerText = Room.children[8].innerText.split(' ').slice(2).join(' ');
    modalGhiChu.innerText = Room.children[9].innerText.split(' ').slice(2).join(' ');
}