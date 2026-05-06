import AuthCard from "../ui/authCard/authCard";
import FormSection from "./formSection/formSection";
import HeroSection from "./heroSection/heroSection";
import * as S from "./style";
import type { SignUpProps } from "./types";

export function SignUp(props: SignUpProps) {
  return (
    <S.Shell>
      <AuthCard width="920px" maxWidth="920px" minHeight="676px">
        <AuthCard.Split>
          <AuthCard.Left>
            <HeroSection />
          </AuthCard.Left>

          <AuthCard.Right>
            <FormSection {...props} />
          </AuthCard.Right>
        </AuthCard.Split>
      </AuthCard>
    </S.Shell>
  );
}
