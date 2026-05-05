// 관리자 사이드바 상단 사용자 정보 영역 전용 스타일 모음이다.
import styled from "styled-components";

export const UserInfo = styled.div`
  width: 100%;
  height: 92px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ececec;
`;

export const TitleContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const UserName = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #282828;
`;

export const subText = styled.p`
  margin: 0;
  font-size: 11px;
  color: #7f7f7f;
`;

