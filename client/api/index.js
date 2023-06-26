const axios = require("axios");

const server = "http://127.0.0.1:3000";


exports.register = async (user) =>
  axios.post(`${server}/api/auth/register`, user);

exports.login = async (user) => axios.post(`${server}/api/auth/login`, user);

exports.loginAdmin = async (user) =>
  axios.post(`${server}/api/auth/admin/login`, user);

exports.getMe = async (cookies) =>
  axios.get(`${server}/api/user/me`, {
    headers: {
      Cookie: cookies,
    },
  });

exports.getAllRoom = async () => axios.get(`${server}/api/room/`);
exports.createRoom = async (data) => axios.post(`${server}/api/room/`, data);
exports.getRoomById = async (id) => axios.get(`${server}/api/room/${id}`);

exports.getAllTypeRoom = async () => axios.get(`${server}/api/typeRoom/`);

exports.getAllInvoice = async () => axios.get(`${server}/api/invoice/`);
exports.getInvoiceById = async (id) => axios.get(`${server}/api/invoice/${id}`);

exports.getDetailInvoiceById = async (id) => axios.get(`${server}/api/detailInvoice/${id}`);

exports.getDetailTicket = async (id) => axios.get(`${server}/api/bookingTicket/detail/${id}`);
exports.getAllTicket = async () => axios.get(`${server}/api/bookingTicket/ticket/`);
exports.getTicketsByUser = async (id) => axios.get(`${server}/api/bookingTicket/ticket/${id}`);


