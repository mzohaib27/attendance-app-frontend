import axios from "axios";
export const api = axios.create({
  baseURL:" https://attendance-backend-dd284de1b57d.herokuapp.com/"  ,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
