function change(state) {
    if(state === null) { // initial page
        $('body').html("Original");
    } else {
        $('body').html(state.data);
    }
}

$(window).on("popstate", function(e) {
    change(e.originalEvent.state);
});

$(".item-container").click(function(){
    id=$(this).attr('id');
    //window.location.href=`/item-detail?id=${id}`
    window.location.href=`/detailRoomInfo?id=${id}`
})