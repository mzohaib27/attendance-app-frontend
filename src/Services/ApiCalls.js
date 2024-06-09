import axios from "axios";
export const api = axios.create({
  baseURL:" https://attendance-app-backend-plpz.onrender.com   "  ,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
