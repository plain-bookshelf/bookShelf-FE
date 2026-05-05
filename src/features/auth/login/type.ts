export interface LoginProps {
  identifier: string;
  password: string;
  error: string;
  isLoading: boolean;
  onIdentifierChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  onFindId: () => void;
  onFindPassword: () => void;
  onSignup: () => void;
}
