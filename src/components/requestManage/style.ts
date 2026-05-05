// 관리자 대여 요청함 테이블 전용 스타일 모음이다.
import styled from "styled-components";
import * as B from "../bookManag/style";

export const Wrapper = styled(B.Wrapper)`
  min-height: 100vh;
`;
export const Panel = B.BookTableContent;
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
export const Pagination = B.Pagination;
export const PageButton = B.PageButton;

export const TableFrame = styled(B.TableFrame)`
  gap: 6px;
`;

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

export const HeaderCell = styled(B.HeaderCell)`
  font-size: 14px;
  font-weight: 600;
  color: #8d8d8d;
`;

export const TableBody = styled(B.TableBody)`
  overflow-y: visible;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 1.8fr) minmax(150px, 1.2fr) minmax(130px, 1fr) minmax(110px, 0.8fr) minmax(120px, 0.8fr) 96px;
  align-items: center;
  min-height: 56px;
  padding: 0 28px;
  color: #7b7b7b;
  font-size: 14px;
`;

export const Cell = styled(B.Cell)`
  color: #7b7b7b;
  font-size: 14px;
  font-weight: 500;
`;

export const ActionCell = styled(B.CenterCell)`
  justify-content: flex-end;
`;

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

export const EmptyState = styled.div`
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9a9a9a;
  font-size: 14px;
`;

