import { PageWrapper } from "../layouts/pageWrapper"
import SingupInput from "../components/signup/singupInput"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Signup from "../api/signup"

// 허용되는 문자
const ASCII_REGEX = /[^\x20-\x7F]/
const ASCII_ERROR_MESSAGE = "영문, 숫자, 일반 특수문자만 입력 가능합니다."
const FIXED_AFFILIATION = "대덕소프트웨어마이스터고"

export default function Singup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [affiliation] = useState(FIXED_AFFILIATION)
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  
  /**
   * 입력값의 유효성을 검사하고, 오류 메시지만 설정합니다.
   * @param key - 오류를 설정할 필드
   * @param value - 현재 입력된 문자열
   */
  const handleInputChangeValidation = (key: keyof typeof errors, value: string) => {
    let newError = ""
    
    // 1. ASCII 범위 외 문자가 있는지 확인
    if (ASCII_REGEX.test(value)) {
      newError = ASCII_ERROR_MESSAGE
    }

    // 2. 필드별 유효성 검사 (길이, 빈 값, 일치 여부 등)
    if (key === "username") {
        if (!value.trim()) {
          newError = newError || "아이디를 입력하세요"
        } else if (value.length < 3 || value.length > 16) {
          newError = newError || "3~16자 이내로 입력하세요"
        }
    } else if (key === "password") {
        if (!value.trim()) {
          newError = newError || "비밀번호를 입력하세요"
        } else if (value.length < 8) {
          newError = newError || "8자 이상 자리를 입력하세요"
        }
    } else if (key === "confirmPassword") {
        if (!value.trim()) {
          newError = newError || "비밀번호 확인을 입력하세요"
        } else if (password !== value) {
          // 비밀번호 불일치는 전체 유효성 검사 시점에 다시 확인되지만,
          // 입력 중 사용자 피드백을 위해 미리 체크
          newError = newError || "비밀번호가 일치하지 않습니다"
        }
    }

    // 3. 오류 상태 업데이트
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: newError,
    }))
  }

  const handleUsernameChange = (value: string) => {
    setUsername(value) // 필터링 없이 값 그대로 저장
    handleInputChangeValidation("username", value)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value) // 필터링 없이 값 그대로 저장
    handleInputChangeValidation("password", value)
    
    // 비밀번호 변경 시, 비밀번호 확인 필드의 오류도 함께 업데이트
    if (confirmPassword.trim()) {
      handleInputChangeValidation("confirmPassword", confirmPassword)
    }
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value) // 필터링 없이 값 그대로 저장
    handleInputChangeValidation("confirmPassword", value)
  }

  const handleSignup = async () => {
    // 최종 제출 시점에서 모든 유효성 검사 다시 실행 (중복 검사)
    setErrors({
      username: "",
      password: "",
      confirmPassword: "",
    })

    const newErrors = {
      username: "",
      password: "",
      confirmPassword: "",
    }
    
    // 1. ASCII 오류 확인 (회원가입 버튼 클릭 시)
    if (ASCII_REGEX.test(username)) {
       newErrors.username = ASCII_ERROR_MESSAGE
    }
    if (ASCII_REGEX.test(password)) {
       newErrors.password = ASCII_ERROR_MESSAGE
    }
    if (ASCII_REGEX.test(confirmPassword)) {
       newErrors.confirmPassword = ASCII_ERROR_MESSAGE
    }

    // 2. 기존 유효성 검사 (ASCII 오류가 없거나, 다른 오류가 있는 경우)
    if (!username.trim()) {
      newErrors.username = newErrors.username || "아이디를 입력하세요"
    } else if (username.length < 3 || username.length > 16) {
      newErrors.username = newErrors.username || "3~16 이내로 자리를 입력하세요"
    }

    if (!password.trim()) {
      newErrors.password = newErrors.password || "비밀번호를 입력하세요"
    } else if (password.length < 8) {
      newErrors.password = newErrors.password || "8자리 이상 자리를 입력하세요"
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = newErrors.confirmPassword || "비밀번호 확인을 입력하세요"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = newErrors.confirmPassword || "비밀번호가 일치하지 않습니다"
    }

    if (newErrors.username || newErrors.password || newErrors.confirmPassword) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    const requsetData = {
      user_name: username,
      nick_name: username,
      password: password,
      address: "",
    }

    try {
      // (서버 통신 시뮬레이션)
      const userData = await Signup(requsetData)
      
      console.log("회원가입 데이터:", {userData})
      alert("회원가입이 완료되었습니다!")

      setTimeout(() => {
        navigate("/Login")
      }, 100)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "회원가입 중 오류가 발생하였습니다"
      console.error("🚨 회원가입 실패:", errorMessage);
      
      alert(`회원가입 실패: ${errorMessage}`);
      
      setErrors({
        username: "",
        password: "",
        confirmPassword: "",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <PageWrapper>
        <SingupInput
          username={username}
          password={password}
          confirmPassword={confirmPassword}
          affiliation={affiliation}
          errors={errors}
          onUsernameChange={handleUsernameChange}
          onPasswordChange={handlePasswordChange}
          onConfirmPasswordChange={handleConfirmPasswordChange}
          onSubmit={handleSignup}
          isLoading={isLoading}
        />
      </PageWrapper>
    </>
  )
}