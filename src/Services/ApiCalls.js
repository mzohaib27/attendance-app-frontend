import axios from "axios";
export const api = axios.create({
  // baseURL: "https://plankton-app-6ipg6.ondigitalocean.app",

  baseURL: " http://localhost:4500",

  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
