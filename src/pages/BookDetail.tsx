import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { requestBookRental, reserveBook } from "../api/bookApi";
import { getBookDetail } from "../api/bookDetail";
import BookInfoSection from "../shared/bookDetail/bookInfoSection";
import CollectionTable from "../shared/bookDetail/collectionTable";
import * as S from "../shared/bookDetail/style";
import ReviewSection from "../shared/comment/ReviewSection";
import type { BookDetailData } from "../types/bookTypes";
import { getAccessToken } from "../utils/tokenService";

export default function BookDetail() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookDetailData | null>(null);
  const [activeTab, setActiveTab] = useState<"collection" | "review">("collection");
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef(false);

  const refetchDetail = useCallback(async () => {
    if (!bookId || fetchingRef.current) {
      return;
    }

    fetchingRef.current = true;

    try {
      const data = await getBookDetail(bookId);
      setBook(data);
      setError(null);
    } catch (fetchError: unknown) {
      const message = fetchError instanceof Error ? fetchError.message : String(fetchError);

      if (message === "NO_TOKEN" || message === "UNAUTHORIZED") {
        alert("로그인 후 이용 가능한 서비스입니다.");
        navigate("/login");
        return;
      }

      setError(message === "NOT_FOUND" ? "존재하지 않는 도서입니다." : "도서 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      fetchingRef.current = false;
    }
  }, [bookId, navigate]);

  useEffect(() => {
    if (!bookId) {
      setError("잘못된 접근입니다.");
      setIsLoading(false);
      return;
    }

    (async () => {
      await refetchDetail();
      setIsLoading(false);
    })();
  }, [bookId, refetchDetail]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        refetchDetail();
      }
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [refetchDetail]);

  useEffect(() => {
    const onVisible = () => {
      if (!document.hidden) {
        refetchDetail();
      }
    };

    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [refetchDetail]);

  const handleAction = async (action: "loan" | "reserve", itemId: string): Promise<void> => {
    if (!book || actionLoading) {
      return;
    }

    const token = getAccessToken();
    if (!token) {
      alert("로그인 후 이용 가능한 서비스입니다.");
      navigate("/login");
      return;
    }

    if (!itemId.trim()) {
      alert("등록번호가 올바르지 않습니다.");
      return;
    }

    try {
      setActionLoading(true);

      if (action === "loan") {
        const response = await requestBookRental(itemId);
        await refetchDetail();
        alert(response.message || "성공적으로 대여되었습니다.");
      } else {
        const response = await reserveBook(itemId);
        await refetchDetail();
        alert(response.message || "성공적으로 예약되었습니다.");
      }
    } catch (actionError: unknown) {
      await refetchDetail().catch(() => undefined);
      alert(actionError instanceof Error ? actionError.message : "요청 처리 중 오류가 발생했습니다.");
    } finally {
      setActionLoading(false);
    }
  };

  if (isLoading) return <div>도서 정보를 불러오는 중입니다...</div>;
  if (error || !book) return <div>{error ?? "도서 정보를 찾을 수 없습니다."}</div>;

  return (
    <S.DetailPageWrapper>
      <BookInfoSection book={book} />
      <S.Divider />

      <S.TabContainer>
        <S.DetailTabs>
          <S.TabButton $isActive={activeTab === "collection"} onClick={() => setActiveTab("collection")}>
            소장정보
          </S.TabButton>
          <S.TabButton $isActive={activeTab === "review"} onClick={() => setActiveTab("review")}>
            리뷰
          </S.TabButton>
        </S.DetailTabs>
      </S.TabContainer>

      {activeTab === "collection" && (
        <CollectionTable items={book.collection} onAction={handleAction} actionLoading={actionLoading} />
      )}

      {activeTab === "review" && <ReviewSection bookId={book.bookId} />}
    </S.DetailPageWrapper>
  );
}

