import styled from "styled-components";

// === 1. 메인 레이아웃과 공통 구분선 ===

// Header/Footer는 상위 Layout에서 처리하고, 상세 페이지에서는 본문 폭과 정렬만 담당한다.
export const DetailPageWrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  display: flex;
  padding: 20px var(--page-gutter) 0;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  width: min(100%, var(--content-max-width));
  margin: 20px 0;
`;

// === 2. 도서 기본 정보 영역 ===

export const InfoSection = styled.section`
  width: min(100%, var(--content-max-width));
  height: 405px;
  display: flex; /* 표지, 메타데이터, 요약 박스를 가로로 배치한다. */
  gap: clamp(24px, 2.2vw, 40px);
  padding: 30px 0;
  box-sizing: border-box;
  align-items: flex-start;
`;

export const BookCoverArea = styled.div`
  text-align: center;
  width: 260px;
  height: 404px;
  flex-shrink: 0;
`;


export const StatusBadge = styled.div`
  width: 260px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const BookCover = styled.img`
  width: 260px;
  height: 404px;
  border: 1px solid #ddd;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  object-fit: cover;
`;

export const BookTitle = styled.h1`
  font-size: 2em;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
  text-align: left;
`;

export const BookMetadata = styled.div`
  flex-grow: 1;
  min-width: 0;
  font-size: 0.95em;
  color: #555;
  font-weight: 550;
  line-height: 1.8;
  padding-top: 10px;
  
  & > p {
    margin: 0;
    width: min(100%, 516px);
    
  }
  
  strong {
    color: #333;
    font-weight: 600;
  }
`



export const Categories = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  font-size: 0.85em;
`

export const CategoryLabel = styled.span`
  height: 21px;
  padding: 3px 8px;
  margin-right: 10px;
  border-radius: 15px;
  background-color: #EDEDED;
  color: #7D7D7D;
`

export const CategoryItem = styled.span`
  color: #5D5D5D; 
  font-weight: 500;
  margin-right: 8px;
`

export const BookSummary = styled.div`
  width: min(100%, 310px);
  flex-shrink: 0;
  border: 1px solid #E7E7E7;
  box-shadow: 1px 1px 10px #E7E7E7;
  border-radius: 10px;
  padding: 30px;
`

export const BookSummaryTextContent = styled.div`
  font-size: 16px;
  font-weight: 550;
  color: #5D5D5D;
  line-height: 1.6;

`

// === 3. 탭 네비게이션 ===

export const TabContainer = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 2px solid #ddd;
  margin-top: 20px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
`

export const DetailTabs = styled.nav`
  width: min(100%, var(--content-max-width));
  height: 80px;
  border-bottom: 2px solid #ddd;
  display: flex;
`

export const TabButton = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 1.1em;
  cursor: pointer;
  color: ${(props) => (props.$isActive ? "#000" : "#888")};
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
  border-bottom: 2px solid ${(props) => (props.$isActive ? "#00C471" : "transparent")};
  transition: border-bottom 0.3s, color 0.3s;
`;


// === 4. 소장 정보 테이블 ===

export const CollectionContainer = styled.section`
  width: min(100%, var(--content-max-width));
  overflow-x: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LibraryTable = styled.table`
  width: 100%;
  min-width: 1200px;
  border-collapse: collapse;
  text-align: center;
  font-size: 0.9em;
`

export const TableHead = styled.thead`
  height: 70px;
  box-shadow: 0 3px 5px 3px #E7E7E7;
  border-radius: 15px;
  th {
    padding: 12px 15px;
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }
`

export const TableBody = styled.tbody`
    &::before {
    content: "";
    display: block;
    height: 1px;
  }

  tr {
    width: 100%;
    height: 80px;

    &:hover {
      background-color: #fafafa;
    }
  }
  td {
    padding: 12px 15px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
  }
`
export const StatusCell = styled.td<{ $status: boolean }>`
  font-weight: bold;
  color: ${(props) => (props.$status ? "#8D8D8D" : "#00C471")};
`;

export const ActionButton = styled.button<{ $type: 'primary' | 'secondary' | 'disabled' }>`
  padding: 6px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s;
  min-width: 80px;

  ${(props) => {
    if (props.$type === 'primary') {
      return `
       background-color: white;
        color: #00C471;
        border: 1px solid #00C471;
        &:hover {
          background-color: #ebfff7;
        }
      `
    } else if (props.$type === 'secondary') {
      return `
        background-color: white;
        color: #00C471;
        border: 1px solid #00C471;
        &:hover {
          background-color: #ebfff7;
        }
      `
    } else {
      return `
        background-color: #f0f0f0;
        color: #898989;
        border: 1px solid #ddd;
        cursor: not-allowed;
      `
    }
  }}
`

