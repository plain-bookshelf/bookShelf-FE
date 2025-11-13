import axios from "axios";
//import { getAccessToken } from "../utils/tokenService";

//백엔드 서버쪽 용 / ai 쪽 통신은 그냥 인스턴스 없이 깡으로 박음
export const instance = axios.create({
  baseURL: "http://13.124.75.92:8080",
  timeout: 3000,
  headers: { 
    'Content-Type': 'application/json',
    Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaG8iLCJhdXRoIjoiUk9MRV9VU0VSIiwiYWZmaWxpYXRpb25JZCI6MSwiZXhwIjoxNzYzMTA4MDk1fQ.T-XaccrHVYCtByB6tCQsdWxkKJZoGVv5hY6ALCWfYdoA5wyGaLaK9s5MbgleiTIJntwWDzTZ2d2Z1iLsWTfTBg"
  },
})
