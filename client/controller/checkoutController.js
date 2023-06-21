const api = require("../api");

exports.rendercheckoutPage = async (req, res) => {
    const { data } = await api.getAllRoom();

    // Trả về home.hbs
    res.render("checkoutPage", {
        template: { title: "Thanh toán" },
        listRoom: data.data,
    });
};
