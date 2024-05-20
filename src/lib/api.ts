// import dotenv from "dotenv";
import axios from "axios";

export const api = axios.create({
  baseURL: `https://randomuser.me/api`,
});
