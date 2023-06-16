/*
Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i) {
        block.data.index = i;
        block.data.first = i === 0;
        block.data.last = i === (n - 1);
        accum += block.fn(this);
    }
    return accum;
});*/

$('.detailInvoice').click(function(){
    window.location.href= `/detailInvoice?id=${$(this).attr('value')}`
})

$('#search-receipt-btn').click(function(){
    if($('#search-rec-id').val()!=""){
        window.location.href= `/detailInvoice?id=${$('#search-rec-id').val()}`
    }
    
})