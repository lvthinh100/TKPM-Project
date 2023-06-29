import api from "./api.js";
import { renderSpinner } from "./ui.js";
const renderMessage = (message, role) => {
  document.querySelector(`.${role}-message`).textContent = message;
};

exports.handleRegister = async (e) => {
  try {
    e.preventDefault();
    const formData = new FormData(e.target); // create a new FormData object
    const input = Object.fromEntries(formData.entries()); // convert the FormData object to a plain object

    renderSpinner(".register-message");
    const resAPI = await api.register(input);

    location.assign("/user/profile");
  } catch (err) {
    const { data } = err.response;
    renderMessage(data.message, "register");
  }
};

exports.handleUserLogin = async (e) => {
  try {
    e.preventDefault();
    const formData = new FormData(e.target); // create a new FormData object
    const input = Object.fromEntries(formData.entries()); // convert the FormData object to a plain object

    renderSpinner(".user-message");
    const { data } = await api.login(input);

    location.assign("/home");
  } catch (err) {
    const { data } = err.response;
    renderMessage(data.message, "user");
  }
};

exports.handleAdminLogin = async (e) => {
  try {
    e.preventDefault();

    const formData = new FormData(e.target); // create a new FormData object
    const input = Object.fromEntries(formData.entries()); // convert the FormData object to a plain object

    const { usernameAdmin: username, passwordAdmin: password } = input;

    renderSpinner(".admin-message");
    const { data } = await api.loginAdmin({ username, password });

    location.assign("/admin");
  } catch (err) {
    const { data } = err.response;
    renderMessage(data.message, "admin");
  }
};
