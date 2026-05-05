// 관리자 책 대여 상태 확인 테이블 전용 스타일 모음이다.
import styled from "styled-components";

export const Wrapper = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 100vh;
  padding: 32px 36px;
  box-sizing: border-box;
  background: #fafafa;
  overflow: hidden;
`;

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

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
`;

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

export const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const CheckLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

export const HiddenCheckBox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

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

export const SearchContent = styled.div`
  position: relative;
  width: min(320px, 100%);
`;

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
    color: #7AD07A;
  }

  &:focus{
    outline: none;
    box-shadow: 1px 1px 5px 0 #a0eca0ac;
  }
`;

export const Icon = styled.img`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
`;

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

export const TableFrame = styled.div`
  flex: 1;
  width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  overflow: hidden;
  background: #ffffff;
`;

export const TableHeader = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 1.2fr) minmax(88px, 0.8fr);
  align-items: center;
  min-height: 56px;
  padding: 0 16px;
  background: #f6f8f6;
  border-bottom: 1px solid #e6e6e6;
  color: #6c6c6c;
  font-size: 14px;
  font-weight: 700;
`;

export const HeaderCell = styled.div<{ $align?: "left" | "center" }>`
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) =>
    $align === "center" ? "center" : "flex-start"};
`;

export const TableBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

export const TableRow = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 1.2fr) minmax(88px, 0.8fr);
  align-items: center;
  min-height: 78px;
  padding: 0 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  color: #434343;
`;

export const Cell = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CenterCell = styled(Cell)`
  justify-content: center;
`;

export const DateStatusPill = styled.span<{ $variant: "normal" | "warning" | "overdue" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
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

export const ActionText = styled.button`
  min-width: 100px;
  height: 38px;
  padding: 0 14px;

  box-sizing: border-box;
  border: 1px solid #BFE8BF;
  border-radius: 8px;
  background: #ffffff;
  color: #7BC77B;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 6px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid ${({ $active }) => ($active ? "#88e788" : "#d7d7d7")};
  background: ${({ $active }) => ($active ? "#88e788" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#6c6c6c")};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

