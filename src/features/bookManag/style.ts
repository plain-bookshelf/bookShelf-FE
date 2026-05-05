/**
 * bookManag/style.ts
 *
 * 관리자 "책 대여 상태 확인" 화면의 styled-components 모음이다.
 *
 * 읽는 순서
 * 1. Wrapper / BookTableContent: 카드 바깥 레이아웃
 * 2. Toolbar 계열: 제목, 필터, 검색창
 * 3. Table 계열: 표 뼈대와 컬럼 레이아웃
 * 4. DateStatusPill / ActionText: 상태 배지와 액션 버튼
 * 5. Pagination: 페이지 이동 UI
 *
 * 특히 TableHeader / TableRow의 grid-template-columns는
 * 컬럼 정렬을 결정하는 핵심 수치이므로 수정 시 두 곳을 반드시 함께 맞춰야 한다.
 */
import styled from "styled-components";

/** 관리자 본문 오른쪽 전체 영역 */
export const Wrapper = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 100vh;
  padding: 32px 36px;
  box-sizing: border-box;
  background: #fafafa;
  overflow: hidden;
`;

/** 흰색 카드 본체 */
export const BookTableContent = styled.section`
  width: 100%;
  max-width: 100%;
  height: 100%;
  min-height: 0;
  padding: 32px 28px 28px;
  border-radius: 20px;
  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 0 2px 8px 0 #0000000d;
  display: flex;
  flex-direction: column;
  gap: 28px;
  overflow: hidden;
`;

/** 제목, 필터, 검색창을 한 줄에 배치하는 상단 툴바 */
export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
`;

/** 왼쪽 제목/필터 묶음 */
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #434343;
`;

/** "연체만 보기" 라벨 전체 */
export const RentViewContent = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 11px;
  cursor: pointer;
`;

export const Text = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #575757;
`;

/** 오른쪽 액션 영역(검색창, 버튼 등)을 확장하기 위한 래퍼 */
export const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

/** 커스텀 체크박스 라벨 */
export const CheckLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

/** 실제 네이티브 checkbox는 숨기고 상태만 이용한다. */
export const HiddenCheckBox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

/**
 * CheckBox
 *
 * 눈에 보이는 가짜 체크박스 UI다.
 * HiddenCheckBox 상태에 따라 초록 배경과 흰 체크 표시를 만든다.
 */
export const CheckBox = styled.span`
  width: 20px;
  height: 20px;
  border: 2px solid #00c471;
  border-radius: 4px;
  background: #ffffff;
  box-sizing: border-box;
  position: relative;
  transition: all 0.2s ease;

  ${HiddenCheckBox}:checked + & {
    background: #00c471;
    border-color: #00c471;
  }

  ${HiddenCheckBox}:checked + &::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 1px;
    width: 6px;
    height: 11px;
    border: solid #ffffff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

/** 검색창 기준 래퍼 */
export const SearchContent = styled.div`
  position: relative;
  width: min(320px, 100%);
`;

/** 관리자 표 검색 입력 */
export const SearchBar = styled.input`
  width: 100%;
  height: 49px;
  padding: 0 48px 0 18px;
  border: 1px solid #88e788;
  border-radius: 999px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
  color: #434343;

  &::placeholder {
    color: #7ad07a;
  }

  &:focus {
    outline: none;
    box-shadow: 1px 1px 5px 0 #a0eca0ac;
  }
`;

/** 검색 아이콘 */
export const Icon = styled.img`
  width: 18px;
  height: 18px;
`;

/**
 * 검색 아이콘 버튼
 *
 * 입력창 오른쪽에 absolute로 배치되어
 * Enter 키뿐 아니라 마우스 클릭으로도 검색을 실행할 수 있게 한다.
 */
export const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 999px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(122, 208, 122, 0.12);
  }
`;

/** 선택 액션용 보조 버튼 */
export const ActionButton = styled.button`
  min-width: 100px;
  height: 38px;
  padding: 0 18px;
  border: 1px solid #7ad07a;
  border-radius: 10px;
  background: #ffffff;
  color: #7ad07a;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

/** 표 전체 프레임 */
export const TableFrame = styled.div`
  flex: 1;
  width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 18px;
  overflow: hidden;
  background: #ffffff;
`;

/**
 * 헤더 행
 *
 * grid-template-columns 수치는 각 컬럼의 상대적 너비를 뜻한다.
 * Row와 반드시 동일해야 세로 정렬이 맞는다.
 */
export const TableHeader = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: minmax(180px, 1.9fr) minmax(140px, 1.15fr) minmax(120px, 0.95fr) minmax(150px, 1.2fr) minmax(120px, 0.95fr) minmax(140px, 1fr) 96px;
  align-items: center;
  min-height: 54px;
  padding: 0 28px;
  color: #8d8d8d;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #bde7bd;
`;

/** 헤더 셀 개별 정렬 */
export const HeaderCell = styled.div<{ $align?: "left" | "center" }>`
  white-space: nowrap;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #8d8d8d;
  justify-content: ${({ $align }) => ($align === "center" ? "center" : "flex-start")};
`;

/** 테이블 바디 */
export const TableBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: visible;
`;

/** 데이터 한 행 */
export const TableRow = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: minmax(180px, 1.9fr) minmax(140px, 1.15fr) minmax(120px, 0.95fr) minmax(150px, 1.2fr) minmax(120px, 0.95fr) minmax(140px, 1fr) 96px;
  align-items: center;
  min-height: 56px;
  padding: 0 28px;
  color: #7b7b7b;
  font-size: 14px;
`;

/** 공통 본문 셀 */
export const Cell = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #7b7b7b;
  font-size: 14px;
  font-weight: 500;
`;

/** 가운데 정렬이 필요한 셀 전용 확장 */
export const CenterCell = styled(Cell)`
  justify-content: center;
`;

/**
 * 대여/연체 상태 배지
 *
 * variant 값에 따라 글자색, 배경색, 테두리색을 동시에 바꾼다.
 */
export const DateStatusPill = styled.span<{ $variant: "normal" | "warning" | "overdue" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 58px;
  height: 28px;
  padding: 0 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $variant }) => {
    if ($variant === "overdue") return "#E96B6B";
    if ($variant === "warning") return "#F0A23A";
    return "#72BF72";
  }};
  background: ${({ $variant }) => {
    if ($variant === "overdue") return "#FFF3F3";
    if ($variant === "warning") return "#FFF7EA";
    return "#F4FDF4";
  }};
  border: 1px solid ${({ $variant }) => {
    if ($variant === "overdue") return "#F3C3C3";
    if ($variant === "warning") return "#F7D6A1";
    return "#C7E9C7";
  }};
`;

/** 반납 버튼 */
export const ActionText = styled.button`
  min-width: 58px;
  height: 28px;
  padding: 0 14px;
  box-sizing: border-box;
  border: none;
  border-radius: 6px;
  background: #9be79b;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

/** 페이지 버튼 행 */
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 6px;
`;

/**
 * 개별 페이지 버튼
 *
 * $variant
 * - "page": 숫자 버튼
 * - "arrow": 이전/다음 화살표 버튼
 *
 * disabled 상태일 때는 실제로 클릭되지 않을 뿐 아니라
 * 색상과 커서도 바꿔 "더 이상 이동할 수 없는 방향"임을 분명히 보여 준다.
 */
export const PageButton = styled.button<{ $active?: boolean; $variant?: "page" | "arrow" }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid
    ${({ $active, $variant }) => {
      if ($active) return "#88e788";
      if ($variant === "arrow") return "#cfd8cf";
      return "#d7d7d7";
    }};
  background: ${({ $active, $variant }) => {
    if ($active) return "#88e788";
    if ($variant === "arrow") return "#f7fbf7";
    return "#FFFFFF";
  }};
  color: ${({ $active, $variant }) => {
    if ($active) return "#ffffff";
    if ($variant === "arrow") return "#72bf72";
    return "#6c6c6c";
  }};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    opacity 0.2s ease;

  &:disabled {
    border-color: #e3e3e3;
    background: #f4f4f4;
    color: #bcbcbc;
    cursor: not-allowed;
    opacity: 0.8;
  }
`;
