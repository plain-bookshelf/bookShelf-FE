import styled from "styled-components";

export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(24px, 3vw, 40px);
  background: #fafafa;
`;

export const Card = styled.div`
  width: min(100%, clamp(560px, 36vw, 640px));
  min-height: clamp(400px, 27vw, 470px);
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  padding: 40px 36px 36px;
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
  background: ${(props) => (props.$active ? "#8ee88a" : "#d7d7d7")};
`;

export const Title = styled.h1`
  margin: 0 0 18px;
  font-size: 40px;
  line-height: 1.25;
  font-weight: 800;
  color: #4a4a4a;
  word-break: keep-all;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.45;
  color: #8b8b8b;
  word-break: keep-all;
  white-space: pre-line;
`;

export const ResultBox = styled.div`
  margin-top: 28px;
  min-height: 112px;
  padding: 20px;
  border: 1px solid #75e3ca;
  background: #f7fffc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 1.4;
  color: #4a4a4a;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  height: 52px;
  margin-top: 18px;
  border: none;
  border-radius: 8px;
  background: #9be995;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;
