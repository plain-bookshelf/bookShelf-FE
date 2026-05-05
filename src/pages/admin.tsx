import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { SideBar, type AdminSection } from "../components/sideBar/sideBar";
import RequestTable, { type RequestItem } from "../components/requestManage/requestTable";
import BookTable, { type BookTableItem, type DateVariant } from "../components/bookManag/bookTable";
import Confirm from "../components/adminConfirm/confirm";

// 관리자 페이지는 "대여 요청함"과 "책 대여 상태 확인"을
// 하나의 상태 저장소(localStorage 기반 테스트 데이터)로 연결해서 보여 준다.
const STORAGE_KEY = "admin-rental-items";
const SECTION_KEY = "admin-active-section";
const PAGE_SIZE = 8;

// 두 화면이 같은 데이터를 공유하려면 요청 상태와 대여 상태를 모두 담을 공통 타입이 필요하다.
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

const TEST_ITEMS: AdminRentalItem[] = [
  { id: "req-1", title: "혼모노", publisher: "성해나 · 창비", userName: "리싸방", callNumber: "813.6", registrationNumber: "B-240101", requestDate: "12/23", dueLabel: "대여 14일 남음", dateVariant: "normal", approved: false },
  { id: "req-2", title: "가공범", publisher: "성해나 · 창비", userName: "일싸방", callNumber: "813.6", registrationNumber: "B-240102", requestDate: "12/23", dueLabel: "대여 8일 남음", dateVariant: "warning", approved: false },
  { id: "req-3", title: "편안함의 습격", publisher: "성해나 · 창비", userName: "민싸방", callNumber: "813.6", registrationNumber: "B-240103", requestDate: "12/23", dueLabel: "연체중", dateVariant: "overdue", approved: false },
  { id: "req-4", title: "다크 심리학", publisher: "성해나 · 창비", userName: "선싸방", callNumber: "813.6", registrationNumber: "B-240104", requestDate: "12/23", dueLabel: "대여 10일 남음", dateVariant: "normal", approved: true },
  { id: "req-5", title: "자몽살구클럽", publisher: "성해나 · 창비", userName: "지싸방", callNumber: "813.6", registrationNumber: "B-240105", requestDate: "12/23", dueLabel: "대여 5일 남음", dateVariant: "warning", approved: false },
  { id: "req-6", title: "모순", publisher: "성해나 · 창비", userName: "wjddlfnd", callNumber: "813.6", registrationNumber: "B-240106", requestDate: "12/23", dueLabel: "대여 12일 남음", dateVariant: "normal", approved: true },
  { id: "req-7", title: "소년이 온다", publisher: "한강 · 창비", userName: "wjddlfnd", callNumber: "813.6", registrationNumber: "B-240107", requestDate: "12/23", dueLabel: "대여 2일 남음", dateVariant: "warning", approved: false },
  { id: "req-8", title: "클린 코드", publisher: "로버트 C. 마틴", userName: "개발방", callNumber: "005.1", registrationNumber: "B-240108", requestDate: "12/23", dueLabel: "대여 16일 남음", dateVariant: "normal", approved: false },
];

// 모달은 클릭 순간의 아이템 정보와 다음 상태만 기억하면 되므로 별도 상태 타입으로 분리했다.
interface ConfirmState {
  itemId: string;
  title: string;
  message: string;
  confirmLabel: string;
  nextApproved: boolean;
}

function getStoredItems() {
  // 새로고침 후에도 버튼 상태를 유지하기 위해 localStorage 값을 우선 사용한다.
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

function getStoredSection(): AdminSection {
  // 마지막에 열려 있던 관리자 탭도 함께 기억해 재진입 경험을 자연스럽게 만든다.
  const stored = localStorage.getItem(SECTION_KEY);
  return stored === "status" ? "status" : "request";
}

export default function Admin() {
  const [activeSection, setActiveSection] = useState<AdminSection>(() => getStoredSection());
  const [items, setItems] = useState<AdminRentalItem[]>(() => getStoredItems());
  const [requestPage, setRequestPage] = useState(0);
  const [statusPage, setStatusPage] = useState(0);
  const [requestOnlyOverdue, setRequestOnlyOverdue] = useState(false);
  const [statusOnlyOverdue, setStatusOnlyOverdue] = useState(false);
  const [requestSearchInput, setRequestSearchInput] = useState("");
  const [requestKeyword, setRequestKeyword] = useState("");
  const [statusSearchInput, setStatusSearchInput] = useState("");
  const [statusKeyword, setStatusKeyword] = useState("");
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);

  // 요청함은 전체 데이터에서 검색 조건과 연체 필터만 반영한 목록이다.
  const requestItems = useMemo(() => {
    return items.filter((item) => {
      const matchesOverdue = requestOnlyOverdue ? item.dateVariant === "overdue" : true;
      const keyword = requestKeyword.trim().toLowerCase();
      const matchesKeyword = keyword
        ? [item.title, item.publisher, item.userName, item.callNumber].some((value) =>
            value.toLowerCase().includes(keyword)
          )
        : true;

      return matchesOverdue && matchesKeyword;
    });
  }, [items, requestOnlyOverdue, requestKeyword]);

  // 상태 확인 화면은 이미 승인된 항목만 따로 추려서 보여 준다.
  const statusItems = useMemo(() => {
    return items.filter((item) => {
      if (!item.approved) return false;

      const matchesOverdue = statusOnlyOverdue ? item.dateVariant === "overdue" : true;
      const keyword = statusKeyword.trim().toLowerCase();
      const matchesKeyword = keyword
        ? [item.title, item.registrationNumber, item.userName, item.callNumber, item.publisher].some((value) =>
            value.toLowerCase().includes(keyword)
          )
        : true;

      return matchesOverdue && matchesKeyword;
    });
  }, [items, statusOnlyOverdue, statusKeyword]);

  // 페이지네이션은 화면에 보일 조각만 잘라 주는 순수 계산이다.
  const pagedRequestItems = useMemo(() => {
    return requestItems.slice(requestPage * PAGE_SIZE, requestPage * PAGE_SIZE + PAGE_SIZE);
  }, [requestItems, requestPage]);

  const pagedStatusItems = useMemo(() => {
    return statusItems.slice(statusPage * PAGE_SIZE, statusPage * PAGE_SIZE + PAGE_SIZE);
  }, [statusItems, statusPage]);

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

  const requestPageCount = Math.max(Math.ceil(requestItems.length / PAGE_SIZE), 1);
  const statusPageCount = Math.max(Math.ceil(statusItems.length / PAGE_SIZE), 1);

  const persistItems = (nextItems: AdminRentalItem[]) => {
    // 상태 변경 직후 메모리와 localStorage를 동시에 갱신해야 새로고침에도 결과가 유지된다.
    setItems(nextItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  };

  const handleConfirm = (nextApproved: boolean, itemId: string) => {
    // 확인 모달에서 승인/반납을 확정하면 approved 값 하나만 바꿔도 두 화면이 함께 갱신된다.
    const nextItems = items.map((item) =>
      item.id === itemId ? { ...item, approved: nextApproved } : item
    );

    persistItems(nextItems);

    // 대여 후 새로고침하면 상태 확인 탭이 열리도록 현재 섹션도 함께 저장한다.
    const nextSection: AdminSection = nextApproved ? "status" : "request";
    localStorage.setItem(SECTION_KEY, nextSection);
    setActiveSection(nextSection);
  };

  const openRequestAction = (id: string) => {
    // 요청함에서는 현재 상태에 따라 "대여" 또는 "반납" 확인 문구를 동적으로 바꾼다.
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

  const openReturnAction = (id: string) => {
    // 상태 확인 화면은 이미 대여된 책만 다루므로 항상 반납 확인 모달만 띄운다.
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
    // 사용자가 사이드바에서 고른 탭을 기억해 새로고침 후에도 같은 화면으로 복원한다.
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
