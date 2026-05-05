import * as S from "./resetStyle";

/**
 * 비밀번호 재설정 입력 폼 props
 *
 * 이 컴포넌트는 여러 입력칸을 렌더링하지만,
 * 실제 비즈니스 로직은 상위 페이지가 모두 관리한다.
 */
interface ResetProps {
  username: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  error: string;
  isLoading: boolean;
  onUsernameChange: (value: string) => void;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: () => void;
}

/**
 * 비밀번호 재설정 폼 컴포넌트
 *
 * 입력 UI만 담당하며,
 * 실제 검증 규칙이나 API 호출은 상위 페이지가 처리한다.
 */
export function Reset({
  username,
  currentPassword,
  newPassword,
  confirmPassword,
  error,
  isLoading,
  onUsernameChange,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: ResetProps) {
  return (
    <S.Shell>
      <S.NarrowCard>
        <S.Dots>
          <S.Dot $active $wide />
        </S.Dots>
        <S.Title>비밀번호 변경</S.Title>
        <S.Description>
          이메일로 인증번호가 발송되었습니다.
          {"\n"}
          발송된 인증번호를 5분 안에 입력해 주세요.
        </S.Description>
        <S.FormStack>
          <div>
            <S.FieldLabel htmlFor="pw-id">아이디</S.FieldLabel>
            <S.Input
              id="pw-id"
              value={username}
              placeholder="아이디를 입력해주세요"
              onChange={(event) => onUsernameChange(event.target.value)}
            />
          </div>
          <div>
            <S.FieldLabel htmlFor="pw-now">현재 비밀번호</S.FieldLabel>
            <S.Input
              id="pw-now"
              type="password"
              value={currentPassword}
              placeholder="현재 비밀번호를 입력해주세요"
              onChange={(event) => onCurrentPasswordChange(event.target.value)}
            />
          </div>
          <div>
            <S.FieldLabel htmlFor="pw-new">새 비밀번호</S.FieldLabel>
            <S.Input
              id="pw-new"
              type="password"
              value={newPassword}
              placeholder="새로 사용하실 비밀번호를 입력해주세요"
              onChange={(event) => onNewPasswordChange(event.target.value)}
            />
          </div>
          <div>
            <S.FieldLabel htmlFor="pw-check">새 비밀번호 확인</S.FieldLabel>
            <S.Input
              id="pw-check"
              type="password"
              value={confirmPassword}
              placeholder="변경한 비밀번호를 다시 입력해주세요"
              onChange={(event) => onConfirmPasswordChange(event.target.value)}
            />
          </div>
        </S.FormStack>
        <S.ErrorText>{error}</S.ErrorText>
        <S.ConfirmButton type="button" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "확인 중..." : "확인"}
        </S.ConfirmButton>
      </S.NarrowCard>
    </S.Shell>
  );
}
