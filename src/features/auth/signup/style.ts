/**
 * signup/style.ts
 *
 * 회원가입 4단계 화면에서 공통으로 쓰는 styled-components 모음이다.
 *
 * 이 파일 구조
 * - Shell / Card: 전체 카드 레이아웃
 * - Left 계열: 환영 비주얼 영역
 * - Right 계열: 단계형 폼 영역
 * - Dot / Input / Button: 단계별로 반복 재사용되는 UI 토큰
 */
import styled from "styled-components";

/** 화면 가운데 카드 배치 */
export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(24px, 3vw, 40px);
  background: #fafafa;
`;

/** 좌우 2단 구조 카드 */
export const Card = styled.div`
  width: min(100%, clamp(820px, 52vw, 920px));
  min-height: clamp(540px, 34vw, 604px);
  display: grid;
  grid-template-columns: 488px minmax(0, 432px);
  border: 1px solid #efefef;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

/**
 * Left
 *
 * 책 일러스트와 환영 문구가 들어가는 고정 비주얼 영역이다.
 * relative 기준 박스로 만들어 내부 장식들을 absolute 배치할 수 있게 했다.
 */
export const Left = styled.section`
  position: relative;
  overflow: hidden;
  padding: clamp(28px, 2.4vw, 36px) clamp(24px, 2vw, 28px) clamp(28px, 2.2vw, 34px);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

/** 좌상단 초록 장식 */
export const TopBg = styled.div`
  position: absolute;
  top: -48px;
  left: -64px;
  width: 280px;
  height: 136px;
  border-radius: 999px;
  background: #84e580;
`;

/** 우하단 초록 장식 */
export const BottomBg = styled.div`
  position: absolute;
  right: -40px;
  bottom: -50px;
  width: 138px;
  height: 104px;
  border-radius: 999px;
  background: #84e580;
`;

/** 일러스트 전체 배치 기준 영역 */
export const ImgWrap = styled.div`
  position: relative;
  width: 100%;
  height: clamp(250px, 18vw, 314px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

/** 책 일러스트 아래 받침대 */
export const Platform = styled.div`
  position: absolute;
  bottom: 50px;
  width: 206px;
  height: 34px;
  border-radius: 999px;
  background: #dc842f;
`;

/** 책 묶음 전체 기준 박스 */
export const Books = styled.div`
  position: relative;
  width: 240px;
  height: 248px;
`;

/** 책 아래 받침 면 */
export const BookBase = styled.div`
  position: absolute;
  left: 26px;
  bottom: 30px;
  width: 124px;
  height: 28px;
  border-radius: 6px;
  transform: skew(-18deg);
  background: #b76d2e;
`;

/** 받침 위 밝은 하이라이트 */
export const BookShadow = styled.div`
  position: absolute;
  left: 45px;
  bottom: 46px;
  width: 108px;
  height: 20px;
  border-radius: 5px;
  transform: skew(-18deg);
  background: #f4f4f4;
`;

/** 책갈피 장식 */
export const Ribbon = styled.div`
  position: absolute;
  left: 20px;
  bottom: 40px;
  width: 9px;
  height: 98px;
  background: #ef513d;
  transform: rotate(28deg);
  border-radius: 999px;
`;

/**
 * Book
 *
 * 여러 권의 책을 공통 컴포넌트 하나로 재사용하기 위해
 * left / height / color / accent 값을 props로 받는다.
 */
export const Book = styled.div<{ $left: number; $height: number; $color: string; $accent: string }>`
  position: absolute;
  bottom: 48px;
  left: ${(props) => props.$left}px;
  width: 52px;
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

/** 사람 일러스트 전체 */
export const Person = styled.div`
  position: absolute;
  right: 24px;
  bottom: 50px;
  width: 62px;
  height: 124px;
`;

export const Head = styled.div`
  position: absolute;
  top: 0;
  left: 24px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ffd3b2;
`;

export const Body = styled.div`
  position: absolute;
  top: 18px;
  left: 22px;
  width: 22px;
  height: 50px;
  border-radius: 10px;
  background: #2e7be7;
`;

/** 다리 한쪽씩 배치하기 위한 공용 블록 */
export const Leg = styled.div<{ $left: number; $rotate: number }>`
  position: absolute;
  left: ${(props) => props.$left}px;
  top: 56px;
  width: 8px;
  height: 54px;
  border-radius: 999px;
  background: #ff8352;
  transform: rotate(${(props) => props.$rotate}deg);
  transform-origin: top center;
`;

/** 팔 한쪽씩 배치하기 위한 공용 블록 */
export const Arm = styled.div<{ $left: number; $top: number; $rotate: number }>`
  position: absolute;
  left: ${(props) => props.$left}px;
  top: ${(props) => props.$top}px;
  width: 7px;
  height: 40px;
  border-radius: 999px;
  background: #ffb07a;
  transform: rotate(${(props) => props.$rotate}deg);
  transform-origin: top center;
`;

/** 왼쪽 하단 환영 문구 */
export const Welcome = styled.h2`
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: clamp(20px, 1.4vw, 24px);
  line-height: 1.2;
  font-weight: 800;
  color: #202020;
  word-break: keep-all;
`;

/** 오른쪽 단계형 폼 영역 */
export const Right = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(32px, 2.8vw, 44px) clamp(28px, 2.4vw, 40px);
  background: #ffffff;
`;

/** 폼 실제 폭 제한 */
export const Content = styled.div`
  width: 100%;
  max-width: clamp(286px, 18vw, 320px);
`;

/** 진행 점 묶음 */
export const Dots = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
`;

/** 현재 단계는 길게, 지난 단계는 초록, 남은 단계는 회색으로 표시 */
export const Dot = styled.div<{ $active: boolean; $current: boolean }>`
  width: ${(props) => (props.$current ? "34px" : "10px")};
  height: 10px;
  border-radius: 999px;
  background: ${(props) => (props.$active ? "#7ee37b" : "#d4d4d4")};
`;

export const Title = styled.h1`
  margin: 0 0 12px;
  font-size: clamp(26px, 1.8vw, 32px);
  line-height: 1.2;
  font-weight: 800;
  color: #202020;
`;

/** 단계 설명 문구 */
export const Text = styled.p`
  margin: 0 0 26px;
  font-size: clamp(12px, 0.9vw, 14px);
  line-height: 1.45;
  color: #5f5f5f;
  word-break: keep-all;
  white-space: pre-line;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: clamp(12px, 0.9vw, 14px);
  line-height: 1.2;
  font-weight: 700;
  color: #4c4c4c;
`;

/** 개별 입력 묶음 */
export const Field = styled.div`
  margin-bottom: 16px;
`;

/** 이메일, 인증번호, 계정 정보, 도서관 입력에 공통으로 쓰는 입력 스타일 */
export const Input = styled.input`
  width: 100%;
  height: clamp(40px, 2.8vw, 44px);
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  padding: 0 14px;
  font-size: clamp(12px, 0.9vw, 14px);
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

/** 인증번호 입력, 타이머, 재발급 버튼을 한 줄에 배치 */
export const CodeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 58px 72px;
  gap: 10px;
`;

export const Timer = styled.div`
  height: clamp(40px, 2.8vw, 44px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(12px, 0.9vw, 14px);
  font-weight: 700;
  color: #ff6a6a;
`;

export const ReSend = styled.button`
  height: clamp(40px, 2.8vw, 44px);
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  background: #ffffff;
  font-size: clamp(12px, 0.85vw, 13px);
  color: #676767;
  cursor: pointer;
`;

/** 에러 문구 자리 유지용 영역 */
export const Error = styled.div`
  min-height: 20px;
  margin-top: -4px;
  margin-bottom: 4px;
  font-size: clamp(11px, 0.8vw, 12px);
  line-height: 1.3;
  color: #ef5353;
`;

/** 각 단계에서 공통으로 재사용되는 메인 버튼 */
export const Button = styled.button`
  width: 100%;
  height: clamp(42px, 2.9vw, 46px);
  margin-top: 18px;
  border: none;
  border-radius: 8px;
  background: #7ee37b;
  color: #ffffff;
  font-size: clamp(13px, 0.95vw, 15px);
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    background: #cfeecd;
    cursor: not-allowed;
  }
`;
