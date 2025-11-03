 import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // base route for auth
});

export default API;
