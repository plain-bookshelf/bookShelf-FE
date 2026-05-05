// 아이디 찾기 입력/인증번호 단계 전용 스타일 모음이다.
import styled from "styled-components";

// 아이디 찾기 입력 카드를 화면 중앙에 배치하는 최상위 레이아웃이다.
export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(24px, 3vw, 40px);
  background: #fafafa;
`;

// 이메일 입력 단계와 인증번호 단계가 공통으로 쓰는 본문 카드다.
export const Card = styled.div`
  width: min(100%, clamp(500px, 32vw, 560px));
  min-height: clamp(390px, 25vw, 430px);
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  padding: 34px 32px 32px;
  box-sizing: border-box;
`;

// 현재 단계 위치를 짧은 점/막대로 보여 주는 진행 표시 영역이다.
export const Dots = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 34px;
`;

export const Dot = styled.div<{ $active?: boolean; $wide?: boolean }>`
  width: ${(props) => (props.$wide ? "54px" : "14px")};
  height: 14px;
  border-radius: 999px;
  background: ${(props) => (props.$active ? "#8ee88a" : "#d7d7d7")};
`;

export const Title = styled.h1`
  margin: 0 0 18px;
  font-size: clamp(26px, 1.8vw, 30px);
  line-height: 1.25;
  font-weight: 800;
  color: #4a4a4a;
  word-break: keep-all;
`;

export const Description = styled.p`
  margin: 0;
  font-size: clamp(13px, 0.95vw, 15px);
  line-height: 1.45;
  color: #8b8b8b;
  word-break: keep-all;
  white-space: pre-line;
`;

export const Label = styled.label`
  display: block;
  margin-top: 28px;
  margin-bottom: 10px;
  font-size: clamp(14px, 1vw, 16px);
  line-height: 1.2;
  font-weight: 700;
  color: #5d5d5d;
`;

// 이메일과 인증번호 입력이 공통으로 사용하는 기본 입력 스타일이다.
export const Input = styled.input`
  width: 100%;
  height: clamp(42px, 2.8vw, 46px);
  padding: 0 16px;
  border: 1px solid #909090;
  border-radius: 8px;
  font-size: clamp(13px, 0.95vw, 15px);
  color: #424242;
  box-sizing: border-box;
  outline: none;

  &::placeholder {
    color: #b1b1b1;
  }

  &:focus {
    border-color: #8ee88a;
    box-shadow: 0 0 0 3px rgba(142, 232, 138, 0.12);
  }
`;

// 인증번호 입력, 남은 시간, 재발급 버튼을 한 줄에 정렬하는 레이아웃이다.
export const CodeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 64px 72px;
  gap: 10px;
`;

export const Timer = styled.div`
  height: clamp(42px, 2.8vw, 46px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(12px, 0.9vw, 14px);
  font-weight: 700;
  color: #ff6a6a;
`;

export const ResendButton = styled.button`
  height: clamp(42px, 2.8vw, 46px);
  border: 1px solid #b9b9b9;
  border-radius: 8px;
  background: #ffffff;
  font-size: clamp(12px, 0.85vw, 13px);
  color: #6f6f6f;
  cursor: pointer;
`;

export const ErrorText = styled.div`
  min-height: 20px;
  margin-top: 8px;
  font-size: clamp(11px, 0.8vw, 13px);
  line-height: 1.35;
  color: #ef5353;
`;

// 단계별 확인 액션을 공통으로 처리하는 메인 버튼 스타일이다.
export const ConfirmButton = styled.button`
  width: 100%;
  height: clamp(44px, 2.9vw, 48px);
  margin-top: 18px;
  border: none;
  border-radius: 8px;
  background: #9be995;
  color: #ffffff;
  font-size: clamp(14px, 1vw, 16px);
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    background: #cdecca;
    cursor: not-allowed;
  }
`;




