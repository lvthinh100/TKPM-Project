$('#sign-out-btn').click(() => {
    location.replace('/sign-out');
})

$('.sign-up-btn').click(() => {
    location.replace('/auth/register');
})

$('.sign-in-btn').click(() => {
    location.replace('/auth/login');
});

$('#search-booking-btn').click(function() {
    window.location.href = `searchBooking?id=${$("#search-idbooking").val()}`;    
});

function openNav() {
    $("#mySidenav").css('width', "400px");
}

function closeNav() {
    $("#mySidenav").css('width', "0px");
}
$('.close-btn-container').click(function () {
    closeNav()
})
$('#close-nav-btn').click(function () {
    closeNav()
})

$('#menu-icon').click(function () {
    openNav()
})


$('input.search-field').on('keypress', function (event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector("button.search-items").click();
        return false;
    }
})