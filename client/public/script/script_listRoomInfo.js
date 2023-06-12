function change(state) {
    console.log('hehe')
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
    console.log("ALOLALO");
    //window.location.href=`/item-detail?id=${id}`
    window.location.href=`/detailRoomInfo`
})