import MyPwResetInput from "../components/myPwReset/myPwResetInput"
import { PageWrapper } from "../layouts/pageWrapper"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

 interface ErrorsState {
  nowPassword: string
  newPassword: string
  confirmPassword: string
}

export default function MyPwReset(){
  
  const ASCII_REGEX = /[^\x20-\x7F]/g
  const ASCII_ERROR_MESSAGE = "영문, 숫자, 일반 특수문자만 입력 가능합니다."

  const [nowPassword, setNowPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<ErrorsState>({nowPassword: "", newPassword: "", confirmPassword: ""})
  const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate()
  
  /**
   * 입력값의 유효성을 검사하고, 오류 메시지만 설정합니다. (입력값 필터링 기능 제거)
   * @param key - 오류를 설정할 필드
   * @param value - 현재 입력된 문자열
   */
  const handleInputChangeValidation = (key: keyof ErrorsState, value: string) => {
    let newError = ""
    
    // 1. ASCII 범위 외 문자가 있는지 확인
    if (ASCII_REGEX.test(value)) {
      newError = ASCII_ERROR_MESSAGE
    }

    // 2. 필드별 유효성 검사 (길이, 빈 값, 일치 여부 등)
    
    if (key === "nowPassword") {
        if (!value.trim()) {
          newError = newError || "현재 비밀번호를 입력하세요"
        } else if (value.length < 8) {
          newError = newError || "8자 이상 자리를 입력하세요"
        }
      }else if (key === "newPassword") {
        if (!value.trim()) {
          newError = newError || "새 비밀번호를 입력하세요"
        } else if (value.length < 8) {
          newError = newError || "8자 이상 자리를 입력하세요"
        }
    } else if (key === "confirmPassword") {
        if (!value.trim()) {
          newError = newError || "비밀번호 확인을 입력하세요"
        } else if (newPassword !== value) {
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

    const handleNowPasswordChange = (value: string) => {
    setNowPassword(value) // 필터링 없이 값 그대로 저장
    handleInputChangeValidation("nowPassword", value)
  }

  const handlePasswordChange = (value: string) => {
    setNewPassword(value) // 필터링 없이 값 그대로 저장
    handleInputChangeValidation("newPassword", value)
    
    // 비밀번호 변경 시, 비밀번호 확인 필드의 오류도 함께 업데이트
    if (confirmPassword.trim()) {
      handleInputChangeValidation("confirmPassword", confirmPassword)
    }
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value) // 필터링 없이 값 그대로 저장
    handleInputChangeValidation("confirmPassword", value)
  }

  const handlePwReset = async () => {
    // 최종 제출 시점에서 모든 유효성 검사 다시 실행 (중복 검사)
    setErrors({
      nowPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    const newErrors = {
      nowPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
    
    // 1. ASCII 오류 확인 (회원가입 버튼 클릭 시)
    if (ASCII_REGEX.test(nowPassword)) {
       newErrors.nowPassword = ASCII_ERROR_MESSAGE
    }
    if (ASCII_REGEX.test(newPassword)) {
       newErrors.newPassword = ASCII_ERROR_MESSAGE
    }
    if (ASCII_REGEX.test(confirmPassword)) {
       newErrors.confirmPassword = ASCII_ERROR_MESSAGE
    }

    // 2. 기존 유효성 검사 (ASCII 오류가 없거나, 다른 오류가 있는 경우)

    if (!nowPassword.trim()) {
      newErrors.nowPassword = newErrors.newPassword || "현재 비밀번호를 입력하세요"
    } else if (nowPassword.length < 8) {
      newErrors.nowPassword = newErrors.newPassword || "8자 이상 자리를 입력하세요"
    }
    if (!newPassword.trim()) {
      newErrors.newPassword = newErrors.newPassword || "새 비밀번호를 입력하세요"
    } else if (newPassword.length < 8) {
      newErrors.newPassword = newErrors.newPassword || "8자 이상 자리를 입력하세요"
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = newErrors.confirmPassword || "비밀번호 확인을 입력하세요"
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = newErrors.confirmPassword || "비밀번호가 일치하지 않습니다"
    }

    if (newErrors.newPassword || newErrors.confirmPassword) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      // (서버 통신 시뮬레이션)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("비밀번호 재설정이 완료되었습니다!")

      setTimeout(() => {
        navigate("/showPw", { state: { resetPassword: newPassword } })
      }, 100)
    } catch (err) {

      console.log("비밀번호 재설정 중 오류 발생", err)
      
      setErrors({
        nowPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      // 서버 응답에서 오류 메시지를 추출하여 사용자에게 표시
      const errorMessage = err instanceof Error ? err.message : "비밀번호 재설정 중 알 수 없는 오류가 발생했습니다."
      
      setErrors(prevErrors => ({
        ...prevErrors,
        newPassword: errorMessage, // newPassword 필드에 서버 오류 메시지 표시
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <>
    <PageWrapper>
      <MyPwResetInput
        nowPassword={nowPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        isLoading={isLoading}
        nowPasswordError={errors.nowPassword}
        newPasswordError={errors.newPassword}
        confirmPasswordError={errors.confirmPassword}
        handleNowPasswordChange={handleNowPasswordChange}
        handlePasswordChange={handlePasswordChange}
        handleConfirmPasswordChange={handleConfirmPasswordChange}
        onSubmit={handlePwReset}
      />
    </PageWrapper>
    </>
  )
} 
