const api = require("../api/index");

function convertToVND(value) {
  try {
    var valueVND = "";
    for (var i = 1; i < value.length; i++) {
      if (value[i] == ".") {
        break;
      } else {
        if (value[i] != ",") {
          valueVND = valueVND + value[i];
        }
      }
    }

    valueVND = valueVND + "000";

    valueDivVND = "";
    var count = 0;
    for (var i = valueVND.length - 1; i >= 0; i--) {
      count = count + 1;
      valueDivVND = valueVND[i] + valueDivVND;
      if (count % 3 == 0 && i != 0) {
        valueDivVND = "." + valueDivVND;
      }
    }

    valueDivVND = valueDivVND + " VND";

    return valueDivVND;
  } catch (error) {
    return value;
  }
}

exports.renderDetailRoomInfoPage = async (req, res) => {
  var { data } = await api.getRoomById(req.query.id);
  roomData = data.data[0];

  var { data } = await api.getAllTypeRoom();
  typeRoomData = data.data;

  var valueVND = convertToVND(data.data[0].DONGIA);

  console.log("Value", valueVND);

  data.data[0].DONGIA = valueVND;

  // Trả về detailRoomInfoPage
  res.render("detailRoomInfoPage", {
    template: { title: "Test" },
    itemRoom: roomData,
    listTypeRoom: typeRoomData,
  });
};

exports.deleteRoomById = async (req, res) => {
  console.log(req.body.id);

  const { data } = await api.deleteRoomById(req.body.id);
  console.log(data);

  res.redirect("/listRoomInfo");
};

exports.updateRoomById = async (req, res) => {
  //console.log(req.body.id);

  var { data } = await api.getRoomById(req.query.id);
  roomData = data.data[0];
  console.log(roomData);

  const { resData } = await api.updateRoomById(roomData);
  console.log(resData);

  res.redirect("/detailRoomInfoPage?id=107");
};
