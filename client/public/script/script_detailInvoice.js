$("#search-id-btn").click(function () {
    if ($("#id-invoice-search-field").val() != "") {
        window.location.href = `?id=${$("#id-invoice-search-field").val()}`;
    }
});