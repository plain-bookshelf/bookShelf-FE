import React, { useState, useEffect } from 'react';
import CommentForm from './commentForm';
import CommentList from './commentList';
import * as S from '../bookDetail/style';
import { postCommentWrite, postCommentLike, deleteComment } from '../../api/commentApi';
import type { Comment } from '../../types/bookTypes';
import userProfile from '../../assets/userProfile.jpg';

interface ReviewSectionProps {
  bookId: number | string;
}

/** ✅ 초기 좋아요 상태를 가져오는 MOCK 함수 (나중에 실제 API로 교체) */
const fetchInitialLikes = async (userId: string): Promise<(number | string)[]> => {
  console.log(`[API MOCK] 초기 좋아요 상태 로드: 사용자 ID ${userId}`);
  await new Promise(resolve => setTimeout(resolve, 300));
  return [1]; // 임시: 1번 댓글은 좋아요한 상태라고 가정
};

/** ✅ 초기 댓글 MOCK (나중에 서버 조회로 교체 가능) */
const initialComments: Comment[] = [
  {
    id: 1,
    user: '독서광1',
    userId: 'currentUser1',
    text: '재미있게 읽었습니다. 작가의 상상력이 돋보이는 작품이네요.',
    date: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    profileImg: userProfile,
    likes: 55,
  },
  {
    id: 2,
    user: '북리뷰어',
    userId: 'currentUser1',
    text: '단편 하나하나가 충격적이었어요. 특히 회색 인간은 잊히지 않을 것 같습니다.',
    date: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    profileImg: userProfile,
    likes: 55,
  },
];

const ReviewSection: React.FC<ReviewSectionProps> = ({ bookId }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [likedCommentIds, setLikedCommentIds] = useState<(number | string)[]>([]);
  const currentUserId = 'User123'; // TODO: 실제 로그인 유저 ID와 연동

  // 🔹 컴포넌트 마운트 시, 해당 유저가 좋아요한 댓글 목록 로드
  useEffect(() => {
    const loadInitialState = async () => {
      try {
        const initialLikedIds = await fetchInitialLikes(currentUserId);
        setLikedCommentIds(initialLikedIds);
      } catch (error) {
        console.error('초기 좋아요 상태 로드 실패:', error);
      }
    };
    loadInitialState();
  }, [currentUserId]);

  // 🔹 댓글 작성
  const handleAddComment = async (newText: string) => {
    const trimmed = newText.trim();
    if (!trimmed) return;

    try {
      const res = await postCommentWrite(bookId, trimmed);
      console.log('댓글 작성 성공:', res);

      const newComment: Comment = {
        id: Date.now(),            // TODO: 실제 API에서 내려주는 commentId 사용
        userId: currentUserId,
        user: 'GuestUser',         // TODO: 실제 로그인 유저 닉네임
        text: trimmed,
        date: new Date().toISOString(),
        likes: 0,
        profileImg: userProfile,
      };

      setComments(prev => [newComment, ...prev]);
    } catch (e: any) {
      console.error('댓글 작성 실패:', e);
      alert(e.message || '댓글 작성 중 오류가 발생했습니다.');
    }
  };

  // 🔹 좋아요 토글
  const handleToggleLike = async (commentId: string | number) => {
    const isCurrentlyLiked = likedCommentIds.includes(commentId);
    const target = comments.find(c => c.id === commentId);
    if (!target) return;

    const oldLikes = target.likes;

    // 1️⃣ UI 낙관적 업데이트
    setLikedCommentIds(prev =>
      isCurrentlyLiked
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId],
    );

    setComments(prev =>
      prev.map(c =>
        c.id === commentId
          ? {
              ...c,
              likes: isCurrentlyLiked
                ? Math.max(0, c.likes - 1)
                : c.likes + 1,
            }
          : c,
      ),
    );

    // 2️⃣ 서버 요청
    try {
      const res = await postCommentLike(commentId);

      if (res.data !== true) {
        throw new Error('좋아요 처리 결과를 확인할 수 없습니다.');
      }
    } catch (e: any) {
      console.error('좋아요 요청 실패, 롤백:', e);
      alert(e.message || '좋아요 처리 중 오류가 발생했습니다.');

      // 3️⃣ 롤백
      setLikedCommentIds(prev =>
        isCurrentlyLiked
          ? [...prev, commentId]
          : prev.filter(id => id !== commentId),
      );

      setComments(prev =>
        prev.map(c =>
          c.id === commentId ? { ...c, likes: oldLikes } : c,
        ),
      );
    }
  };

  // 🔹 댓글 삭제
  const onDeleteComment = async (commentId: string | number) => {
    if (!window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) return;

    const originalComments = [...comments];

    try {
      // 1️⃣ UI에서 먼저 제거
      setComments(prev => prev.filter(c => c.id !== commentId));

      // 2️⃣ 서버 호출
      await deleteComment(commentId);

      alert('댓글이 성공적으로 삭제되었습니다.');

      // 3️⃣ 좋아요 목록에서도 제거
      setLikedCommentIds(prevIds => prevIds.filter(id => id !== commentId));
    } catch (e: any) {
      console.error('댓글 삭제 중 오류 발생 - 롤백:', e);
      alert(e.message || '댓글 삭제 중 오류가 발생했습니다.');

      // 4️⃣ 롤백
      setComments(originalComments);
    }
  };

  return (
    <S.CollectionContainer>
      <div style={{ width: '1440px', padding: '20px 0' }}>
        <CommentForm onAddComment={handleAddComment} />
        <S.Divider />
        <CommentList
          comments={comments}
          onToggleLike={handleToggleLike}
          likedCommentIds={likedCommentIds}
          onDeleteComment={onDeleteComment}
          currentUserId={currentUserId}
        />
      </div>
    </S.CollectionContainer>
  );
};

export default ReviewSection;