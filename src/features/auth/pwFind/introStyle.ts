// 비밀번호 찾기 소개 카드 전용 스타일 모음이다.
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
  width: min(100%, clamp(500px, 32vw, 560px));
  min-height: clamp(390px, 25vw, 430px);
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

export const Dot = styled.div<{ $active?: boolean }>`
  width: 14px;
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

export const NoticeBox = styled.div`
  margin-top: 28px;
  padding: 18px 20px;
  border: 1px solid #75e3ca;
  background: #f7fffc;
`;

export const NoticeTitle = styled.p`
  margin: 0 0 12px;
  font-size: clamp(14px, 1vw, 16px);
  font-weight: 700;
  line-height: 1.45;
  color: #6a6a6a;
`;

export const NoticeText = styled.p`
  margin: 0;
  font-size: clamp(12px, 0.9vw, 14px);
  line-height: 1.55;
  color: #7d7d7d;
  word-break: keep-all;
`;

export const ActionRow = styled.button`
  width: 100%;
  margin-top: 26px;
  padding: 0 0 18px;
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
  gap: 8px;
`;

export const ActionTitle = styled.span`
  font-size: clamp(18px, 1.3vw, 22px);
  font-weight: 700;
  line-height: 1.3;
  color: #4a4a4a;
`;

export const ActionDescription = styled.span`
  font-size: clamp(12px, 0.9vw, 14px);
  line-height: 1.35;
  color: #9a9a9a;
`;

export const Arrow = styled.span`
  font-size: 40px;
  line-height: 1;
  color: #6e6e6e;
`;

