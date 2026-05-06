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

