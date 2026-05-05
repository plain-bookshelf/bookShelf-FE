import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../api/authApi";
import Login from "../features/auth/login/login";
import { setTokens, removeTokens } from "../utils/tokenService";

/**
 * LogIn
 *
 * 로그인 페이지의 컨테이너 컴포넌트다.
 * 화면에 보이는 마크업은 `features/auth/login/login.tsx`가 담당하고,
 * 이 파일은 상태 관리, API 호출, 페이지 이동 같은 로직을 맡는다.
 */
export default function LogIn() {
  /**
   * identifier
   * 아이디 또는 이메일 입력값을 저장하는 상태다.
   * `useState`는 React에서 값을 저장하고,
   * 값이 바뀌면 화면을 다시 그리게 만드는 기본 상태 훅이다.
   */
  const [identifier, setIdentifier] = useState("");

  /**
   * password
   * 비밀번호 입력값을 저장한다.
   * 아이디와 비밀번호는 검증 규칙과 에러 상황이 달라질 수 있어서
   * 각각 별도 상태로 관리한다.
   */
  const [password, setPassword] = useState("");

  /**
   * error
   *
   * 사용자에게 보여 줄 에러 메시지다.
   * 입력값 누락, 로그인 실패, 알 수 없는 예외 상황을 모두 이 문자열로 표현한다.
   */
  const [error, setError] = useState("");

  /**
   * isLoading
   *
   * 로그인 요청이 현재 진행 중인지 나타내는 상태다.
   * true일 때는 중복 제출을 막기 위해 입력창과 버튼을 비활성화할 수 있다.
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * navigate
   *
   * react-router-dom이 제공하는 페이지 이동 함수다.
   * 로그인 성공 후 관리자 페이지로 이동하거나,
   * 아이디/비밀번호 찾기 화면으로 이동할 때 사용한다.
   */
  const navigate = useNavigate();

  /**
   * handleLogin
   *
   * 로그인 제출 시 실행되는 비동기 함수다.
   *
   * 처리 흐름:
   * 1. 이전 에러 메시지를 비운다.
   * 2. 남아 있을 수 있는 기존 토큰을 제거한다.
   * 3. 필수 입력값을 검증한다.
   * 4. 로그인 API를 호출한다.
   * 5. 성공하면 토큰을 저장하고 관리자 페이지로 이동한다.
   * 6. 실패하면 사용자에게 에러 메시지를 보여 준다.
   */
  const handleLogin = async () => {
    setError("");

    /**
     * 새 계정으로 로그인할 때 이전 세션 토큰이 남아 있으면
     * 인증 상태가 꼬일 수 있으므로 먼저 제거한다.
     */
    removeTokens();

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
      /**
       * 화면에서는 identifier라는 이름을 쓰지만
       * 서버 로그인 명세는 username 필드를 요구하므로
       * API 호출 시점에 맞는 키 이름으로 변환한다.
       */
      const tokenData = await postLogin({
        username: identifier.trim(),
        password,
        platformType: "WEB",
      });

      /**
       * 로그인 성공 시 access/refresh token을 저장한다.
       * 이후 인증이 필요한 API 요청은 이 토큰을 기반으로 동작한다.
       */
      setTokens(tokenData);

      /**
       * 현재 프로젝트의 로그인 성공 후 기본 이동 경로는 관리자 페이지다.
       */
      navigate("/admin");
    } catch (err: unknown) {
      /**
       * Error 객체면 해당 메시지를 그대로 사용하고,
       * 그렇지 않으면 공통 오류 문구를 보여 준다.
       */
      setError(err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다.");
    } finally {
      /**
       * 성공 여부와 상관없이 마지막에는 로딩 상태를 해제해
       * 버튼과 입력창이 다시 활성화되게 한다.
       */
      setIsLoading(false);
    }
  };

  return (
    <Login
      identifier={identifier}
      password={password}
      error={error}
      isLoading={isLoading}
      /**
       * 아래 핸들러들은 로그인 UI 컴포넌트가 직접 비즈니스 로직을 알지 않도록
       * 이 페이지에서 주입하는 이벤트 함수들이다.
       */
      onIdentifierChange={setIdentifier}
      onPasswordChange={setPassword}
      onSubmit={handleLogin}
      onFindId={() => navigate("/idPasswordFind")}
      onFindPassword={() => navigate("/checkEmailPwReset")}
      onSignup={() => navigate("/signup")}
    />
  );
}
