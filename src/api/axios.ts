import axios from "axios";

//백엔드 서버쪽 용 / ai 쪽 통신은 그냥 인스턴스 없이 깡으로 박음
export const instance = axios.create({
  baseURL: "http://13.124.75.92:8080",
  timeout: 3000,
  headers: { 
    'Content-Type': 'application/json',
    Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraW0iLCJhdXRoIjoiUk9MRV9VU0VSIiwiYWZmaWxpYXRpb25JZCI6MSwiZXhwIjoxNzYzMDI3MDU2fQ.MAfoKPpF5Y0BuhkgMQ9ibO818xCaE5drv8GShdLMh5X-1NLAShjbPJyWkHjziOwFBpT004S6uwD5WulP16u8kw"
  },
})