export type Step = 1 | 2 | 3 | 4 | 5;
export type SignupMode = "member" | "official";

export interface SignUpProps {
  step: Step;
  signupMode: SignupMode;
  email: string;
  verificationCode: string;
  username: string;
  password: string;
  confirmPassword: string;
  affiliationName: string;
  officialCode: string;
  error: string;
  timerText: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onVerificationCodeChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onAffiliationNameChange: (value: string) => void;
  onOfficialCodeChange: (value: string) => void;
  onSubmit: () => void;
  onReSend: () => void;
}
