import LoginInput from "../components/login/loginInput";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageWrapper } from '../layouts/pageWrapper';

export default function Login() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async () => {
    // 1. 이전 메시지 초기화 
    setError("")

    // 2. 입력값 유효성 검사
    if (!identifier.trim() || !password.trim()) {
      setError("로그인 정보 또는 아이디가 틀렸습니다.")
      setLoginError(true);
      return
    }

    // 3. 로딩 상태 시작
    setIsLoading(true)

    try {

      // ... (로그인 시도 및 API 시뮬레이션)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // API 작성 부분
      /*
      ...
      ...
      */
      // 4. 로그인 성공 처리 (데모 목적)
      localStorage.setItem("user", JSON.stringify({ identifier }))

      console.log("Login successful")

      setTimeout(() => {
        navigate("/")  // 1초 후 메인 페이지로 이동
      }, 100)
    } catch (err) {
      console.error("Login error:", err)
      setError(err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <PageWrapper>
        <LoginInput
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