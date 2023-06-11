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
