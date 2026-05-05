import * as S from "./style";
import heroWaveSvg from "../../../../assets/loginHeroWave.svg"


export default function HeroSection() {
  return (
    <S.HeroSection>
      <S.HeroText>
        <S.HeroTitle>마루 AI로</S.HeroTitle>
        <S.HeroTitle>당신의 취향에 맞는</S.HeroTitle>
        <S.HeroTitle>책을 고르세요</S.HeroTitle>        
      </S.HeroText>
      <img src={heroWaveSvg}/>
    </S.HeroSection>
  );
}
