import Input from "../../../../shared/input/input";
import * as S from "../style";

interface StepAccountProps {
  username: string;
  password: string;
  confirmPassword: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
}

export default function StepAccount({
  username,
  password,
  confirmPassword,
  onUsernameChange,
  onPasswordChange,
  onConfirmPasswordChange,
}: StepAccountProps) {
  return (
    <>
      <S.Field>
        <S.Label>아이디</S.Label>
        <Input
          type="text"
          value={username}
          placeholder="아이디를 입력해 주세요"
          onChange={(event) => onUsernameChange(event.target.value)}
        />
      </S.Field>

      <S.Field>
        <S.Label>비밀번호</S.Label>
        <Input
          type="password"
          value={password}
          placeholder="비밀번호를 입력해 주세요"
          onChange={(event) => onPasswordChange(event.target.value)}
        />
      </S.Field>

      <S.Field>
        <S.Label>비밀번호 확인</S.Label>
        <Input
          type="password"
          value={confirmPassword}
          placeholder="비밀번호를 다시 입력해 주세요"
          onChange={(event) => onConfirmPasswordChange(event.target.value)}
        />
      </S.Field>
    </>
  );
}
