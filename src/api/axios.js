import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/",   // ✅ backend 5000
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;