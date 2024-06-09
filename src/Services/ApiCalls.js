import axios from "axios";
export const api = axios.create({
  baseURL: "https://plankton-app-6ipg6.ondigitalocean.app",

  baseURL: " https://attendance-app-backend-plpz.onrender.com   ",

  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
