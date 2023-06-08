const express = require('express');
const roomController = require('../controller/RoomController');

//Comment API
const router = express.Router();

router.get('/', roomController.getRoomInfo);
//router.post('/', productController.createProducts);

module.exports = router;
