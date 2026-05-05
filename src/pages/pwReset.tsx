import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordByFind } from "../api/pwReset";
import { Reset } from "../features/auth/pwFind/reset";

const ASCII_REGEX = /[^\x20-\x7F]/;

/**
 * 비밀번호 재설정 페이지 컨테이너
 *
 * 이 페이지는 "비밀번호 찾기" 흐름에서 이메일 인증까지 마친 뒤 도착하는 화면이다.
 *
 * 중요한 전제
 * - 이 페이지는 단독 진입을 기대하지 않는다.
 * - 이전 페이지(checkEmailPwReset)에서 email을 route state로 넘겨 줘야 정상 동작한다.
 *
 * 즉, 이 화면은 보안상 "이미 이메일 인증이 끝난 사용자"만 사용하는 단계라고 이해하면 된다.
 */
export default function PwReset() {
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * username
   *
   * 디자인상 입력칸은 존재하지만,
   * 현재 비밀번호 찾기 기반 재설정 API에서는 실제 요청에 사용하지 않는다.
   *
   * 그래도 입력 UI와 스펙을 맞추기 위해 state로 보관한다.
   */
  const [username, setUsername] = useState("");

  /**
   * currentPassword
   *
   * 역시 디자인상 표시되는 입력칸용 값이다.
   * 현재 "비밀번호 찾기 후 재설정" API는 이메일 인증을 이미 신뢰하기 때문에
   * 실제 요청에는 사용하지 않는다.
   */
  const [currentPassword, setCurrentPassword] = useState("");

  /**
   * newPassword / confirmPassword
   *
   * newPassword는 실제 서버에 보낼 새 비밀번호,
   * confirmPassword는 사용자가 같은 값을 한 번 더 입력했는지 확인하기 위한 비교용 값이다.
   */
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * error
   *
   * 현재 사용자가 해결해야 할 오류 메시지를 저장한다.
   * 예: route state 없음, 비밀번호 길이 부족, 비밀번호 확인 불일치 등
   */
  const [error, setError] = useState("");

  /**
   * isLoading
   *
   * 새 비밀번호 저장 요청이 진행 중인지 표시한다.
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * email
   *
   * 이전 단계에서 인증을 마친 이메일 주소다.
   * 이 값이 없다는 것은 사용자가 중간 단계를 건너뛰고 직접 진입했을 가능성이 높다.
   */
  const email = location.state?.email ?? "";

  /**
   * 최종 제출 함수
   *
   * 처리 순서
   * 1. 이전 단계에서 전달된 email 존재 여부 확인
   * 2. 비밀번호 형식 검사
   * 3. 재설정 API 호출
   * 4. 성공 시 완료 화면으로 이동
   */
  const handleSubmit = async () => {
    if (!email) {
      setError("이메일 인증 정보가 없어요. 처음부터 다시 진행해 주세요.");
      return;
    }

    if (!newPassword.trim()) {
      setError("새 비밀번호를 입력해주세요.");
      return;
    }

    if (newPassword.length < 8) {
      setError("비밀번호는 8자 이상이어야 해요.");
      return;
    }

    if (ASCII_REGEX.test(newPassword)) {
      setError("비밀번호는 영문, 숫자, 일반 특수문자만 사용할 수 있어요.");
      return;
    }

    if (!confirmPassword.trim()) {
      setError("새 비밀번호 확인을 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("새 비밀번호가 서로 일치하지 않아요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      /**
       * 화면에는 입력칸이 여러 개 있지만,
       * 현재 API가 실제로 요구하는 핵심 값은 email + newPassword다.
       */
      await resetPasswordByFind(email, newPassword);

      /**
       * 완료 화면에서 어떤 이메일의 작업이 끝났는지 참고할 수 있게
       * email을 함께 넘긴다.
       */
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

