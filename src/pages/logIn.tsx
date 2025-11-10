import LogInInfo from "../components/login/loginInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../layouts/pageWrapper";
import { postLogin } from "../api/authApi";

export default function LogIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoginError(false);

    if (!identifier.trim()) {
      setError("로그인 정보를 입력해주세요");
      setLoginError(true);
      return;
    }

    if (!password.trim()) {
      setError("비밀번호를 입력해주세요");
      setLoginError(true);
      return;
    }

    setIsLoading(true);

    try {
      const loginRequestData = {
        credential: identifier,
        password: password,
      };

      const res = await postLogin(loginRequestData);
      const tokenData = res.data;

      // 명세서 응답 기준으로 저장
      sessionStorage.setItem("access_token", tokenData.access_token);
      sessionStorage.setItem("refresh_token", tokenData.refresh_token);
      sessionStorage.setItem(
        "user",
        JSON.stringify({ identifier })
      );

      console.log("Login successful. Access Token saved.");
      navigate("/");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "알 수 없는 로그인 오류가 발생했습니다.";
      console.error("Login error:", err);
      setError(msg);
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
}