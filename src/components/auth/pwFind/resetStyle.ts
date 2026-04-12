// 비밀번호 재설정 입력 폼 전용 스타일 모음이다.
import styled from "styled-components";

// 비밀번호 재설정 폼 카드를 화면 중앙에 고정하는 레이아웃이다.
export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #fafafa;
`;

// 아이디, 현재 비밀번호, 새 비밀번호 입력을 담는 재설정 전용 카드다.
export const NarrowCard = styled.div`
  width: min(100%, 390px);
  min-height: 450px;
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 24px 24px 28px;
  box-sizing: border-box;
`;

export const Dots = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

export const Dot = styled.div<{ $active?: boolean; $wide?: boolean }>`
  width: ${(props) => (props.$wide ? "40px" : "12px")};
  height: 12px;
  border-radius: 999px;
  background: ${(props) => (props.$active ? "#9be995" : "#d7d7d7")};
`;

export const Title = styled.h1`
  margin: 0 0 14px;
  font-size: 24px;
  line-height: 1.25;
  font-weight: 800;
  color: #4b4b4b;
  word-break: keep-all;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: #9b9b9b;
  white-space: pre-line;
  word-break: keep-all;
`;

export const FieldLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 700;
  color: #5d5d5d;
`;

// 재설정 폼의 모든 입력칸이 공유하는 기본 입력 스타일이다.
export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border: 1px solid #a2a2a2;
  border-radius: 9px;
  box-sizing: border-box;
  font-size: 12px;
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

// 여러 입력 필드를 일정 간격으로 세로 정렬하는 폼 스택 레이아웃이다.
export const FormStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 18px;
`;

export const ErrorText = styled.div`
  min-height: 18px;
  margin-top: 8px;
  font-size: 11px;
  line-height: 1.35;
  color: #ef5353;
`;

// 재설정 완료를 제출하는 하단 메인 버튼 스타일이다.
export const ConfirmButton = styled.button`
  width: 100%;
  height: 42px;
  margin-top: 14px;
  border: none;
  border-radius: 8px;
  background: #9be995;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    background: #cfecca;
    cursor: not-allowed;
  }
`;




