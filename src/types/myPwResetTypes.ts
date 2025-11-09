export interface MyPwResetProps {
  nowPassword: string;
  newPassword: string;
  confirmPassword: string;
  isLoading: boolean;
  nowPasswordError: string;
  newPasswordError: string;
  confirmPasswordError: string;
  handleNowPasswordChange: (value: string) => void
  handlePasswordChange: (value: string) => void
  handleConfirmPasswordChange: (value: string) => void
  onSubmit: () => void 
}