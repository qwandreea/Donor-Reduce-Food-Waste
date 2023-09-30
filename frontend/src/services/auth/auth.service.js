import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";

const register = (firstName, lastName, phone, email, password, isVolunteer, organisation) => {
  return axios
    .post(API_URL + "signup", {
      firstName,
      lastName,
      phone,
      email,
      password,
      isVolunteer,
      organisation
    });
};

const registerBusinessUser = (type, cif, denumire, phone, adresa, email, password, tip) => {
  return axios
    .post(API_URL + "signup", {
      type,
      cif,
      denumire,
      phone,
      adresa,
      email,
      password,
      tip
    })
}

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password
    })
    .then((response) => {
      console.log(response)
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }).catch(err => {
      console.log(err.message)
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  registerBusinessUser
};

export default AuthService;