import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordByFind } from "../api/pwReset";
import { Reset } from "../components/auth/pwFind/reset";

const ASCII_REGEX = /[^\x20-\x7F]/;

// 비밀번호 재설정은 "비밀번호 찾기" 단계에서 전달된 이메일이 있을 때만 동작한다.
export default function PwReset() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const email = location.state?.email ?? "";

  const handleSubmit = async () => {
    // 이 페이지에 직접 진입한 경우를 막기 위해 이메일 state 유무를 먼저 확인한다.
    if (!email) return setError("이메일 인증 정보가 없어요. 처음부터 다시 진행해 주세요.");
    if (!newPassword.trim()) return setError("새 비밀번호를 입력해주세요.");
    if (newPassword.length < 8) return setError("비밀번호는 8자 이상이어야 해요.");
    if (ASCII_REGEX.test(newPassword)) return setError("비밀번호는 영문, 숫자, 일반 특수문자만 사용할 수 있어요.");
    if (!confirmPassword.trim()) return setError("새 비밀번호 확인을 입력해주세요.");
    if (newPassword !== confirmPassword) return setError("새 비밀번호가 서로 일치하지 않아요.");

    setIsLoading(true);
    setError("");
    try {
      // 비밀번호 찾기 이후 재설정은 이메일 인증 흐름에 연결된 전용 API를 사용한다.
      await resetPasswordByFind(email, newPassword);
      navigate("/showPw", { state: { email } });
    } catch (submitError) {
      if (submitError instanceof Error && submitError.message === "MEMBER_NOT_FOUND") {
        setError("회원 정보를 찾을 수 없어요. 다시 확인해 주세요.");
      } else {
        setError(submitError instanceof Error ? submitError.message : "비밀번호 재설정에 실패했어요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Reset
      username={username}
      currentPassword={currentPassword}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      error={error}
      isLoading={isLoading}
      onUsernameChange={setUsername}
      onCurrentPasswordChange={setCurrentPassword}
      onNewPasswordChange={(value) => {
        setNewPassword(value);
        setError("");
      }}
      onConfirmPasswordChange={(value) => {
        setConfirmPassword(value);
        setError("");
      }}
      onSubmit={handleSubmit}
    />
  );
}
