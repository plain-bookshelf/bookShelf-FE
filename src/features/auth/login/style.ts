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
 * FormSection / FormInner
 *
 * 카드 오른쪽 로그인 폼 영역이다.
 * FormSection은 배치와 여백을 담당하고,
 * FormInner는 실제 입력 요소들의 세로 흐름을 담당한다.
 */
export const FormSection = styled.section`
  display: flex;
  justify-content: center;
  flex: 1;
  padding: clamp(72px, 5vw, 96px) clamp(30px, 3vw, 40px);
  gap: 20px;
  background: #ffffff;
`;

export const FormInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

/**
 * Title
 *
 * 로그인 폼 상단 제목이다.
 */
export const Title = styled.h2`
  text-align: center;
  font-size: clamp(30px, 1.9vw, 36px);
  font-weight: 800;
  color: #202020;
`;

/**
 * Form
 *
 * 아이디/비밀번호 입력과 제출 버튼을 세로로 정렬하는 실제 form 레이아웃이다.
 */
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

/**
 * Label
 *
 * 라벨과 입력창을 한 묶음으로 관리하는 필드 래퍼다.
 */
export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: clamp(11px, 0.8vw, 16px);
  line-height: 1.2;
  font-weight: 500;
  color: #1A1A1A;
`;

/**
 * Input
 *
 * 로그인 화면 전용 입력창 스타일이다.
 * focus 상태에서 초록색 outline 느낌을 주어 현재 선택된 입력창을 더 명확히 보여 준다.
 */
export const Input = styled.input`
  height: clamp(40px, 2.8vw, 48px);
  padding: 0 14px;
  border: 1px solid #949494;
  border-radius: 6px;
  background: #ffffff;
  font-size: clamp(12px, 0.85vw, 16px);
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #a9a9a9;
  }

  &:focus {
    border-color: #77df74;
    box-shadow: 0 0 0 3px rgba(119, 223, 116, 0.14);
  }
`;

/**
 * Button
 *
 * 로그인 화면에서 쓰는 기본 제출 버튼 모양이다.
 * 현재는 shared button과 비슷한 색을 사용하지만,
 * 화면 전용 스타일이 필요할 때를 대비해 별도 정의가 남아 있다.
 */
export const Button = styled.button`
  height: clamp(40px, 2.8vw, 46px);
  border: none;
  border-radius: 6px;
  background: #7be67a;
  color: #ffffff;
  font-size: clamp(14px, 0.85vw, 16px);
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    background: #cfeecd;
    cursor: not-allowed;
  }
`;

/**
 * Error
 *
 * 에러 메시지 영역이다.
 * 메시지가 없을 때도 최소 높이를 확보해 아래 링크와 소셜 버튼이 갑자기 밀리지 않게 한다.
 */
export const Error = styled.div`
  min-height: 20px;
  font-size: clamp(14px, 0.78vw, 16px);
  font-weight: 500;
  line-height: 1.3;
  color: #CF1E25;
  text-align: center;
`;

/**
 * LinkRow / LinkButton / Divider
 *
 * 아이디 찾기, 비밀번호 찾기, 회원가입 이동 링크 영역이다.
 */
export const LinkRow = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: center;
  gap: 10px;
  color: #b6b6b6;
  font-size: clamp(11px, 0.78vw, 12px);
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

/**
 * SocialRow / SocialButton
 *
 * 소셜 로그인 버튼 묶음이다.
 * 현재는 시각적인 자리 표시 역할도 겸하고 있다.
 */
export const SocialRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 22px;
`;

export const SocialButton = styled.button<{ $bg: string }>`
  width: clamp(36px, 2.3vw, 40px);
  height: clamp(36px, 2.3vw, 40px);
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
  width: clamp(16px, 1vw, 20px);
  height: clamp(16px, 1vw, 20px);
  object-fit: contain;
`;

/**
 * Kakao
 *
 * 카카오 버튼 안의 말풍선 형태 아이콘을 CSS로 단순화해 만든 요소다.
 */
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

/**
 * Naver
 *
 * 네이버 버튼 안의 N 텍스트 스타일이다.
 */
export const Naver = styled.span`
  font-size: clamp(14px, 0.95vw, 16px);
  font-weight: 800;
  line-height: 1;
  color: #ffffff;
`;
