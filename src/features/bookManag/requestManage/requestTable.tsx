import * as S from "./style";
import TitleContent from "./titleContent";

/**
 * 대여 요청함 한 행(row)에 필요한 화면용 데이터 타입
 *
 * admin 페이지의 원본 데이터에서 필요한 열만 골라 이 타입으로 변환해 넘긴다.
 */
export interface RequestItem {
  id: string;
  title: string;
  publisher: string;
  userName: string;
  callNumber: string;
  requestDate: string;
  approved?: boolean;
}

/**
 * RequestTable 컴포넌트 props
 *
 * 이 컴포넌트는 표 UI만 렌더링하고,
 * 검색 상태나 실제 승인 로직은 상위 페이지가 관리한다.
 */
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

/**
 * 대여 요청함 표 컴포넌트
 *
 * 책임
 * - 상단 필터/검색 UI를 보여 준다.
 * - 표 헤더와 행을 렌더링한다.
 * - 페이지네이션 버튼을 만든다.
 *
 * 하지 않는 일
 * - 실제 데이터 조회
 * - 승인/반납 상태 저장
 * - 검색 조건 계산
 */
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
  /**
   * 페이지 버튼 숫자 목록
   *
   * totalPages가 0일 수도 있으므로 최소 1페이지는 보이게 만든다.
   */
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
                    {/**
                      * 이 버튼은 실제 승인 로직을 모른다.
                      * 단지 "어떤 id가 클릭됐는지"만 상위로 알려 준다.
                      */}
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
            $variant="arrow"
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
              $variant="page"
              onClick={() => onPageChange(page - 1)}
            >
              {page}
            </S.PageButton>
          ))}
          <S.PageButton
            type="button"
            $variant="arrow"
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
