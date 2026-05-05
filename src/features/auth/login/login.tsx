import * as S from "./style";
import AuthCard from "../ui/authCard/authCard";
import HeroSection from "./heroSection/heroSection";
import FormSection from "./formSection/formSection";
import { type LoginProps } from "./type";

export default function Login({
  identifier,
  password,
  error,
  isLoading,
  onIdentifierChange,
  onPasswordChange,
  onSubmit,
  onFindId,
  onFindPassword,
  onSignup,
}: LoginProps) {
  return (
    <S.Screen>
      <AuthCard width="920px" minHeight="676px" maxWidth="920px">
        <AuthCard.Split>
          <AuthCard.Left>
            <HeroSection />
          </AuthCard.Left>
          <AuthCard.Right>
            <FormSection
              identifier={identifier}
              password={password}
              error={error}
              isLoading={isLoading}
              onIdentifierChange={onIdentifierChange}
              onPasswordChange={onPasswordChange}
              onSubmit={onSubmit}
              onFindId={onFindId}
              onFindPassword={onFindPassword}
              onSignup={onSignup}
            />
          </AuthCard.Right>
        </AuthCard.Split>
      </AuthCard>
    </S.Screen>
  );
}
