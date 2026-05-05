// 로그인 화면 전용 styled-components 모음이다.
import styled from "styled-components";

// 화면 전체를 감싸며 로그인 카드를 화면 중앙에 배치하는 최상위 레이아웃이다.
export const Screen = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  background: #fafafa;
`;

// 좌측 안내 영역과 우측 로그인 폼 영역을 2단 카드로 나누는 본체다.
export const Card = styled.div`
  width: min(100%, 920px);
  min-height: 676px;
  display: grid;
  grid-template-columns: 488px minmax(0, 100%);
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

// 좌측 비주얼 영역 전체를 담당한다. 카피, 곡선 배경, 일러스트 슬롯이 모두 이 안에 들어간다.
export const HeroSection = styled.section`
  position: relative;
  min-height: 676px;
  background: #ffffff;
  

  @media (max-width: 760px) {
    min-height: 300px;
  }
`;

export const HeroText = styled.div`
  position: relative;
  z-index: 2;
  padding: 76px 32px 0;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-size: 40px;
  line-height: 1.28;
  font-weight: 800;
  color: #202020;
  word-break: keep-all;
`;

// SVG를 직접 쓰지 않고 CSS clip-path로 만든 초록 물결 배경이다.
export const HeroWave = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  height: 420px;
  background: linear-gradient(180deg, #86e27d 0%, #6fd96a 100%);
  
  clip-path: path(
    "M0 80 C70 98 128 62 186 48 C235 36 287 53 351 80 L351 420 L0 420 Z"
  );

  &::before {
    content: "";
    position: absolute;
    inset: 16px 0 0 0;
    background: linear-gradient(
      180deg,
      rgba(164, 242, 138, 0.86) 0%,
      rgba(130, 224, 111, 0.9) 100%
    );
    clip-path: path(
      "M0 78 C66 90 126 48 188 34 C245 21 291 44 351 70 L351 420 L0 420 Z"
    );
  }

  @media (max-width: 760px) {
    height: 220px;
  }
`;

export const HeroArt = styled.div`
  position: absolute;
  left: 40px;
  right: 40px;
  bottom: 34px;
  height: 250px;
  z-index: 2;
  border-radius: 14px;
  background: transparent;

  @media (max-width: 760px) {
    height: 110px;
    bottom: 18px;
  }
`;

// 우측 로그인 입력 폼 영역을 세로 중앙에 정렬하는 컨테이너다.
export const FormSection = styled.section`
  display: flex;
  justify-content: center;
  padding: 86px 40px 40px;
  background: #ffffff;
`;

export const FormInner = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  margin: 0 0 34px;
  text-align: center;
  font-size: 40px;
  line-height: 1.3;
  font-weight: 800;
  color: #202020;
`;

// 아이디/비밀번호 입력과 제출 버튼을 묶는 실제 form 레이아웃이다.
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 700;
  color: #585858;
`;

// 모든 텍스트 입력창이 공유하는 기본 외곽선, 포커스, placeholder 스타일이다.
export const Input = styled.input`
  height: 44px;
  padding: 0 14px;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  background: #ffffff;
  font-size: 12px;
  color: #3b3b3b;
  outline: none;

  &::placeholder {
    color: #b2b2b2;
  }

  &:focus {
    border-color: #77df74;
    box-shadow: 0 0 0 3px rgba(119, 223, 116, 0.14);
  }
`;

export const Button = styled.button`
  margin-top: 14px;
  height: 44px;
  border: none;
  border-radius: 4px;
  background: #7be67a;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    background: #cfeecd;
    cursor: not-allowed;
  }
`;

export const Error = styled.div`
  min-height: 18px;
  margin-top: 8px;
  font-size: 11px;
  line-height: 1.3;
  color: #e14e4e;
  text-align: center;
`;

export const LinkRow = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
  gap: 10px;
  color: #b6b6b6;
  font-size: 11px;
  line-height: 1.3;
`;

export const LinkButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 1px;
  height: 11px;
  background: #d7d7d7;
  align-self: center;
`;

// 소셜 로그인 아이콘 버튼들을 한 줄로 정렬하는 영역이다.
export const SocialRow = styled.div`
  margin-top: 34px;
  display: flex;
  justify-content: center;
  gap: 24px;
`;

export const SocialButton = styled.button<{ $bg: string }>`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 999px;
  background: ${(props) => props.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  cursor: pointer;
`;

export const SocialImage = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

export const Kakao = styled.span`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #111111;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 3px;
    bottom: -4px;
    width: 5px;
    height: 5px;
    background: #111111;
    clip-path: polygon(0 0, 100% 0, 0 100%);
  }
`;

export const Naver = styled.span`
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
  color: #ffffff;
`;

