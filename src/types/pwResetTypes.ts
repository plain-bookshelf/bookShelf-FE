export interface PwResetProps {
  newPassword: string;
  confirmPassword: string;
  isLoading: boolean;
  newPasswordError: string;
  confirmPasswordError: string;
  handlePasswordChange: (value: string) => void
  handleConfirmPasswordChange: (value: string) => void
  onSubmit: () => void 
}