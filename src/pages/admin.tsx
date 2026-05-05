import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { SideBar, type AdminSection } from "../shared/sideBar/sideBar";
import RequestTable, { type RequestItem } from "../features/bookManag/requestManage/requestTable";
import BookTable, { type BookTableItem, type DateVariant } from "../features/bookManag/bookTable";
import Confirm from "../features/bookManag/adminConfirm/confirm";

/**
 * 관리자 페이지 컨테이너
 *
 * 이 파일은 관리자 화면 전체의 중앙 상태 저장소 역할을 한다.
 *
 * 담당하는 일
 * 1. 왼쪽 사이드바에서 어떤 섹션을 보고 있는지 기억한다.
 * 2. 대여 요청함 / 대여 상태 확인 두 화면이 함께 보는 원본 데이터를 보관한다.
 * 3. 검색, 연체 필터, 페이지네이션 상태를 관리한다.
 * 4. 대여/반납 버튼을 눌렀을 때 모달을 띄우고 실제 상태를 바꾼다.
 * 5. localStorage를 사용해 새로고침 후에도 마지막 상태를 복원한다.
 *
 * 현재는 실제 서버 대신 테스트 데이터를 함께 사용해
 * 관리자 시나리오를 화면에서 바로 확인할 수 있게 해 두었다.
 */
const STORAGE_KEY = "admin-rental-items";
const SECTION_KEY = "admin-active-section";
const PAGE_SIZE = 8;

/**
 * 관리자 화면의 공통 원본 데이터 타입
 *
 * 요청함과 상태 확인 화면은 겉보기 컬럼은 다르지만,
 * 사실 "같은 책의 상태"를 서로 다른 방식으로 보여 주는 관계다.
 * 그래서 두 화면이 모두 사용할 수 있는 공통 타입을 하나 만든다.
 */
interface AdminRentalItem {
  id: string;
  title: string;
  publisher: string;
  userName: string;
  callNumber: string;
  registrationNumber: string;
  requestDate: string;
  dueLabel: string;
  dateVariant: DateVariant;
  approved: boolean;
}

/**
 * 테스트용 기본 데이터
 *
 * 아직 모든 관리자 API를 실제 서버와 완전히 연결하지 않은 상태에서도
 * 버튼 동작, 페이지네이션, 필터, 모달 흐름을 바로 확인할 수 있게 만든 샘플 목록이다.
 */
const TEST_ITEMS: AdminRentalItem[] = [
  { id: "req-1", title: "혼모노", publisher: "성해나 · 창비", userName: "리싸방", callNumber: "813.6", registrationNumber: "B-240101", requestDate: "12/23", dueLabel: "대여 14일 남음", dateVariant: "normal", approved: false },
  { id: "req-2", title: "가공범", publisher: "성해나 · 창비", userName: "일싸방", callNumber: "813.6", registrationNumber: "B-240102", requestDate: "12/23", dueLabel: "대여 8일 남음", dateVariant: "warning", approved: false },
  { id: "req-3", title: "편안함의 습격", publisher: "성해나 · 창비", userName: "민싸방", callNumber: "813.6", registrationNumber: "B-240103", requestDate: "12/23", dueLabel: "연체중", dateVariant: "overdue", approved: false },
  { id: "req-4", title: "다크 심리학", publisher: "성해나 · 창비", userName: "선싸방", callNumber: "813.6", registrationNumber: "B-240104", requestDate: "12/23", dueLabel: "대여 10일 남음", dateVariant: "normal", approved: true },
  { id: "req-5", title: "자몽살구클럽", publisher: "성해나 · 창비", userName: "지싸방", callNumber: "813.6", registrationNumber: "B-240105", requestDate: "12/23", dueLabel: "대여 5일 남음", dateVariant: "warning", approved: false },
  { id: "req-6", title: "모순", publisher: "성해나 · 창비", userName: "wjddlfnd", callNumber: "813.6", registrationNumber: "B-240106", requestDate: "12/23", dueLabel: "대여 12일 남음", dateVariant: "normal", approved: true },
  { id: "req-7", title: "소년이 온다", publisher: "한강 · 창비", userName: "wjddlfnd", callNumber: "813.6", registrationNumber: "B-240107", requestDate: "12/23", dueLabel: "대여 2일 남음", dateVariant: "warning", approved: false },
  { id: "req-8", title: "클린 코드", publisher: "로버트 C. 마틴", userName: "개발방", callNumber: "005.1", registrationNumber: "B-240108", requestDate: "12/23", dueLabel: "대여 16일 남음", dateVariant: "normal", approved: false },
  { id: "req-9", title: "클린 코드", publisher: "로버트 C. 마틴", userName: "개발방", callNumber: "005.1", registrationNumber: "B-240108", requestDate: "12/23", dueLabel: "대여 16일 남음", dateVariant: "normal", approved: false },
  { id: "req-10", title: "클린 코드", publisher: "로버트 C. 마틴", userName: "개발방", callNumber: "005.1", registrationNumber: "B-240108", requestDate: "12/23", dueLabel: "대여 16일 남음", dateVariant: "normal", approved: false },
  { id: "req-11", title: "클린 코드", publisher: "로버트 C. 마틴", userName: "개발방", callNumber: "005.1", registrationNumber: "B-240108", requestDate: "12/23", dueLabel: "대여 16일 남음", dateVariant: "normal", approved: false },
  { id: "req-12", title: "클린 코드", publisher: "로버트 C. 마틴", userName: "개발방", callNumber: "005.1", registrationNumber: "B-240108", requestDate: "12/23", dueLabel: "대여 16일 남음", dateVariant: "normal", approved: false },
  { id: "req-13", title: "클린 코드", publisher: "로버트 C. 마틴", userName: "개발방", callNumber: "005.1", registrationNumber: "B-240108", requestDate: "12/23", dueLabel: "대여 16일 남음", dateVariant: "normal", approved: false },
  { id: "req-14", title: "클린 코드", publisher: "로버트 C. 마틴", userName: "개발방", callNumber: "005.1", registrationNumber: "B-240108", requestDate: "12/23", dueLabel: "대여 16일 남음", dateVariant: "normal", approved: false },
  { id: "req-15", title: "클린 코드", publisher: "로버트 C. 마틴", userName: "개발방", callNumber: "005.1", registrationNumber: "B-240108", requestDate: "12/23", dueLabel: "대여 16일 남음", dateVariant: "normal", approved: false },
  { id: "req-16", title: "클린 코드", publisher: "로버트 C. 마틴", userName: "개발방", callNumber: "005.1", registrationNumber: "B-240108", requestDate: "12/23", dueLabel: "대여 16일 남음", dateVariant: "normal", approved: false },
  { id: "req-17", title: "클린 코드", publisher: "로버트 C. 마틴", userName: "개발방", callNumber: "005.1", registrationNumber: "B-240108", requestDate: "12/23", dueLabel: "대여 16일 남음", dateVariant: "normal", approved: false },
  { id: "req-18", title: "클린 코드", publisher: "로버트 C. 마틴", userName: "개발방", callNumber: "005.1", registrationNumber: "B-240108", requestDate: "12/23", dueLabel: "대여 16일 남음", dateVariant: "normal", approved: false },
  { id: "req-19", title: "클린 코드", publisher: "로버트 C. 마틴", userName: "개발방", callNumber: "005.1", registrationNumber: "B-240108", requestDate: "12/23", dueLabel: "대여 16일 남음", dateVariant: "normal", approved: false },
  { id: "req-20", title: "클린 코드", publisher: "로버트 C. 마틴", userName: "개발방", callNumber: "005.1", registrationNumber: "B-240108", requestDate: "12/23", dueLabel: "대여 16일 남음", dateVariant: "normal", approved: false },
];

/**
 * 확인 모달에 필요한 최소 정보만 따로 모은 타입
 *
 * 모달은 현재 선택된 책 전체를 다 알 필요는 없고,
 * 제목/문구/다음 상태만 알면 되기 때문에 state를 간단하게 분리했다.
 */
interface ConfirmState {
  itemId: string;
  title: string;
  message: string;
  confirmLabel: string;
  nextApproved: boolean;
}

/**
 * localStorage에서 관리자 데이터 복원
 *
 * 새로고침 후에도 승인/반납 상태를 유지하기 위해
 * 브라우저 저장소를 먼저 읽고, 값이 없거나 파싱이 실패하면 기본 테스트 데이터를 쓴다.
 */
function getStoredItems() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return TEST_ITEMS;
  }

  try {
    return JSON.parse(stored) as AdminRentalItem[];
  } catch {
    return TEST_ITEMS;
  }
}

/**
 * 마지막으로 열려 있던 관리자 탭 복원
 */
function getStoredSection(): AdminSection {
  const stored = localStorage.getItem(SECTION_KEY);
  return stored === "status" ? "status" : "request";
}

export default function Admin() {
  /**
   * activeSection
   *
   * 사이드바에서 현재 어떤 메뉴가 선택되어 있는지 나타낸다.
   * request면 "대여 요청함", status면 "책 대여 상태 확인" 화면을 보여 준다.
   */
  const [activeSection, setActiveSection] = useState<AdminSection>(() => getStoredSection());

  /**
   * items
   *
   * 관리자 화면의 가장 중요한 원본 데이터다.
   * 요청함과 상태 확인 화면 모두 이 배열을 공유한다.
   *
   * approved 값이 false면 요청 상태,
   * true면 실제 대여 중 상태로 본다.
   */
  const [items, setItems] = useState<AdminRentalItem[]>(() => getStoredItems());

  /**
   * requestPage / statusPage
   *
   * 두 화면의 페이지네이션은 서로 독립적으로 움직여야 하므로 state도 따로 둔다.
   */
  const [requestPage, setRequestPage] = useState(0);
  const [statusPage, setStatusPage] = useState(0);

  /**
   * requestOnlyOverdue / statusOnlyOverdue
   *
   * 각각의 화면에서 "연체만 보기" 체크 여부를 나타낸다.
   * 같은 관리자 페이지 안에 있어도 사용자 경험상 독립적인 필터이기 때문에 따로 저장한다.
   */
  const [requestOnlyOverdue, setRequestOnlyOverdue] = useState(false);
  const [statusOnlyOverdue, setStatusOnlyOverdue] = useState(false);

  /**
   * 검색창 입력값과 실제 검색 키워드를 분리한 이유
   *
   * - SearchInput: 사용자가 타이핑 중인 실시간 문자열
   * - Keyword: 검색 버튼/엔터를 눌러 실제 필터에 반영된 문자열
   *
   * 이렇게 나누면 한 글자 입력할 때마다 표 전체가 즉시 필터링되지 않아
   * 검색 UX를 더 안정적으로 제어할 수 있다.
   */
  const [requestSearchInput, setRequestSearchInput] = useState("");
  const [requestKeyword, setRequestKeyword] = useState("");
  const [statusSearchInput, setStatusSearchInput] = useState("");
  const [statusKeyword, setStatusKeyword] = useState("");

  /**
   * confirmState
   *
   * null이면 모달이 닫힌 상태,
   * 객체가 들어 있으면 해당 정보로 확인 모달을 띄운다.
   */
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);

  /**
   * 요청함 화면용 필터 결과
   *
   * useMemo를 쓰는 이유
   * - 관련 state가 바뀔 때만 다시 계산하고
   * - 렌더마다 불필요하게 filter를 반복하지 않기 위해서다.
   */
  const requestItems = useMemo(() => {
    return items.filter((item) => {
      const matchesOverdue = requestOnlyOverdue ? item.dateVariant === "overdue" : true;
      const keyword = requestKeyword.trim().toLowerCase();
      const matchesKeyword = keyword
        ? [item.title, item.publisher, item.userName, item.callNumber].some((value) =>
            value.toLowerCase().includes(keyword),
          )
        : true;

      return matchesOverdue && matchesKeyword;
    });
  }, [items, requestOnlyOverdue, requestKeyword]);

  /**
   * 상태 확인 화면용 필터 결과
   *
   * 이 화면은 approved === true 인 항목만 보여 준다는 점이 요청함과 가장 다르다.
   */
  const statusItems = useMemo(() => {
    return items.filter((item) => {
      if (!item.approved) return false;

      const matchesOverdue = statusOnlyOverdue ? item.dateVariant === "overdue" : true;
      const keyword = statusKeyword.trim().toLowerCase();
      const matchesKeyword = keyword
        ? [item.title, item.registrationNumber, item.userName, item.callNumber, item.publisher].some((value) =>
            value.toLowerCase().includes(keyword),
          )
        : true;

      return matchesOverdue && matchesKeyword;
    });
  }, [items, statusOnlyOverdue, statusKeyword]);

  /**
   * 현재 페이지에서 실제로 보여 줄 행만 잘라낸다.
   */
  const pagedRequestItems = useMemo(() => {
    return requestItems.slice(requestPage * PAGE_SIZE, requestPage * PAGE_SIZE + PAGE_SIZE);
  }, [requestItems, requestPage]);

  const pagedStatusItems = useMemo(() => {
    return statusItems.slice(statusPage * PAGE_SIZE, statusPage * PAGE_SIZE + PAGE_SIZE);
  }, [statusItems, statusPage]);

  /**
   * 테이블 컴포넌트가 기대하는 props 형태로 다시 매핑한다.
   *
   * 원본 데이터 타입과 화면용 props 타입을 분리해 두면
   * 나중에 컬럼 구성이 바뀌어도 변환 지점이 명확하다.
   */
  const requestTableItems: RequestItem[] = pagedRequestItems.map((item) => ({
    id: item.id,
    title: item.title,
    publisher: item.publisher,
    userName: item.userName,
    callNumber: item.callNumber,
    requestDate: item.requestDate,
    approved: item.approved,
  }));

  const statusTableItems: BookTableItem[] = pagedStatusItems.map((item) => ({
    id: item.id,
    title: item.title,
    code: item.registrationNumber,
    callNumber: item.callNumber,
    author: item.publisher,
    userName: item.userName,
    dateStatus: item.dueLabel,
    dateVariant: item.dateVariant,
    actionLabel: "반납",
  }));

  /**
   * 페이지 수는 최소 1 이상이 되게 보정한다.
   * 그래야 데이터가 0건이어도 Pagination UI가 깨지지 않는다.
   */
  const requestPageCount = Math.max(Math.ceil(requestItems.length / PAGE_SIZE), 1);
  const statusPageCount = Math.max(Math.ceil(statusItems.length / PAGE_SIZE), 1);

  /**
   * items를 바꿀 때 메모리 state와 localStorage를 함께 갱신하는 공통 헬퍼
   *
   * setItems만 호출하면 새로고침 시 사라지고,
   * localStorage만 바꾸면 현재 화면이 바로 갱신되지 않는다.
   * 그래서 두 저장소를 항상 같이 갱신한다.
   */
  const persistItems = (nextItems: AdminRentalItem[]) => {
    setItems(nextItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  };

  /**
   * 대여/반납 확정 처리
   *
   * 모달에서 최종 확인 버튼을 눌렀을 때 호출된다.
   * approved 값 하나만 바꾸면 요청함과 상태 확인 화면이 동시에 갱신된다.
   */
  const handleConfirm = (nextApproved: boolean, itemId: string) => {
    const nextItems = items.map((item) =>
      item.id === itemId ? { ...item, approved: nextApproved } : item,
    );

    persistItems(nextItems);

    /**
     * 대여 완료 직후에는 사용자가 결과를 바로 확인할 수 있게
     * 상태 확인 탭으로 이동한다.
     * 반납이면 다시 요청함 탭으로 돌린다.
     */
    const nextSection: AdminSection = nextApproved ? "status" : "request";
    localStorage.setItem(SECTION_KEY, nextSection);
    setActiveSection(nextSection);
    setConfirmState(null);
  };

  /**
   * 요청함에서 버튼 클릭 시 확인 모달 열기
   *
   * 현재 approved 상태를 보고 다음 상태를 계산하므로
   * 요청함 하나로 대여/반납 두 동작을 모두 처리할 수 있다.
   */
  const openRequestAction = (id: string) => {
    const item = items.find((target) => target.id === id);
    if (!item) return;

    const nextApproved = !item.approved;
    setConfirmState({
      itemId: item.id,
      title: nextApproved ? "대여하시겠습니까?" : "반납하시겠습니까?",
      message: `선택하신 책 '${item.title}'를 정말 ${nextApproved ? "대여" : "반납"}하시겠습니까?`,
      confirmLabel: nextApproved ? "대여" : "반납",
      nextApproved,
    });
  };

  /**
   * 상태 확인 화면에서 반납 모달 열기
   *
   * 이 화면은 이미 대여 중인 책만 보여 주므로
   * 항상 반납 확인 모달만 띄운다.
   */
  const openReturnAction = (id: string) => {
    const item = items.find((target) => target.id === id);
    if (!item) return;

    setConfirmState({
      itemId: item.id,
      title: "반납하시겠습니까?",
      message: `선택하신 책 '${item.title}'를 정말 반납하시겠습니까?`,
      confirmLabel: "반납",
      nextApproved: false,
    });
  };

  useEffect(() => {
    /**
     * 사용자가 현재 보고 있는 탭을 localStorage에 저장한다.
     * 새로고침 후에도 같은 섹션으로 복원하기 위해 필요하다.
     */
    localStorage.setItem(SECTION_KEY, activeSection);
  }, [activeSection]);

  return (
    <Wrapper>
      <SideBar activeSection={activeSection} onSelectSection={setActiveSection} />
      {activeSection === "request" ? (
        <RequestTable
          items={requestTableItems}
          checked={requestOnlyOverdue}
          searchValue={requestSearchInput}
          currentPage={requestPage}
          totalPages={requestPageCount}
          onToggle={() => {
            setRequestOnlyOverdue((prev) => !prev);
            setRequestPage(0);
          }}
          onSearchChange={setRequestSearchInput}
          onSearchSubmit={() => {
            setRequestKeyword(requestSearchInput);
            setRequestPage(0);
          }}
          onAction={openRequestAction}
          onPageChange={setRequestPage}
        />
      ) : (
        <BookTable
          items={statusTableItems}
          checked={statusOnlyOverdue}
          searchValue={statusSearchInput}
          currentPage={statusPage}
          totalPages={statusPageCount}
          onToggle={() => {
            setStatusOnlyOverdue((prev) => !prev);
            setStatusPage(0);
          }}
          onSearchChange={setStatusSearchInput}
          onSearchSubmit={() => {
            setStatusKeyword(statusSearchInput);
            setStatusPage(0);
          }}
          onAction={openReturnAction}
          onPageChange={setStatusPage}
        />
      )}
      {confirmState && (
        <Confirm
          title={confirmState.title}
          message={confirmState.message}
          confirmLabel={confirmState.confirmLabel}
          onClose={() => setConfirmState(null)}
          onConfirm={() => handleConfirm(confirmState.nextApproved, confirmState.itemId)}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  background: #fafafa;
`;

