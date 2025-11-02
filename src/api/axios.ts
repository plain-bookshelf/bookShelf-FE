import axios from "axios";

export const instance = axios.create({
  baseURL: "http://192.168.1.19:8000",
  timeout: 900000,
  headers: { 'Content-Type': 'application/json' },
})