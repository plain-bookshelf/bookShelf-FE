import axios from "axios";

//백엔드 서버쪽 용 / ai 쪽 통신은 그냥 인스턴스 없이 깡으로 박음
export const instance = axios.create({
  baseURL: "http://13.124.75.92:8080",
  timeout: 3000,
  headers: { 
    'Content-Type': 'application/json',
    Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5hZ2VyIiwiYXV0aCI6IlJPTEVfTUFOQUdFUiIsImFmZmlsaWF0aW9uSWQiOjEsImV4cCI6MTc2Mjc4ODY1N30.cGVbT3Ls2qGAo-JwDkwdmfPBkJ8U7oQnpAz5rzSqAKyKpe_RStD00xvNRI50ec-brZQOcSw1mBe5vecrIevMhg"
  },
})