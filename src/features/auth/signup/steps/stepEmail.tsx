import Input from "../../../../shared/input/input";
import * as S from "../style";

interface StepEmailProps {
  email: string;
  onEmailChange: (value: string) => void;
}

export default function StepEmail({ email, onEmailChange }: StepEmailProps) {
  return (
    <S.Field>
      <S.Label>이메일</S.Label>
      <Input
        type="text"
        value={email}
        placeholder="email@gmail.com"
        onChange={(event) => onEmailChange(event.target.value)}
      />
    </S.Field>
  );
}
