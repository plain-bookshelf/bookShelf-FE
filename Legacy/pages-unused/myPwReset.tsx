import MyPwResetInput from "../shared/myPwReset/myPwResetInput";
import { PageWrapper } from "../layouts/pageWrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/pwReset";

/**
 * 마이페이지 비밀번호 변경 페이지
 *
 * 이 화면은 "로그인된 사용자가 자신의 비밀번호를 바꾸는 경우"를 담당한다.
 * 비밀번호 찾기 기반 재설정과 달리 현재 비밀번호(existing password)를 함께 받아
 * 실제 본인 확인을 거친 뒤 변경 API를 호출한다.
 */
interface ErrorsState {
  username: string;
  nowPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ASCII_REGEX = /[^\x20-\x7F]/;
const ASCII_ERROR_MESSAGE = "영문, 숫자, 일반 특수문자만 입력 가능해요.";

// 마이페이지 비밀번호 변경은 로그인 상태를 전제로 하므로 현재 비밀번호 검증이 핵심이다.
export default function MyPwReset() {
  // UI 입력 상태
  const [username, setUsername] = useState("");
  const [nowPassword, setNowPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // 필드별 에러를 분리해 어느 칸이 문제인지 즉시 보여 주기 위한 상태
  const [errors, setErrors] = useState<ErrorsState>({
    username: "",
    nowPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  // 제출 중 중복 호출 방지
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChangeValidation = (key: keyof ErrorsState, value: string) => {
    // 입력 중 검증은 사용자가 어느 칸에서 막혔는지 바로 알 수 있게 돕는다.
    let newError = "";

    if (ASCII_REGEX.test(value)) {
      newError = ASCII_ERROR_MESSAGE;
    }

    if (key === "nowPassword") {
      if (!value.trim()) newError = newError || "현재 비밀번호를 입력해주세요.";
      else if (value.length < 8) newError = newError || "8자 이상 입력해주세요.";
    } else if (key === "newPassword") {
      if (!value.trim()) newError = newError || "새 비밀번호를 입력해주세요.";
      else if (value.length < 8) newError = newError || "8자 이상 입력해주세요.";
    } else if (key === "confirmPassword") {
      if (!value.trim()) newError = newError || "비밀번호 확인을 입력해주세요.";
      else if (newPassword !== value) newError = newError || "비밀번호가 일치하지 않아요.";
    }

    setErrors((prev) => ({ ...prev, [key]: newError }));
  };

  const validateAll = (): ErrorsState => {
    // 제출 시에는 현재 입력 전체를 한 번 더 점검해 누락된 에러를 방지한다.
    const newErrors: ErrorsState = {
      username: "",
      nowPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (ASCII_REGEX.test(nowPassword)) newErrors.nowPassword = ASCII_ERROR_MESSAGE;
    if (ASCII_REGEX.test(newPassword)) newErrors.newPassword = ASCII_ERROR_MESSAGE;
    if (ASCII_REGEX.test(confirmPassword)) newErrors.confirmPassword = ASCII_ERROR_MESSAGE;

    if (!nowPassword.trim()) newErrors.nowPassword = newErrors.nowPassword || "현재 비밀번호를 입력해주세요.";
    else if (nowPassword.length < 8) newErrors.nowPassword = newErrors.nowPassword || "8자 이상 입력해주세요.";

    if (!newPassword.trim()) newErrors.newPassword = newErrors.newPassword || "새 비밀번호를 입력해주세요.";
    else if (newPassword.length < 8) newErrors.newPassword = newErrors.newPassword || "8자 이상 입력해주세요.";

    if (!confirmPassword.trim()) newErrors.confirmPassword = newErrors.confirmPassword || "비밀번호 확인을 입력해주세요.";
    else if (newPassword !== confirmPassword) newErrors.confirmPassword = newErrors.confirmPassword || "비밀번호가 일치하지 않아요.";

    return newErrors;
  };

  const handlePwReset = async () => {
    /**
     * 최종 제출 로직
     *
     * 1. 기존 에러 초기화
     * 2. 전체 필드 재검증
     * 3. 검증 통과 시 changePassword API 호출
     * 4. 성공 시 완료 화면 이동
     * 5. 실패 시 서버 오류를 다시 폼 에러로 변환
     */
    setErrors({ username: "", nowPassword: "", newPassword: "", confirmPassword: "" });
    const newErrors = validateAll();

    if (newErrors.nowPassword || newErrors.newPassword || newErrors.confirmPassword) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // 로그인 상태 변경은 access token 기준이라 기존 비밀번호와 새 비밀번호만 보낸다.
      await changePassword(nowPassword, newPassword);
      alert("비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.");
      navigate("/showPw");
    } catch (error: unknown) {
      let message = "비밀번호 변경 중 오류가 발생했어요.";

      if (error instanceof Error) {
        if (error.message === "NOT_MATCH_EXISTING_PASSWORD") {
          message = "기존 비밀번호가 일치하지 않습니다.";
        } else if (error.message === "MEMBER_NOT_FOUND") {
          message = "회원 정보를 찾을 수 없어요.";
        } else {
          message = error.message;
        }
      }

      setErrors((prev) => ({ ...prev, newPassword: message }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <MyPwResetInput
        username={username}
        nowPassword={nowPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        usernameError={errors.username}
        nowPasswordError={errors.nowPassword}
        newPasswordError={errors.newPassword}
        confirmPasswordError={errors.confirmPassword}
        isLoading={isLoading}
        handleUsernameChange={setUsername}
        handleNowPasswordChange={(value) => {
          setNowPassword(value);
          handleInputChangeValidation("nowPassword", value);
        }}
        handlePasswordChange={(value) => {
          setNewPassword(value);
          handleInputChangeValidation("newPassword", value);
          if (confirmPassword.trim()) handleInputChangeValidation("confirmPassword", confirmPassword);
        }}
        handleConfirmPasswordChange={(value) => {
          setConfirmPassword(value);
          handleInputChangeValidation("confirmPassword", value);
        }}
        onSubmit={handlePwReset}
      />
    </PageWrapper>
  );
}


