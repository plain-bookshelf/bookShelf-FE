import styled from 'styled-components';

export const ListWrapper = styled.div`
  padding: 10px 0;
`;

export const CommentItemWrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;

  &:last-child {
    border-bottom: none;
  }
`;

export const CommentItemContent = styled.div`
  width: 520px;
  display: flex;
  gap: 10px;
`

export const UserProfileContent = styled.div`
  width: 45px;
  height: 45px;
  flex-shrink: 0;
`

export const UserProfile = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
`

export const CommentTextContent = styled.div`
  width: 465px;
  display: flex;
  flex-direction: column;
`

export const CommentHeader = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
  font-size: 16px;
  color: #555;
`;

export const CommentUser = styled.span`
  font-weight: bold;
  color: #333;
`;

export const CommentText = styled.p`
  margin: 0;
  line-height: 1.3;
  color: #000000;
  font-weight: 400;
  font-size: 18px;
  white-space: pre-wrap;
`;

export const CommentBottomContent = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
`

export const LikeContent = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;


`

export const LikeButton = styled.div`
  width: 22px;
  height: 22px;
  
  cursor: pointer;

  display: flex;
  align-items: center;

  gap: 5px;

`

export const Like = styled.img<{ $isLiked: boolean }>`
  width: 22px;
  height: 22px;

  ${props => props.$isLiked && `
    filter: invert(47%) sepia(62%) saturate(415%) hue-rotate(90deg) brightness(97%) contrast(100%);
  `}
`

export const LikeNumber = styled.p`
  color: #5D5D5D;
  font-size: 15px;
`

export const DeleteButton = styled.button`
  height: 25px;
  width: 55px;
  margin-left: 25px;
  background: none;
  border: none;
  border-radius: 15px;
  color: #ff0000; 
  font-size: 15px;
  cursor: pointer;

  
  &:hover {

    background-color:   #ffe8e8;
  }
`
