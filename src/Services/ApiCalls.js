import axios from "axios";
export const api = axios.create({
  // baseURL: "http://localhost:4500",
  baseURL: "https://plankton-app-6ipg6.ondigitalocean.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
