import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { SideBar, type AdminSection } from "../shared/sideBar/sideBar";
import RequestTable, { type RequestItem } from "../features/bookManag/requestManage/requestTable";
import BookTable, { type BookTableItem, type DateVariant } from "../features/bookManag/bookTable";
import Confirm from "../features/bookManag/adminConfirm/confirm";
import {
  connectRequestCheckStream,
  getRentalStatusPage,
  patchBookReturn,
  patchRentalAllow,
  searchRentalStatusPage,
  type RentalRequestStreamItem,
  type RentalStatusApiItem,
} from "../api/manage";

const SECTION_KEY = "admin-active-section";
const PAGE_SIZE = 8;
const STATUS_FETCH_SIZE = 100;

interface RequestAdminItem {
  id: string;
  bookDetailId: number;
  title: string;
  publisher: string;
  userName: string;
  callNumber: string;
  requestDate: string;
  approved: boolean;
}

interface StatusAdminItem {
  id: string;
  bookDetailId: number;
  bookAffiliationId?: number;
  title: string;
  registrationNumber: string;
  callNumber: string;
  publisher: string;
  userName: string;
  dueLabel: string;
  dateVariant: DateVariant;
}

interface ConfirmState {
  itemId: string;
  title: string;
  message: string;
  confirmLabel: string;
  action: "approve" | "return";
}

function getStoredSection(): AdminSection {
  const stored = localStorage.getItem(SECTION_KEY);
  return stored === "status" ? "status" : "request";
}

function formatDateLabel(returnDate: string, isOverdue: boolean) {
  if (!returnDate) {
    return isOverdue ? "연체중" : "-";
  }

  if (isOverdue) {
    return `연체중 (${returnDate})`;
  }

  return returnDate;
}

function getDateVariant(returnDate: string, isOverdue: boolean): DateVariant {
  if (isOverdue) return "overdue";
  if (!returnDate) return "normal";

  const dueTime = new Date(`${returnDate}T00:00:00`).getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((dueTime - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 3) return "warning";
  return "normal";
}

function mapRequestItem(item: RentalRequestStreamItem): RequestAdminItem {
  return {
    id: String(item.book_detail_id),
    bookDetailId: item.book_detail_id,
    title: item.title,
    publisher: "-",
    userName: item.nick_name,
    callNumber: item.call_number,
    requestDate: "-",
    approved: false,
  };
}

function mapStatusItem(item: RentalStatusApiItem): StatusAdminItem {
  return {
    id: String(item.book_affiliation_id ?? item.book_detail_id),
    bookDetailId: item.book_detail_id,
    bookAffiliationId: item.book_affiliation_id,
    title: item.title,
    registrationNumber: item.registration_number ?? "-",
    callNumber: item.call_number,
    publisher: item.publisher,
    userName: item.nickname,
    dueLabel: formatDateLabel(item.return_date, item.is_overdue),
    dateVariant: getDateVariant(item.return_date, item.is_overdue),
  };
}

async function collectStatusItems(keyword: string) {
  const trimmedKeyword = keyword.trim();
  let page = 0;
  let isLastPage = false;
  const collected: StatusAdminItem[] = [];

  while (!isLastPage) {
    const data = trimmedKeyword
      ? await searchRentalStatusPage(page, STATUS_FETCH_SIZE, trimmedKeyword)
      : await getRentalStatusPage(page, STATUS_FETCH_SIZE);

    collected.push(...data.content.map(mapStatusItem));
    isLastPage = data.is_last_page;
    page += 1;
  }

  return collected;
}

export default function Admin() {
  const [activeSection, setActiveSection] = useState<AdminSection>(() => getStoredSection());
  const [requestItems, setRequestItems] = useState<RequestAdminItem[]>([]);
  const [statusItems, setStatusItems] = useState<StatusAdminItem[]>([]);
  const [requestPage, setRequestPage] = useState(0);
  const [statusPage, setStatusPage] = useState(0);
  const [requestOnlyOverdue, setRequestOnlyOverdue] = useState(false);
  const [statusOnlyOverdue, setStatusOnlyOverdue] = useState(false);
  const [requestSearchInput, setRequestSearchInput] = useState("");
  const [requestKeyword, setRequestKeyword] = useState("");
  const [statusSearchInput, setStatusSearchInput] = useState("");
  const [statusKeyword, setStatusKeyword] = useState("");
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);
  const [requestError, setRequestError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);
  const [requestConnected, setRequestConnected] = useState(false);
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(SECTION_KEY, activeSection);
  }, [activeSection]);

  useEffect(() => {
    const controller = new AbortController();

    setRequestError("");
    setRequestConnected(false);

    connectRequestCheckStream({
      signal: controller.signal,
      onSnapshot: (requests) => {
        setRequestConnected(true);
        setRequestItems(requests.map(mapRequestItem));
        setRequestPage(0);
      },
      onError: (error) => {
        setRequestError(error.message);
      },
    }).catch((error) => {
      if (controller.signal.aborted) return;
      setRequestError(error instanceof Error ? error.message : "대여 요청 스트림 연결에 실패했습니다.");
    });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadStatus = async () => {
      setStatusLoading(true);
      setStatusError("");

      try {
        const items = await collectStatusItems(statusKeyword);
        if (!cancelled) {
          setStatusItems(items);
          setStatusPage(0);
        }
      } catch (error) {
        if (!cancelled) {
          setStatusError(error instanceof Error ? error.message : "대여 상태 조회에 실패했습니다.");
        }
      } finally {
        if (!cancelled) {
          setStatusLoading(false);
        }
      }
    };

    void loadStatus();

    return () => {
      cancelled = true;
    };
  }, [statusKeyword]);

  const filteredRequestItems = useMemo(() => {
    const keyword = requestKeyword.trim().toLowerCase();

    return requestItems.filter((item) => {
      const matchesKeyword = keyword
        ? [item.title, item.publisher, item.userName, item.callNumber].some((value) =>
            value.toLowerCase().includes(keyword),
          )
        : true;
      return matchesKeyword;
    });
  }, [requestItems, requestKeyword]);

  const filteredStatusItems = useMemo(() => {
    return statusItems.filter((item) => {
      if (statusOnlyOverdue && item.dateVariant !== "overdue") {
        return false;
      }

      return true;
    });
  }, [statusItems, statusOnlyOverdue]);

  const pagedRequestItems = useMemo(() => {
    return filteredRequestItems.slice(requestPage * PAGE_SIZE, requestPage * PAGE_SIZE + PAGE_SIZE);
  }, [filteredRequestItems, requestPage]);

  const pagedStatusItems = useMemo(() => {
    return filteredStatusItems.slice(statusPage * PAGE_SIZE, statusPage * PAGE_SIZE + PAGE_SIZE);
  }, [filteredStatusItems, statusPage]);

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

  const requestPageCount = Math.max(Math.ceil(filteredRequestItems.length / PAGE_SIZE), 1);
  const statusPageCount = Math.max(Math.ceil(filteredStatusItems.length / PAGE_SIZE), 1);

  const handleApprove = async (itemId: string) => {
    const target = requestItems.find((item) => item.id === itemId);
    if (!target) return;

    setSubmittingId(itemId);

    try {
      await patchRentalAllow(target.bookDetailId);
      setConfirmState(null);
      setRequestItems((prev) => prev.filter((item) => item.id !== itemId));
      const refreshedStatusItems = await collectStatusItems(statusKeyword);
      setStatusItems(refreshedStatusItems);
      setActiveSection("status");
      setStatusPage(0);
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : "대여 승인 처리에 실패했습니다.");
    } finally {
      setSubmittingId(null);
    }
  };

  const handleReturn = async (itemId: string) => {
    const target = statusItems.find((item) => item.id === itemId);
    if (!target) return;

    setSubmittingId(itemId);

    try {
      await patchBookReturn(target.bookAffiliationId ?? target.bookDetailId);
      setConfirmState(null);
      setStatusItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      setStatusError(error instanceof Error ? error.message : "반납 처리에 실패했습니다.");
    } finally {
      setSubmittingId(null);
    }
  };

  const handleConfirm = async () => {
    if (!confirmState || submittingId) return;

    if (confirmState.action === "approve") {
      await handleApprove(confirmState.itemId);
      return;
    }

    await handleReturn(confirmState.itemId);
  };

  const openRequestAction = (id: string) => {
    const item = requestItems.find((target) => target.id === id);
    if (!item) return;

    setConfirmState({
      itemId: item.id,
      title: "대여 승인하시겠습니까?",
      message: `선택한 도서 '${item.title}'의 대여 요청을 승인하시겠습니까?`,
      confirmLabel: "승인",
      action: "approve",
    });
  };

  const openReturnAction = (id: string) => {
    const item = statusItems.find((target) => target.id === id);
    if (!item) return;

    setConfirmState({
      itemId: item.id,
      title: "반납 처리하시겠습니까?",
      message: `선택한 도서 '${item.title}'를 반납 처리하시겠습니까?`,
      confirmLabel: "반납",
      action: "return",
    });
  };

  return (
    <Wrapper>
      <SideBar activeSection={activeSection} onSelectSection={setActiveSection} />
      <ContentArea>
        {!requestConnected && !requestError ? (
          <StatusBanner>대여 요청 스트림에 연결 중입니다.</StatusBanner>
        ) : null}
        {requestError ? <ErrorBanner>대여 요청 조회 오류: {requestError}</ErrorBanner> : null}
        {statusError ? <ErrorBanner>대여 상태 조회 오류: {statusError}</ErrorBanner> : null}
        {statusLoading && activeSection === "status" ? (
          <StatusBanner>대여 상태 목록을 불러오는 중입니다.</StatusBanner>
        ) : null}

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
      </ContentArea>
      {confirmState && (
        <Confirm
          title={confirmState.title}
          message={confirmState.message}
          confirmLabel={confirmState.confirmLabel}
          onClose={() => setConfirmState(null)}
          onConfirm={() => {
            void handleConfirm();
          }}
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

const ContentArea = styled.div`
  flex: 1;
  min-width: 0;
`;

const BannerBase = styled.div`
  margin: 20px 24px 0;
  border-radius: 14px;
  padding: 14px 18px;
  font-size: 14px;
  font-weight: 600;
`;

const StatusBanner = styled(BannerBase)`
  color: #6f4e18;
  background: #fff3d6;
  border: 1px solid #f3d18b;
`;

const ErrorBanner = styled(BannerBase)`
  color: #9b2525;
  background: #ffe3e3;
  border: 1px solid #ffb4b4;
`;
