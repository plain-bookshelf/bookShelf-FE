import styled from "styled-components";

export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(24px, 3vw, 40px);
  background: #fafafa;
`;

export const SmallCard = styled.div`
  width: min(100%, clamp(560px, 36vw, 640px));
  min-height: clamp(260px, 18vw, 320px);
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
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
  background: ${(props) => (props.$active ? "#9be995" : "#d7d7d7")};
`;

export const Title = styled.h1`
  margin: 0 0 18px;
  font-size: 40px;
  line-height: 1.25;
  font-weight: 800;
  color: #4b4b4b;
  word-break: keep-all;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.45;
  color: #9b9b9b;
  white-space: pre-line;
  word-break: keep-all;
`;

export const ButtonWrap = styled.div`
  margin-top: 24px;
`;
