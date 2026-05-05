// 비밀번호 찾기 이메일/인증번호 단계 전용 스타일 모음이다.
import styled from "styled-components";

// 비밀번호 찾기 입력 카드를 화면 중앙에 배치하는 최상위 레이아웃이다.
export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(24px, 3vw, 40px);
  background: #fafafa;
`;

// 이메일 단계와 인증번호 단계를 공통으로 담는 좁은 폭 카드다.
export const NarrowCard = styled.div`
  width: min(100%, clamp(500px, 32vw, 560px));
  min-height: clamp(390px, 25vw, 430px);
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 34px 32px 32px;
  box-sizing: border-box;
`;

// 현재 흐름이 어느 단계까지 왔는지 보여 주는 진행 표시 영역이다.
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

export const FieldLabel = styled.label`
  display: block;
  margin-top: 28px;
  margin-bottom: 10px;
  font-size: clamp(14px, 1vw, 16px);
  line-height: 1.2;
  font-weight: 700;
  color: #5d5d5d;
`;

// 이메일과 인증번호 입력이 함께 재사용하는 기본 인풋 스타일이다.
export const Input = styled.input`
  width: 100%;
  height: clamp(42px, 2.8vw, 46px);
  padding: 0 16px;
  border: 1px solid #a2a2a2;
  border-radius: 9px;
  box-sizing: border-box;
  font-size: clamp(13px, 0.95vw, 15px);
  color: #414141;
  outline: none;

  &::placeholder {
    color: #c3c3c3;
  }

  &:focus {
    border-color: #9be995;
    box-shadow: 0 0 0 3px rgba(155, 233, 149, 0.12);
  }
`;

// 인증번호 입력칸, 타이머, 재발급 버튼을 한 줄에 배치한다.
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
  border: 1px solid #c2c2c2;
  border-radius: 9px;
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

// 단계 진행을 위한 메인 액션 버튼 스타일이다.
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
    background: #cfecca;
    cursor: not-allowed;
  }
`;




