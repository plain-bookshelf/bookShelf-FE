// 회원가입 4단계 화면에서 공통으로 쓰는 styled-components 모음이다.
import styled from "styled-components";

// 회원가입 카드를 화면 한가운데 배치하는 최상위 레이아웃이다.
export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #fafafa;
`;

// 좌측 일러스트 영역과 우측 단계형 폼 영역을 나누는 메인 카드다.
export const Card = styled.div`
  width: min(100%, 760px);
  min-height: 520px;
  display: grid;
  grid-template-columns: 1.02fr 0.98fr;
  border: 1px solid #efefef;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

// 좌측 환영 비주얼 영역이다. 배경 장식과 책 일러스트, 환영 문구가 포함된다.
export const Left = styled.section`
  position: relative;
  overflow: hidden;
  padding: 28px 22px 26px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

// 카드 좌상단의 초록 장식 도형이다.
export const TopBg = styled.div`
  position: absolute;
  top: -40px;
  left: -56px;
  width: 240px;
  height: 112px;
  border-radius: 999px;
  background: #84e580;
`;

export const BottomBg = styled.div`
  position: absolute;
  right: -34px;
  bottom: -42px;
  width: 118px;
  height: 88px;
  border-radius: 999px;
  background: #84e580;
`;

// 책/인물 일러스트를 쌓아 배치하는 상대 위치 기준 영역이다.
export const ImgWrap = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const Platform = styled.div`
  position: absolute;
  bottom: 42px;
  width: 160px;
  height: 28px;
  border-radius: 999px;
  background: #dc842f;
`;

export const Books = styled.div`
  position: relative;
  width: 190px;
  height: 198px;
`;

export const BookBase = styled.div`
  position: absolute;
  left: 20px;
  bottom: 24px;
  width: 100px;
  height: 22px;
  border-radius: 6px;
  transform: skew(-18deg);
  background: #b76d2e;
`;

export const BookShadow = styled.div`
  position: absolute;
  left: 36px;
  bottom: 38px;
  width: 88px;
  height: 16px;
  border-radius: 5px;
  transform: skew(-18deg);
  background: #f4f4f4;
`;

export const Ribbon = styled.div`
  position: absolute;
  left: 18px;
  bottom: 34px;
  width: 8px;
  height: 82px;
  background: #ef513d;
  transform: rotate(28deg);
  border-radius: 999px;
`;

// 여러 권의 책을 색상과 높이만 바꿔 재사용할 수 있게 만든 공용 책 블록이다.
export const Book = styled.div<{ $left: number; $height: number; $color: string; $accent: string }>`
  position: absolute;
  bottom: 48px;
  left: ${(props) => props.$left}px;
  width: 42px;
  height: ${(props) => props.$height}px;
  border-radius: 6px 6px 0 0;
  background: ${(props) => props.$color};
  box-shadow: inset -8px 0 0 rgba(255, 255, 255, 0.16);

  &::before {
    content: "";
    position: absolute;
    top: 12px;
    left: 7px;
    width: 28px;
    height: 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow:
      0 10px 0 rgba(255, 255, 255, 0.75),
      0 20px 0 rgba(255, 255, 255, 0.75),
      0 30px 0 rgba(255, 255, 255, 0.75);
  }

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 7px;
    height: 100%;
    background: ${(props) => props.$accent};
  }
`;

export const Person = styled.div`
  position: absolute;
  right: 20px;
  bottom: 42px;
  width: 50px;
  height: 102px;
`;

export const Head = styled.div`
  position: absolute;
  top: 0;
  left: 20px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffd3b2;
`;

export const Body = styled.div`
  position: absolute;
  top: 16px;
  left: 18px;
  width: 20px;
  height: 42px;
  border-radius: 10px;
  background: #2e7be7;
`;

export const Leg = styled.div<{ $left: number; $rotate: number }>`
  position: absolute;
  left: ${(props) => props.$left}px;
  top: 56px;
  width: 7px;
  height: 46px;
  border-radius: 999px;
  background: #ff8352;
  transform: rotate(${(props) => props.$rotate}deg);
  transform-origin: top center;
`;

export const Arm = styled.div<{ $left: number; $top: number; $rotate: number }>`
  position: absolute;
  left: ${(props) => props.$left}px;
  top: ${(props) => props.$top}px;
  width: 6px;
  height: 34px;
  border-radius: 999px;
  background: #ffb07a;
  transform: rotate(${(props) => props.$rotate}deg);
  transform-origin: top center;
`;

export const Welcome = styled.h2`
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 800;
  color: #202020;
  word-break: keep-all;
`;

// 우측 단계형 회원가입 폼을 감싸며 입력 흐름을 담당하는 영역이다.
export const Right = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 24px;
  background: #ffffff;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 254px;
`;

// 현재 단계와 진행 상태를 점/막대 형태로 보여 주는 진행 표시 영역이다.
export const Dots = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 14px;
`;

export const Dot = styled.div<{ $active: boolean; $current: boolean }>`
  width: ${(props) => (props.$current ? "26px" : "8px")};
  height: 8px;
  border-radius: 999px;
  background: ${(props) => (props.$active ? "#7ee37b" : "#d4d4d4")};
`;

export const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 17px;
  line-height: 1.2;
  font-weight: 800;
  color: #202020;
`;

export const Text = styled.p`
  margin: 0 0 18px;
  font-size: 10px;
  line-height: 1.45;
  color: #5f5f5f;
  word-break: keep-all;
  white-space: pre-line;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 10px;
  line-height: 1.2;
  font-weight: 700;
  color: #4c4c4c;
`;

export const Field = styled.div`
  margin-bottom: 12px;
`;

// 이메일, 인증번호, 계정 정보, 소속 도서관 입력이 공통으로 쓰는 기본 입력 스타일이다.
export const Input = styled.input`
  width: 100%;
  height: 32px;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  padding: 0 12px;
  font-size: 10px;
  color: #333333;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #b4b4b4;
  }

  &:focus {
    border-color: #7ee37b;
    box-shadow: 0 0 0 3px rgba(126, 227, 123, 0.12);
  }
`;

// 인증번호 입력칸, 타이머, 재발급 버튼을 한 줄에 배치하는 전용 레이아웃이다.
export const CodeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 46px 56px;
  gap: 8px;
`;

export const Timer = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #ff6a6a;
`;

export const ReSend = styled.button`
  height: 32px;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  background: #ffffff;
  font-size: 10px;
  color: #676767;
  cursor: pointer;
`;

export const Error = styled.div`
  min-height: 16px;
  margin-top: -4px;
  margin-bottom: 4px;
  font-size: 10px;
  line-height: 1.3;
  color: #ef5353;
`;

// 각 단계에서 공통으로 재사용되는 확인 버튼 스타일이다.
export const Button = styled.button`
  width: 100%;
  height: 36px;
  margin-top: 12px;
  border: none;
  border-radius: 5px;
  background: #7ee37b;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    background: #cfeecd;
    cursor: not-allowed;
  }
`;




