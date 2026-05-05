// 아이디 찾기 소개 카드 전용 스타일 모음이다.
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

export const Dot = styled.div<{ $active?: boolean }>`
  width: 12px;
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

export const NoticeBox = styled.div`
  margin-top: 22px;
  padding: 14px 16px;
  border: 1px solid #75e3ca;
  background: #f7fffc;
`;

export const NoticeTitle = styled.p`
  margin: 0 0 10px;
  font-size: 12px;
  line-height: 1.4;
  font-weight: 700;
  color: #6a6a6a;
`;

export const NoticeText = styled.p`
  margin: 0;
  font-size: 11px;
  line-height: 1.55;
  color: #7d7d7d;
  word-break: keep-all;
`;

export const ActionRow = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 0 0 14px;
  border: none;
  border-bottom: 1px solid #4f4f4f;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-align: left;
`;

export const ActionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ActionTitle = styled.span`
  font-size: 16px;
  line-height: 1.3;
  font-weight: 700;
  color: #4a4a4a;
`;

export const ActionDescription = styled.span`
  font-size: 11px;
  line-height: 1.35;
  color: #9a9a9a;
`;

export const Arrow = styled.span`
  font-size: 34px;
  line-height: 1;
  color: #6e6e6e;
`;

