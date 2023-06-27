import axios from "axios";
const server = "http://127.0.0.1:3000";

exports.createTicket = async (data) =>
  axios.post(`${server}/api/bookingTicket`, data);

exports.searchTicket = async (text, status) => {
  if (!text)
    return axios.get(`${server}/api/bookingTicket/search?status=${status}`);

  const validStr = text.replace(" ", "%20");
  if (!status)
    return axios.get(`${server}/api/bookingTicket/search?search=${validStr}`);
  return axios.get(
    `${server}/api/bookingTicket/search?search=${validStr}&status=${status}`
  );
};
exports.login = async (user) =>
  axios.post(`${server}/api/auth/login`, user, { withCredentials: true });
exports.loginAdmin = async (user) =>
  axios.post(`${server}/api/auth/admin/login`, user, { withCredentials: true });
exports.register = async (user) =>
  axios.post(`${server}/api/auth/register`, user, { withCredentials: true });
exports.getAccommodationInfo = async (ticketId, roomId) =>
  axios.get(`${server}/api/bookingTicket/${ticketId}?room=${roomId}`);
exports.updateAccommodationInfo = async (ticketId, roomId, users) =>
  axios.patch(
    `${server}/api/bookingTicket/checkIn/${ticketId}?room=${roomId}`,
    users
  );

exports.getReportMetrics = async (month, year, type) =>
  axios.get(`${server}/api/report/${type}?year=${year}&month=${month}`);
