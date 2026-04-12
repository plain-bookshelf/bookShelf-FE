import { useMemo } from "react";
import * as S from "./style";
import TitleContent from "./titleContent";

// 상태 확인 테이블은 승인된 대여 목록을 보여 주는 공용 표 컴포넌트다.
export type DateVariant = "normal" | "warning" | "overdue";

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
  // 현재는 상위 페이지에서 이미 필터링된 데이터를 내려 주기 때문에 그대로 사용한다.
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
              onClick={() => onPageChange?.(page - 1)}
            >
              {page}
            </S.PageButton>
          ))}
          <S.PageButton
            type="button"
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
