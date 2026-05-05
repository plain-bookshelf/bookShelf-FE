/**
 * requestManage/style.ts
 *
 * 대여 요청함 화면은 bookManag 스타일을 최대한 재사용하고,
 * 요청함에 필요한 표 컬럼과 버튼만 얇게 덮어쓴다.
 *
 * 이 파일을 읽을 때는
 * "어떤 스타일을 완전히 새로 만든 것이 아니라 bookManag에서 무엇을 재사용했는지"
 * 중심으로 보면 이해가 쉽다.
 */
import styled from "styled-components";
import * as B from "../style";

/** 요청함도 관리자 오른쪽 본문 전체 높이를 채우도록 Wrapper를 재사용한다. */
export const Wrapper = styled(B.Wrapper)`
  min-height: 100vh;
`;

/** 카드 본체는 상태 확인 화면과 동일 톤을 유지한다. */
export const Panel = B.BookTableContent;

/** 상단 툴바와 검색 UI는 그대로 재사용한다. */
export const Toolbar = B.Toolbar;
export const TitleContainer = B.TitleContainer;
export const Title = B.Title;
export const FilterLabel = B.RentViewContent;
export const FilterText = B.Text;
export const CheckLabel = B.CheckLabel;
export const HiddenCheckBox = B.HiddenCheckBox;
export const CheckBox = B.CheckBox;
export const SearchContent = B.SearchContent;
export const SearchBar = B.SearchBar;
export const Icon = B.Icon;
export const SearchButton = B.SearchButton;
export const Pagination = B.Pagination;
export const PageButton = B.PageButton;

/** 표 프레임 간격 */
export const TableFrame = styled(B.TableFrame)`
  gap: 6px;
`;

/**
 * 요청함 전용 헤더 레이아웃
 *
 * 상태 확인 화면과 컬럼 수가 다르기 때문에
 * grid-template-columns만 요청함 요구에 맞춰 다시 정의한다.
 */
export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 1.8fr) minmax(150px, 1.2fr) minmax(130px, 1fr) minmax(110px, 0.8fr) minmax(120px, 0.8fr) 96px;
  align-items: center;
  min-height: 54px;
  padding: 0 28px;
  color: #8d8d8d;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #bde7bd;
`;

/** 헤더 셀은 bookManag 색/폰트를 그대로 따른다. */
export const HeaderCell = styled(B.HeaderCell)`
  font-size: 14px;
  font-weight: 600;
  color: #8d8d8d;
`;

/** 바디 스크롤 정책 */
export const TableBody = styled(B.TableBody)`
  overflow-y: visible;
`;

/** 요청함 한 행의 컬럼 구조 */
export const TableRow = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 1.8fr) minmax(150px, 1.2fr) minmax(130px, 1fr) minmax(110px, 0.8fr) minmax(120px, 0.8fr) 96px;
  align-items: center;
  min-height: 56px;
  padding: 0 28px;
  color: #7b7b7b;
  font-size: 14px;
`;

/** 본문 셀 공통 스타일 */
export const Cell = styled(B.Cell)`
  color: #7b7b7b;
  font-size: 14px;
  font-weight: 500;
`;

/** 마지막 버튼 칸은 우측 정렬 */
export const ActionCell = styled(B.CenterCell)`
  justify-content: flex-end;
`;

/** 대여/반납 버튼 */
export const RentButton = styled.button<{ $done?: boolean }>`
  min-width: 58px;
  height: 28px;
  padding: 0 14px;
  border: none;
  border-radius: 6px;
  background: ${({ $done }) => ($done ? "#e6e6e6" : "#9be79b")};
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: ${({ $done }) => ($done ? "default" : "pointer")};
`;

/** 데이터가 없을 때의 빈 상태 메시지 */
export const EmptyState = styled.div`
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9a9a9a;
  font-size: 14px;
`;
