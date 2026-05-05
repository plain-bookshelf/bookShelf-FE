import styled from "styled-components";
/**
 * login/style.ts
 *
 * 로그인 화면 전용 styled-components 모음이다.
 * 레이아웃은 크게 세 덩어리로 나뉜다.
 *
 * 1. `Screen`: 카드 전체를 화면 중앙에 배치하는 바깥 영역
 * 2. `HeroSection` 계열: 왼쪽 브랜딩/비주얼 영역
 * 3. `FormSection` 계열: 오른쪽 로그인 폼 영역
 */

/**
 * Screen
 *
 * 로그인 카드를 브라우저 화면 중앙에 위치시키는 최상위 래퍼다.
 * 카드 자체 크기는 AuthCard가 담당하고,
 * 여기서는 정렬과 바깥 여백, 페이지 배경색만 관리한다.
 */
export const Screen = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(24px, 3vw, 40px);
  box-sizing: border-box;
  background: #fafafa;
`;

/**
 * HeroSection
 *
 * 카드 왼쪽 전체 비주얼 영역이다.
 * 상단 타이틀과 하단 SVG 웨이브 배경을 세로 방향으로 배치하기 위해
 * flex column 구조를 사용한다.
 */
export const HeroSection = styled.section`
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 760px) {
    min-height: 300px;
  }
`;

/**
 * HeroText / HeroTitle
 *
 * 왼쪽 상단의 브랜드 카피 영역이다.
 * 로그인 화면 첫인상을 만드는 제목 블록이라 상단 여백을 크게 두었다.
 */
export const HeroText = styled.div`
  z-index: 2;
  padding: clamp(52px, 4vw, 72px) clamp(32px, 2.6vw, 42px) 0;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(30px, 40px, 40px);
  line-height: 1.22;
  font-weight: 800;
  color: #202020;
  word-break: keep-all;
`;

/**
 * HeroWave
 *
 * 왼쪽 하단의 초록 물결 배경이다.
 * 복잡한 곡선 모양을 안정적으로 유지하기 위해 CSS clip-path 대신
 * SVG 자산을 배경 이미지로 사용한다.
 */
export const HeroWave = styled.img`
  width: 100%;
  height: clamp(250px, 20vw, 320px);


  @media (max-width: 760px) {
    height: 220px;
  }
`;

/**
 * HeroArt
 *
 * 책 일러스트나 이미지를 나중에 넣을 수 있도록 남겨 둔 슬롯이다.
 * 현재는 투명한 빈 영역이지만, 실제 자산을 넣으면 이 좌표를 기준으로 맞춰진다.
 */
export const HeroArt = styled.div`
  position: absolute;
  left: clamp(28px, 2.4vw, 44px);
  right: clamp(28px, 2.4vw, 44px);
  bottom: clamp(24px, 2vw, 34px);
  height: clamp(190px, 14vw, 242px);
  z-index: 2;
  border-radius: 14px;
  background: transparent;

  @media (max-width: 760px) {
    height: 110px;
    bottom: 18px;
  }
`;
