const axios = require("axios");

const server = "http://127.0.0.1:3000";

exports.getAllRoom = async () => axios.get(`${server}/api/room/`);
exports.createRoom = async (data) => axios.post(`${server}/api/room/`, data);
exports.getRoomById = async (id) => axios.get(`${server}/api/room/${id}`);
