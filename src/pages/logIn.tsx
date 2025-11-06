import LogInInfo from "../components/login/loginInput"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageWrapper } from '../layouts/pageWrapper';
import { postLogin } from "../api/authApi";

export default function LogIn() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async () => {
    // 1. 이전 메시지 초기화 
    setError("")
    setLoginError(false)

    // 2. 입력값 유효성 검사
    if (!identifier.trim()) {
      setError("로그인 정보을 입력해주세요")
      setLoginError(true);
      return
    }

    if (!password.trim()) {
      setError("비밀번호를 입력해주세요")
      setLoginError(true);
      return
    }
    
    if (!identifier.trim() || !password.trim()) {
      setError("로그인 정보 또는 비밀번호를 입력해주세요")
      setLoginError(true);
      return
    }

    // 3. 로딩 상태 시작
    setIsLoading(true)

    try {

      const loginRequestData = {
        credential: identifier,
        password: password,
      };

      const response = await postLogin(loginRequestData);
      
      const tokenData = response.data;

      localStorage.setItem("access_token", tokenData.access_token);
      localStorage.setItem("refresh_token", tokenData.refresh_token);
      // 사용자 정보 (예: credential) 저장
      localStorage.setItem("user", JSON.stringify({ identifier }));

      console.log("Login successful. Access Token saved.");

      setTimeout(() => {
        navigate("/")  // 1초 후 메인 페이지로 이동
      }, 100)
    } catch (err) {
      const errorMsg = err instanceof Error 
        ? err.message // postLogin에서 던져진 에러 메시지 (예: "회원정보가 없습니다.")
        : "알 수 없는 로그인 오류가 발생했습니다.";

      console.error("Login error:", err);
      setError(errorMsg);
      setLoginError(true);
    
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <PageWrapper>
        <LogInInfo
          identifier={identifier}
          password={password}
          error={error}
          loginError={loginError}
          onEmailChange={setIdentifier}
          onPasswordChange={setPassword}
          onSubmit={handleLogin}
          isLoading={isLoading}
        />    
      </PageWrapper>
    </>
  )
}