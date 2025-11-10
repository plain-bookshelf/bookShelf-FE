import axios from "axios";

//백엔드 서버쪽 용 / ai 쪽 통신은 그냥 인스턴스 없이 깡으로 박음
export const instance = axios.create({
  baseURL: "http://13.124.75.92:8080",
  timeout: 1000000000,
  headers: { 
    'Content-Type': 'application/json',
    Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraW0iLCJhdXRoIjoiUk9MRV9VU0VSIiwiYWZmaWxpYXRpb25JZCI6MSwiZXhwIjoxNzYyNzg1MjkyfQ.k0G1xNS9Ik73UqV3aTzAIZCp_LPoPzfH64hiS7V9JqD89AVqEpVKsMPt0Go_UJFMEUCI2fXeEz_Y6dTIW3xfJg"
  },
})