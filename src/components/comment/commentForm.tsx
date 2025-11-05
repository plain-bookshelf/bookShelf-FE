import React, { useState } from 'react';
import * as S from "./commentFormStyle";

interface CommentFormProps {
  onAddComment: (text: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddComment(commentText);
    setCommentText('');
  };
// 임시로 막아둔 코드 기능
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     // 조건: 눌린 키가 'Enter'이라면
//     if (e.key === 'Enter') { 
//         // 코드 블록: 위의 조건이 참일 경우에만 실행
//         e.preventDefault(); // 폼 제출을 막아 줄바꿈만 가능하게 함
//     }
//     // ...
// };


  return (
    <S.FormWrapper>
      <S.FormContainer>
      <h3>댓글 쓰기</h3>
      <form onSubmit={handleSubmit}>
        <S.CommentTextArea
          placeholder="댓글를 작성해 주세요..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <S.SubmitButtonContent>
          <S.SubmitButton type="submit">작성</S.SubmitButton>
        </S.SubmitButtonContent>
      </form>
      </S.FormContainer>
    </S.FormWrapper>
  );
};

export default CommentForm;