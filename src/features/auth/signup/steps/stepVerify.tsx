import Input from "../../../../shared/input/input";
import * as S from "../style";

interface StepVerifyProps {
  verificationCode: string;
  timerText: string;
  onVerificationCodeChange: (value: string) => void;
  onReSend: () => void;
}

export default function StepVerify({
  verificationCode,
  timerText,
  onVerificationCodeChange,
  onReSend,
}: StepVerifyProps) {
  return (
    <S.Field>
      <S.Label>인증번호</S.Label>
      <S.CodeRow>
        <S.CodeInputWrap>
          <Input
            type="text"
            value={verificationCode}
            placeholder="인증번호를 입력해 주세요"
            onChange={(event) => onVerificationCodeChange(event.target.value)}
          />
          <S.Timer>{timerText}</S.Timer>
        </S.CodeInputWrap>
        <S.ReSend type="button" onClick={onReSend}>
          재발급
        </S.ReSend>
      </S.CodeRow>
    </S.Field>
  );
}
