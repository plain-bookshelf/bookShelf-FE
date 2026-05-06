import Button from "../../../../shared/button/button";
import StepAccount from "../steps/stepAccount";
import StepAffiliation from "../steps/stepAffiliation";
import StepEmail from "../steps/stepEmail";
import StepOfficialCode from "../steps/stepOfficialCode";
import StepVerify from "../steps/stepVerify";
import * as S from "../style";
import type { SignUpProps, SignupMode, Step } from "../types";

function getStepCopy(step: Step, signupMode: SignupMode) {
  switch (step) {
    case 1:
      return {
        title: "회원가입",
        description:
          signupMode === "official"
            ? "관리자 계정 생성을 위해 이메일 주소를 입력해 주세요."
            : "일반 회원가입을 위해 이메일 주소를 입력해 주세요.",
        buttonText: "확인",
      };
    case 2:
      return {
        title: "회원가입",
        description:
          "이메일로 인증번호가 발송되었습니다.\n발송된 인증번호를 5분 이내에 입력해 주세요.",
        buttonText: "확인",
      };
    case 3:
      return {
        title: "회원가입",
        description: "아이디와 비밀번호를 입력해 계정 정보를 완성해 주세요.",
        buttonText: "확인",
      };
    case 4:
      return {
        title: "회원가입",
        description:
          signupMode === "official"
            ? "현재 자주 이용하시는 도서관을 입력해 주세요.\n입력한 도서관 정보는 관리자 계정과 연결됩니다."
            : "현재 자주 이용하시는 도서관을 입력해 주세요.\n입력한 도서관은 회원 정보와 함께 저장됩니다.",
        buttonText: signupMode === "official" ? "다음" : "가입하기",
      };
    case 5:
    default:
      return {
        title: "회원가입",
        description: "관리자 회원가입을 완료하려면 관계자 인증코드를 입력해 주세요.",
        buttonText: "가입하기",
      };
  }
}

export default function FormSection({
  step,
  signupMode,
  email,
  verificationCode,
  username,
  password,
  confirmPassword,
  affiliationName,
  officialCode,
  error,
  timerText,
  isLoading,
  onEmailChange,
  onVerificationCodeChange,
  onUsernameChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onAffiliationNameChange,
  onOfficialCodeChange,
  onSubmit,
  onReSend,
}: SignUpProps) {
  const copy = getStepCopy(step, signupMode);
  const totalSteps = signupMode === "official" ? 5 : 4;

  return (
    <S.FormSection>
      <S.FormInner>
        <S.Dots>
          {Array.from({ length: totalSteps }, (_, index) => index + 1).map((dot) => (
            <S.Dot key={dot} $active={dot <= step} $current={dot === step} />
          ))}
        </S.Dots>

        <S.Title>{copy.title}</S.Title>
        <S.Text>{copy.description}</S.Text>

        {step === 1 ? <StepEmail email={email} onEmailChange={onEmailChange} /> : null}
        {step === 2 ? (
          <StepVerify
            verificationCode={verificationCode}
            timerText={timerText}
            onVerificationCodeChange={onVerificationCodeChange}
            onReSend={onReSend}
          />
        ) : null}
        {step === 3 ? (
          <StepAccount
            username={username}
            password={password}
            confirmPassword={confirmPassword}
            onUsernameChange={onUsernameChange}
            onPasswordChange={onPasswordChange}
            onConfirmPasswordChange={onConfirmPasswordChange}
          />
        ) : null}
        {step === 4 ? (
          <StepAffiliation
            affiliationName={affiliationName}
            onAffiliationNameChange={onAffiliationNameChange}
          />
        ) : null}
        {step === 5 ? (
          <StepOfficialCode
            officialCode={officialCode}
            onOfficialCodeChange={onOfficialCodeChange}
          />
        ) : null}

        <S.Error>{error}</S.Error>

        <S.ButtonWrap>
          <Button
            type="button"
            disabled={isLoading}
            context={isLoading ? "로딩 중..." : copy.buttonText}
            onClick={onSubmit}
          />
        </S.ButtonWrap>
      </S.FormInner>
    </S.FormSection>
  );
}
