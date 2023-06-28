$('.detailInvoice').click(function(){
    window.location.href= `/detailInvoice?id=${$(this).attr('value')}`
})

$('#search-receipt-btn').click(function(){
    if($('#search-rec-id').val()!=""){
        window.location.href= `/detailInvoice?id=${$('#search-rec-id').val()}`
    }
    
})