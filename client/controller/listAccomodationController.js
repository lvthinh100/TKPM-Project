const api = require("../api/index");

exports.renderlistAccomodationPage = async (req, res) => {
    const { data } = await api.getAllAccomodationsInfo();
    console.log(data.data[0]);

    res.render("listAccomodationPage", {
        template: { title: "Chi tiết phiếu đặt phòng" },
        listAccomodation: data.data,
    });
};