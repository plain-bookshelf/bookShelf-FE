import axios from "axios";

//백엔드 서버쪽 용 / ai 통신 용 서버는 알아서
export const instance = axios.create({
  baseURL: "http://192.168.1.19:8000",
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
})