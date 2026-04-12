// 아이디 찾기 결과 화면 전용 스타일 모음이다.
import styled from "styled-components";

export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #fafafa;
`;

export const Card = styled.div`
  width: min(100%, 470px);
  min-height: 350px;
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  padding: 26px 24px 28px;
  box-sizing: border-box;
`;

export const Dots = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 26px;
`;

export const Dot = styled.div<{ $active?: boolean; $wide?: boolean }>`
  width: ${(props) => (props.$wide ? "48px" : "12px")};
  height: 12px;
  border-radius: 999px;
  background: ${(props) => (props.$active ? "#8ee88a" : "#d7d7d7")};
`;

export const Title = styled.h1`
  margin: 0 0 14px;
  font-size: 24px;
  line-height: 1.25;
  font-weight: 800;
  color: #4a4a4a;
  word-break: keep-all;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: #8b8b8b;
  word-break: keep-all;
  white-space: pre-line;
`;

export const ResultBox = styled.div`
  margin-top: 22px;
  height: 78px;
  border: 1px solid #75e3ca;
  background: #f7fffc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1.4;
  color: #4a4a4a;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  height: 42px;
  margin-top: 10px;
  border: none;
  border-radius: 8px;
  background: #9be995;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

