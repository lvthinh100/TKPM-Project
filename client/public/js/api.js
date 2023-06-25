import axios from "axios";
const server = "http://127.0.0.1:3000";

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
