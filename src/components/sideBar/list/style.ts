// 관리자 사이드바 메뉴 영역 전용 스타일 모음이다.
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MainContent = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Title = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #79d179;
`;

export const SubContent = styled.div`
  width: 100%;
  padding-left: 8px;
  border-left: 2px solid #d9f3d9;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SubItems = styled.button<{ $active?: boolean }>`
  width: 100%;
  height: 36px;
  padding: 0 12px;
  box-sizing: border-box;
  border: 1px solid ${({ $active }) => ($active ? "#bce8bc" : "transparent")};
  border-radius: 8px;
  background: ${({ $active }) => ($active ? "#f6fff6" : "transparent")};
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const Text = styled.p<{ $active?: boolean }>`
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: ${({ $active }) => ($active ? "#79d179" : "#a2a2a2")};
`;

