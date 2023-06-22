const api = require("../api/index");

function convertToVND(value) {
  try {
    var valueVND = "";
    for (var i = 1; i < value.length; i++) {
      if (value[i] == '.') {
        break;
      }
      else {
        if (value[i] != ',') {
          valueVND = valueVND + value[i];
        }

      }
    }

    valueVND = valueVND + '000';

    valueDivVND = "";
    var count = 0;
    for (var i = valueVND.length - 1; i >= 0; i--) {
      count = count + 1;
      valueDivVND = valueVND[i] + valueDivVND;
      if (count % 3 == 0 && i != 0) {
        valueDivVND = '.' + valueDivVND;
      }
    }

    valueDivVND = valueDivVND + ' VND';

    return valueDivVND
  } catch (error) {
    return value
  }

}

exports.renderDetailRoomInfoPage = async (req, res) => {
  console.log(req.query.id);

  const { data } = await api.getRoomById(req.query.id);

  console.log(data.data[0])

  var valueVND = convertToVND(data.data[0].DONGIA);

  console.log("Value", valueVND);

  data.data[0].DONGIA = valueVND

  // Trả về detailRoomInfoPage
  res.render("detailRoomInfoPage", {
    template: { title: "Test" },

    itemRoom: data.data[0],
  });
};


exports.deleteRoomById = async (req, res) => {
  console.log(req.body.id)
  //console.log(req.data);

  const { data } = await api.deleteRoomById(req.body.id);
  console.log(data)

  //console.log(data.data[0])

  // Trả về listRoomInfo
  /*
  res.render("detailRoomInfoPage", {
    template: { title: "Test" },

    itemRoom: data.data[0],
  });
  */
};