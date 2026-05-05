// 비밀번호 변경 완료 화면 전용 스타일 모음이다.
import styled from "styled-components";

// 완료 카드를 화면 중앙에 배치하는 최상위 레이아웃이다.
export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(24px, 3vw, 40px);
  background: #fafafa;
`;

// 완료 문구와 확인 버튼만 담는 작은 결과 카드다.
export const SmallCard = styled.div`
  width: min(100%, clamp(500px, 32vw, 560px));
  min-height: clamp(220px, 16vw, 260px);
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 34px 32px 32px;
  box-sizing: border-box;
`;

export const Dots = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 34px;
`;

export const Dot = styled.div<{ $active?: boolean; $wide?: boolean }>`
  width: ${(props) => (props.$wide ? "54px" : "14px")};
  height: 14px;
  border-radius: 999px;
  background: ${(props) => (props.$active ? "#9be995" : "#d7d7d7")};
`;

export const Title = styled.h1`
  margin: 0 0 18px;
  font-size: clamp(26px, 1.8vw, 30px);
  line-height: 1.25;
  font-weight: 800;
  color: #4b4b4b;
  word-break: keep-all;
`;

export const Description = styled.p`
  margin: 0;
  font-size: clamp(13px, 0.95vw, 15px);
  line-height: 1.45;
  color: #9b9b9b;
  white-space: pre-line;
  word-break: keep-all;
`;

// 완료 후 로그인 화면으로 이동시키는 확인 버튼 스타일이다.
export const ConfirmButton = styled.button`
  width: 100%;
  height: clamp(44px, 2.9vw, 48px);
  margin-top: 24px;
  border: none;
  border-radius: 8px;
  background: #9be995;
  color: #ffffff;
  font-size: clamp(14px, 1vw, 16px);
  font-weight: 700;
  cursor: pointer;
`;




