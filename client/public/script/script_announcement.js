$('.fa-window-close').click(function () {
    $('.noti-content').html('')
    $('.pop-up-graph').toggleClass('visibility-hidden')
    if (!($('.pop-up').hasClass('hidden'))) {
        $('.pop-up').addClass('hidden')
    }
});


$('.pop-up').click(function () {
    $(this).addClass('hidden')

});

$('.popup-container').click(function (event) {
    event.stopPropagation()
});

