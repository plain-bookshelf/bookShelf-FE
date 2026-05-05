// 비밀번호 찾기 소개 카드 전용 스타일 모음이다.
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
  width: min(100%, 640px);
  min-height: 410px;
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

export const Dot = styled.div<{ $active?: boolean }>`
  width: 12px;
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

export const NoticeBox = styled.div`
  margin-top: 24px;
  padding: 16px;
  border: 1px solid #75e3ca;
  background: #f7fffc;
`;

export const NoticeTitle = styled.p`
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.45;
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
  margin-top: 22px;
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
  font-weight: 700;
  line-height: 1.3;
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

