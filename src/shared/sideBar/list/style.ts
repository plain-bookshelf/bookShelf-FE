/**
 * sideBar/list/style.ts
 *
 * 관리자 사이드바 안의 "책 관리" 메뉴 전용 스타일 모음이다.
 *
 * 역할 분리
 * - Container / MainContent: 상위 메뉴 블록
 * - SubContent / SubItems: 하위 메뉴 목록
 * - Text: 현재 선택 상태에 따른 색상 변화
 */
import styled from "styled-components";

/** 책 관리 메뉴 블록 전체 */
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/** 책 관리 제목 행 */
export const MainContent = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/** 아이콘 + 텍스트 묶음 */
export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

/** 상위 메뉴 제목 */
export const Title = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #79d179;
`;

/** 하위 메뉴 목록 영역. 좌측 초록 가이드를 함께 보여 준다. */
export const SubContent = styled.div`
  width: 100%;
  padding-left: 8px;
  border-left: 2px solid #d9f3d9;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

/**
 * 개별 하위 메뉴 버튼
 *
 * active일 때는 초록 테두리와 배경을 적용해
 * 현재 선택된 화면임을 시각적으로 보여 준다.
 */
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

/** 메뉴 텍스트. 선택 상태에 따라 색상이 달라진다. */
export const Text = styled.p<{ $active?: boolean }>`
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: ${({ $active }) => ($active ? "#79d179" : "#a2a2a2")};
`;
