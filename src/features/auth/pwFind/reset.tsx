import Button from "../../../shared/button/button";
import Input from "../../../shared/input/input";
import * as S from "./resetStyle";

interface ResetProps {
  email: string;
  newPassword: string;
  confirmPassword: string;
  error: string;
  isLoading: boolean;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: () => void;
}

export function Reset({
  email,
  newPassword,
  confirmPassword,
  error,
  isLoading,
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
          본인 확인이 완료되었습니다.
          {"\n"}
          {email ? `${email} 계정의 새 비밀번호를 입력해 주세요.` : "새 비밀번호를 입력해 주세요."}
        </S.Description>
        <S.FormStack>
          <div>
            <S.FieldLabel htmlFor="pw-new">새 비밀번호</S.FieldLabel>
            <Input
              type="password"
              value={newPassword}
              placeholder="새로 사용할 비밀번호를 입력해 주세요"
              onChange={(event) => onNewPasswordChange(event.target.value)}
            />
          </div>
          <div>
            <S.FieldLabel htmlFor="pw-check">새 비밀번호 확인</S.FieldLabel>
            <Input
              type="password"
              value={confirmPassword}
              placeholder="변경할 비밀번호를 다시 입력해 주세요"
              onChange={(event) => onConfirmPasswordChange(event.target.value)}
            />
          </div>
        </S.FormStack>
        <S.ErrorText>{error}</S.ErrorText>
        <S.ButtonWrap>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isLoading}
            context={isLoading ? "확인 중..." : "확인"}
          />
        </S.ButtonWrap>
      </S.NarrowCard>
    </S.Shell>
  );
}
