import axios from "axios";

//백엔드 서버쪽 용 / ai 쪽 통신은 그냥 인스턴스 없이 깡으로 박음
export const instance = axios.create({
  baseURL: "http://13.125.65.240:8080",
  timeout: 100000000,
  headers: { 
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraW0iLCJhdXRoIjoiUk9MRV9VU0VSIiwiYWZmaWxpYXRpb25JZCI6MSwiZXhwIjoxNzYyNDI5MDM3fQ.9qMZfNgWiaIxZn2IyCXwz_OrWvGNDNnozwKsEFIxeV2uLNp3VgL61mM2DqDpdlqgICa675uvjNuvTk5sSx-Qiw
`
  },
})