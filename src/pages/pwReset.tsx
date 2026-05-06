import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordByFind } from "../api/pwReset";
import { Reset } from "../features/auth/pwFind/reset";

const ASCII_REGEX = /[^\x20-\x7F]/;

export default function PwReset() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setError("이메일 인증 정보가 없어요. 처음부터 다시 진행해 주세요.");
      return;
    }

    if (!newPassword.trim()) {
      setError("새 비밀번호를 입력해 주세요.");
      return;
    }

    if (newPassword.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    if (ASCII_REGEX.test(newPassword)) {
      setError("비밀번호는 영문, 숫자, 일반 특수문자만 사용할 수 있습니다.");
      return;
    }

    if (!confirmPassword.trim()) {
      setError("새 비밀번호 확인을 입력해 주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("새 비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await resetPasswordByFind(email, newPassword);
      navigate("/showPw", { state: { email } });
    } catch (submitError) {
      if (submitError instanceof Error && submitError.message === "REGISTER_TOKEN_MISSING") {
        setError("인증 정보가 만료되었어요. 비밀번호 찾기부터 다시 진행해 주세요.");
      } else if (submitError instanceof Error && submitError.message === "MEMBER_NOT_FOUND") {
        setError("회원 정보를 찾을 수 없어요. 다시 확인해 주세요.");
      } else if (
        submitError instanceof Error &&
        submitError.message === "NOT_MATCH_VERIFICATION_CODE"
      ) {
        setError("인증 정보가 유효하지 않아요. 인증번호 확인부터 다시 진행해 주세요.");
      } else {
        setError(submitError instanceof Error ? submitError.message : "비밀번호 재설정에 실패했어요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Reset
      email={email}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      error={error}
      isLoading={isLoading}
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
