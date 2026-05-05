import { useMemo } from "react";
import * as S from "./style";
import TitleContent from "./titleContent";

/**
 * 대여 상태 배지 색상을 결정하는 화면용 타입
 *
 * normal  : 여유 있는 상태
 * warning : 반납 기한이 가까운 상태
 * overdue : 이미 연체된 상태
 */
export type DateVariant = "normal" | "warning" | "overdue";

/**
 * 책 대여 상태 확인 표의 한 행에 필요한 데이터 타입
 */
export interface BookTableItem {
  id: string;
  title: string;
  code: string;
  callNumber: string;
  author: string;
  userName: string;
  dateStatus: string;
  dateVariant: DateVariant;
  actionLabel: string;
  returned?: boolean;
}

/**
 * BookTable props
 *
 * 관리자 페이지가 계산해 넘긴 상태/이벤트만 사용한다.
 */
interface BookTableProps {
  items: BookTableItem[];
  checked: boolean;
  searchValue: string;
  title?: string;
  currentPage?: number;
  totalPages?: number;
  onToggle: () => void;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onAction: (id: string) => void;
  onPageChange?: (page: number) => void;
}

/**
 * 책 대여 상태 확인 표 컴포넌트
 *
 * 요청함 표와 비슷한 역할을 하지만,
 * 날짜 상태 배지와 반납 버튼을 중심으로 구성된다는 점이 다르다.
 */
export default function BookTable({
  items,
  checked,
  searchValue,
  title = "책 대여 상태 확인",
  currentPage = 0,
  totalPages = 1,
  onToggle,
  onSearchChange,
  onSearchSubmit,
  onAction,
  onPageChange,
}: BookTableProps) {
  /**
   * 현재는 상위에서 이미 필터링된 items를 넘겨 주기 때문에 그대로 사용한다.
   * useMemo를 둔 이유는 나중에 이 컴포넌트 내부에서 추가 가공이 들어가더라도
   * 계산 위치를 확장하기 쉽게 하기 위해서다.
   */
  const visibleItems = useMemo(() => items, [items]);
  const pages = Array.from({ length: Math.max(totalPages, 1) }, (_, index) => index + 1);

  return (
    <S.Wrapper>
      <S.BookTableContent>
        <TitleContent
          title={title}
          checked={checked}
          searchValue={searchValue}
          onToggle={onToggle}
          onSearchChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
        />

        <S.TableFrame>
          <S.TableHeader>
            <S.HeaderCell>도서명</S.HeaderCell>
            <S.HeaderCell>등록번호</S.HeaderCell>
            <S.HeaderCell>청구기호</S.HeaderCell>
            <S.HeaderCell>출판사</S.HeaderCell>
            <S.HeaderCell>유저 이름</S.HeaderCell>
            <S.HeaderCell $align="center">대여/연체 날짜</S.HeaderCell>
            <S.HeaderCell $align="center">반납</S.HeaderCell>
          </S.TableHeader>

          <S.TableBody>
            {visibleItems.map((book) => (
              <S.TableRow key={book.id}>
                <S.Cell>{book.title}</S.Cell>
                <S.Cell>{book.code}</S.Cell>
                <S.Cell>{book.callNumber}</S.Cell>
                <S.Cell>{book.author}</S.Cell>
                <S.Cell>{book.userName}</S.Cell>
                <S.CenterCell>
                  {/**
                    * 배지는 문자열만 바꾸는 것이 아니라
                    * dateVariant를 통해 색상과 테두리 스타일도 함께 바뀐다.
                    */}
                  <S.DateStatusPill $variant={book.dateVariant}>{book.dateStatus}</S.DateStatusPill>
                </S.CenterCell>
                <S.CenterCell>
                  <S.ActionText type="button" onClick={() => onAction(book.id)}>
                    {book.actionLabel}
                  </S.ActionText>
                </S.CenterCell>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.TableFrame>

        <S.Pagination>
          <S.PageButton
            type="button"
            $variant="arrow"
            onClick={() => onPageChange?.(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            &lt;
          </S.PageButton>
          {pages.map((page) => (
            <S.PageButton
              key={page}
              type="button"
              $active={page - 1 === currentPage}
              $variant="page"
              onClick={() => onPageChange?.(page - 1)}
            >
              {page}
            </S.PageButton>
          ))}
          <S.PageButton
            type="button"
            $variant="arrow"
            onClick={() => onPageChange?.(Math.min(Math.max(totalPages - 1, 0), currentPage + 1))}
            disabled={currentPage >= totalPages - 1}
          >
            &gt;
          </S.PageButton>
        </S.Pagination>
      </S.BookTableContent>
    </S.Wrapper>
  );
}
