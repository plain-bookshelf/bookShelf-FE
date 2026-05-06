import signupImg from "../../../../assets/책 일러스트.svg";
import * as S from "./style";

export default function HeroSection() {
  return (
    <S.HeroSection>
      <S.TopBg />
      <S.BottomBg />
      <S.ImgWrap>
        <img src={signupImg} alt="회원가입 안내 일러스트" />
      </S.ImgWrap>
      <S.Welcome>책마루에 오신 것을 환영합니다</S.Welcome>
    </S.HeroSection>
  );
}
