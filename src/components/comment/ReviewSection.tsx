import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import * as S from '../bookDetail/style';
import type { Comment } from '../../types/bookTypes';
import userProfile  from '../../assets/userProfile.jpg';

// =========================================================
// 💡 백엔드와 통신하는 가상의 API 함수 (실제 구현 필요)
// =========================================================

// 1. 초기 좋아요 상태를 가져오는 API (컴포넌트 로드 시 호출)
const fetchInitialLikes = async (userId: string): Promise<(number | string)[]> => {
  console.log(`[API MOCK] 초기 좋아요 상태 로드: 사용자 ID ${userId}`);
  // 실제 구현: 서버에서 해당 사용자가 좋아요 누른 ID 목록을 가져옵니다.
  await new Promise(resolve => setTimeout(resolve, 300));
  return [1]; // 임시: ID 1번 댓글은 이미 좋아요 눌렀다고 가정
};

// 2. 좋아요 토글 요청을 보내는 API
const sendLikeToggleRequest = async (commentId: string | number, isCurrentlyLiked: boolean, currentClientLikes: number): Promise<{ newLikesCount: number, isLiked: boolean }> => {
  console.log(`[API MOCK] 좋아요 토글 요청: 댓글 ID ${commentId}`);
  
  // 실제 구현: 백엔드 엔드포인트에 요청을 보내고, 업데이트된 좋아요 수와 최종 상태를 받습니다.
  await new Promise(resolve => setTimeout(resolve, 500)); // 0.5초 딜레이 가정
  
  // 수정: 클라이언트가 전달한 현재 좋아요 수를 기준으로 최종 좋아요 수를 계산합니다.
  const finalLikesCount = isCurrentlyLiked ? currentClientLikes - 1 : currentClientLikes + 1;

  // Mock 응답을 위한 임시 로직입니다. 이 부분을 실제 API 호출 및 응답 처리로 대체해야 합니다.
  // 이전에 있던 static data 접근 로직을 모두 제거합니다.

  return { 
      // 계산된 finalLikesCount를 반환하여 클라이언트 예상 값(expectedLikesCount)과 일치시킵니다.
      newLikesCount: finalLikesCount, 
      isLiked: !isCurrentlyLiked
  };
};

// 3. 댓글 삭제 요청을 보내는 API
const sendDeleteRequest = async (commentId: string | number): Promise<void> => {
    console.log(`[API MOCK] 댓글 삭제 요청: 댓글 ID ${commentId}`);
    // 실제 구현: 서버 엔드포인트에 DELETE 요청을 보냅니다.
    await new Promise(resolve => setTimeout(resolve, 500)); // 0.5초 딜레이 가정
    // 성공 시 특별한 응답 데이터는 없다고 가정합니다.
};

const initialComments: Comment[] = [
  { id: 1, user: '독서광1', userId: 'currentUser1', text: '재미있게 읽었습니다. 작가의 상상력이 돋보이는 작품이네요.', date: new Date(Date.now() - 5 * 60 * 1000).toISOString(), profileImg: userProfile, likes: 55 },
  { id: 2, user: '북리뷰어', userId: 'currentUser1', text: '단편 하나하나가 충격적이었어요. 특히 회색 인간은 잊히지 않을 것 같습니다.', date: new Date(Date.now() - 5 * 60 * 1000).toISOString(), profileImg: userProfile, likes: 55 },
];  

const ReviewSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  // 좋아요를 누른 댓글의 ID를 저장하는 상태
  const [likedCommentIds, setLikedCommentIds] = useState<(number | string)[]>([]); 
  const currentUserId = 'User123'; //  실제로는 로그인된 사용자 ID를 사용해야 합니다.

  // 컴포넌트 마운트 시 초기 좋아요 상태 로드
  useEffect(() => {
    const loadInitialState = async () => {
      try {
        const initialLikedIds = await fetchInitialLikes(currentUserId);
        setLikedCommentIds(initialLikedIds);
      } catch (error) {
        console.error("초기 좋아요 상태 로드 실패:", error);
      }
    };
    loadInitialState();
  }, [currentUserId]);

  // 새 댓글 추가 핸들러
  const handleAddComment = (newText: string) => {
    if (!newText.trim()) return;

    const newComment: Comment = {
      id: Date.now(), // 임시 ID
      userId: currentUserId,
      user: 'GuestUser', 
      text: newText,
      date: new Date().toISOString(), 
      likes: 0,
    };

    setComments((prevComments) => [newComment, ...prevComments]); 
  };

  const handleToggleLike = async (commentId: string | number) => {
    // 1. 현재 상태 및 롤백 데이터 준비
    const isCurrentlyLiked = likedCommentIds.includes(commentId);
    const commentToUpdate = comments.find(c => c.id === commentId);
    if (!commentToUpdate) return;
    
    const oldLikesCount = commentToUpdate.likes;
    

    // 2. 낙관적 업데이트 (UI 즉시 반영)

    // 좋아요 ID 목록 즉시 업데이트
    setLikedCommentIds(prevIds => {
      if (isCurrentlyLiked) {
        return prevIds.filter(id => id !== commentId); // 좋아요 취소 (Rollback 기준)
      } else {
        return [...prevIds, commentId]; // 좋아요 등록 (Rollback 기준)
      }
    });

    // 댓글 목록 좋아요 수 즉시 업데이트
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          const newLikesCount = isCurrentlyLiked ? oldLikesCount - 1 : oldLikesCount + 1;
          return { ...comment, likes: newLikesCount };
        }
        return comment;
      })
    );
    

    // 3. 백엔드 API 호출 (비동기)

    try {
      const response = await sendLikeToggleRequest(commentId, isCurrentlyLiked, oldLikesCount);
      const { newLikesCount } = response;

      // 4. API 응답과 UI 상태 비교 및 최종 동기화 (예상치 못한 경우에만 실행)
      const expectedLikesCount = isCurrentlyLiked ? oldLikesCount - 1 : oldLikesCount + 1;

      // 4. API 응답과 UI 상태 비교 및 최종 동기화 (선택적)
      // 낙관적 업데이트 시에는 이 로직은 주로 서버에서 받은 최종 likesCount가 
      // 클라이언트가 예상한 값과 다를 때 (다른 유저의 좋아요가 동시에 들어온 경우) 사용
     if (newLikesCount !== expectedLikesCount) {
          console.warn("서버-클라이언트 좋아요 수 불일치 감지. 서버 값으로 강제 업데이트.");
          setComments(prevComments => 
              prevComments.map(comment => 
                  comment.id === commentId ? { ...comment, likes: newLikesCount } : comment
              )
          );
      }

    } catch (error) {
      console.error("좋아요 처리 중 오류 발생 - 롤백 실행:", error);
      alert("좋아요 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      

      // 5.  오류 시 롤백 (원래 상태로 복구) 

      // 좋아요 ID 목록 롤백
      setLikedCommentIds(prevIds => {
        if (isCurrentlyLiked) {
          return [...prevIds, commentId]; // 원래 좋아요 상태였으면 다시 추가
        } else {
          return prevIds.filter(id => id !== commentId); // 원래 좋아요 상태가 아니었으면 다시 제거
        }
      });

      // 댓글 목록 좋아요 수 롤백 (원래 수로 복구)
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId ? { ...comment, likes: oldLikesCount } : comment
        )
      );
    }
  };

  const onDeleteComment = async (commentId: string | number) => {
        if (!window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
            return;
        }

        const originalComments = comments;
        
        try {
            // 1. UI에서 즉시 제거 (낙관적 업데이트)
            setComments(prev => prev.filter(c => c.id !== commentId));
            
            // 2. 서버에 삭제 요청 전송
            await sendDeleteRequest(commentId);
            
            alert('댓글이 성공적으로 삭제되었습니다.');
            
            // 3. 좋아요 목록에서 제거 (선택 사항)
            setLikedCommentIds(prevIds => prevIds.filter(id => id !== commentId));

        } catch (error) {
            console.error("댓글 삭제 중 오류 발생 - 롤백 실행:", error);
            alert("댓글 삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
            
            // 4. 오류 시 롤백 (원래 상태로 복구)
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