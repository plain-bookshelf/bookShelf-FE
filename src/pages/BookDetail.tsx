import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import BookInfoSection from '../components/bookDetail/bookInfoSection';
import CollectionTable from '../components/bookDetail/collectionTable';
import * as S from '../components/bookDetail/style';
import type { BookDetailData } from '../types/bookTypes';
import ReviewSection from '../components/comment/ReviewSection';
import { getBookDetail } from '../api/bookDetail';
import { requestBookRentalSafe, requestBookReservation } from '../api/bookApi';
import { getAccessToken } from '../utils/tokenService';

export default function BookDetail() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<BookDetailData | null>(null);
  const [activeTab, setActiveTab] =
    useState<'collection' | 'review'>('collection');
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 📌 상세 정보 로딩
  useEffect(() => {
    const load = async () => {
      if (!bookId) {
        setError('잘못된 접근입니다.');
        setIsLoading(false);
        return;
      }

      try {
        const data = await getBookDetail(bookId);
        console.log(data);
        setBook(data);
      } catch (e: any) {
        //✅ 백엔드가 NO_TOKEN / UNAUTHORIZED 주면 로그인 요구
        if (e.message === 'NO_TOKEN' || e.message === 'UNAUTHORIZED') {
          alert('로그인 후 이용 가능한 서비스입니다.');
          navigate('/login');
          return;
        }

        if (e.message === 'NOT_FOUND') {
          setError('존재하지 않는 도서입니다.');
        } else {
          setError('도서 정보를 불러오는 중 오류가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [bookId, navigate]);

  // 📌 대출 / 예약 액션
  const handleAction = async (
    action: 'loan' | 'reserve',
    itemId: string,
  ): Promise<void> => {
    if (!book || actionLoading) return;

    // ✅ 여기서도 sessionStorage 직접 보지 말고 tokenService 사용
    const token = getAccessToken();
    if (!token) {
      alert('로그인 후 이용 가능한 서비스입니다.');
      navigate('/login');
      return;
    }

    if (action === 'loan') {
      try {
        setActionLoading(true);

        const res = await requestBookRentalSafe(book.bookId);

        setBook((prev) =>
          !prev
            ? prev
            : {
                ...prev,
                collection: prev.collection.map((item) =>
                  item.id === itemId
                    ? { ...item, status: '대출중' }
                    : item,
                ),
              },
        );

        alert(res.message || '성공적으로 대출되었습니다.');
      } catch (e: any) {
        alert(e.message || '도서 대여 요청 중 오류가 발생했습니다.');
      } finally {
        setActionLoading(false);
      }
    }

    if (action === 'reserve') {
      try {
        setActionLoading(true);

        const res = await requestBookReservation(itemId);

        setBook((prev) =>
          prev
            ? {
                ...prev,
                collection: prev.collection.map((item) =>
                  item.id === itemId
                    ? { ...item, status: '예약중' }
                    : item,
                ),
              }
            : prev,
        );

        alert(res.message || '도서 예약이 완료되었습니다.');
      } catch (e: any) {
        alert(e.message || '도서 예약 요청 중 오류가 발생했습니다.');
      } finally {
        setActionLoading(false);
      }
    }
  };

  if (isLoading) return <div>도서 정보를 불러오는 중입니다...</div>;
  if (error || !book) return <div>{error ?? '도서 정보를 찾을 수 없습니다.'}</div>;

  return (
    <S.DetailPageWrapper>
      <BookInfoSection book={book} />
      <S.Divider />

      <S.TabContainer>
        <S.DetailTabs>
          <S.TabButton
            $isActive={activeTab === 'collection'}
            onClick={() => setActiveTab('collection')}
          >
            소장정보
          </S.TabButton>
          <S.TabButton
            $isActive={activeTab === 'review'}
            onClick={() => setActiveTab('review')}
          >
            리뷰
          </S.TabButton>
        </S.DetailTabs>
      </S.TabContainer>

      {activeTab === 'collection' && (
        <CollectionTable items={book.collection} onAction={handleAction} />
      )}

      {activeTab === 'review' && (
        <ReviewSection bookId={book.bookId} />
      )}
    </S.DetailPageWrapper>
  );
}