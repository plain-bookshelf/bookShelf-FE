import * as S from "./style";
import TitleContent from "./titleContent";

// 요청함 테이블은 페이지가 만든 데이터와 콜백을 그대로 받아
// 순수하게 표 형태로만 보여 주는 프레젠테이션 컴포넌트다.
export interface RequestItem {
  id: string;
  title: string;
  publisher: string;
  userName: string;
  callNumber: string;
  requestDate: string;
  approved?: boolean;
}

interface RequestTableProps {
  items: RequestItem[];
  checked: boolean;
  searchValue: string;
  currentPage: number;
  totalPages: number;
  onToggle: () => void;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onAction: (id: string) => void;
  onPageChange: (page: number) => void;
}

export default function RequestTable({
  items,
  checked,
  searchValue,
  currentPage,
  totalPages,
  onToggle,
  onSearchChange,
  onSearchSubmit,
  onAction,
  onPageChange,
}: RequestTableProps) {
  // 페이지네이션 버튼은 현재 총 페이지 수만 알면 순수 계산으로 만들 수 있다.
  const pages = Array.from({ length: Math.max(totalPages, 1) }, (_, index) => index + 1);

  return (
    <S.Wrapper>
      <S.Panel>
        <TitleContent
          checked={checked}
          searchValue={searchValue}
          onToggle={onToggle}
          onSearchChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
        />

        <S.TableFrame>
          <S.TableHeader>
            <S.HeaderCell>책 제목</S.HeaderCell>
            <S.HeaderCell>출판사</S.HeaderCell>
            <S.HeaderCell>유저 이름</S.HeaderCell>
            <S.HeaderCell>청구기호</S.HeaderCell>
            <S.HeaderCell>대여 요청 날짜</S.HeaderCell>
            <S.HeaderCell $align="center">대여</S.HeaderCell>
          </S.TableHeader>

          <S.TableBody>
            {items.length === 0 ? (
              // 검색/필터 결과가 비었을 때도 카드 높이가 무너지지 않게 빈 상태 영역을 유지한다.
              <S.EmptyState>표시할 요청이 없습니다.</S.EmptyState>
            ) : (
              items.map((item) => (
                <S.TableRow key={item.id}>
                  <S.Cell>{item.title}</S.Cell>
                  <S.Cell>{item.publisher}</S.Cell>
                  <S.Cell>{item.userName}</S.Cell>
                  <S.Cell>{item.callNumber}</S.Cell>
                  <S.Cell>{item.requestDate}</S.Cell>
                  <S.ActionCell>
                    <S.RentButton type="button" onClick={() => onAction(item.id)}>
                      {item.approved ? "반납" : "대여"}
                    </S.RentButton>
                  </S.ActionCell>
                </S.TableRow>
              ))
            )}
          </S.TableBody>
        </S.TableFrame>

        <S.Pagination>
          <S.PageButton
            type="button"
            onClick={() => onPageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            &lt;
          </S.PageButton>
          {pages.map((page) => (
            <S.PageButton
              key={page}
              type="button"
              $active={page - 1 === currentPage}
              onClick={() => onPageChange(page - 1)}
            >
              {page}
            </S.PageButton>
          ))}
          <S.PageButton
            type="button"
            onClick={() => onPageChange(Math.min(Math.max(totalPages - 1, 0), currentPage + 1))}
            disabled={currentPage >= totalPages - 1}
          >
            &gt;
          </S.PageButton>
        </S.Pagination>
      </S.Panel>
    </S.Wrapper>
  );
}
