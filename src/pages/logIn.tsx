import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../api/authApi";
import { Login } from "../components/auth/login/login";
import { setTokens } from "../utils/tokenService";

// 로그인 페이지는 입력 상태, 검증, API 호출만 담당한다.
// 실제 레이아웃과 스타일은 auth/login 컴포넌트로 분리해 두었다.
export default function LogIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 새 로그인 시도 전에는 이전 실패 메시지를 초기화한다.
    setError("");

    if (!identifier.trim()) {
      setError("아이디 또는 이메일을 입력해 주세요.");
      return;
    }

    if (!password.trim()) {
      setError("비밀번호를 입력해 주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // 백엔드 명세 기준으로 식별자는 username 필드에 담아 보낸다.
      const tokenData = await postLogin({ username: identifier.trim(), password, platformType: "WEB" });
      // 로그인에 성공하면 이후 보호된 API 호출을 위해 토큰을 저장한다.
      setTokens(tokenData);
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "로그인 중 오류가 발생했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Login
      identifier={identifier}
      password={password}
      error={error}
      isLoading={isLoading}
      onIdentifierChange={setIdentifier}
      onPasswordChange={setPassword}
      onSubmit={handleLogin}
      // 아이디 찾기는 소개 화면을 먼저 보여준 뒤 실제 입력 단계로 이동한다.
      onFindId={() => navigate("/idPasswordFind")}
      onFindPassword={() => navigate("/checkEmailPwReset")}
      onSignup={() => navigate("/signup")}
    />
  );
}
