import React from 'react';
import * as S from './bookDetailStyle';
import { type BookDetailData } from '../../types/bookTypes';

interface BookInfoProps {
  book: BookDetailData;
}

const BookInfoSection: React.FC<BookInfoProps> = ({ book }) => {
  // 메타데이터 표시를 위해 첫 번째 소장 아이템의 학교/청구기호 사용
  const mainCopy = book.collection[0];
  const mainCallNumber = mainCopy?.callNumber || 'N/A';
  const mainLibrary = mainCopy?.library || 'N/A';
  
  return (
    <S.InfoSection>
      {/* 1. 표지 및 제목 */}
      <S.BookCoverArea>
        <S.BookCover src={book.coverImage} alt={`${book.title} 표지`} />
      </S.BookCoverArea>
      
      {/* 2. 메타데이터 */}
      <S.BookMetadata>
        <S.BookTitle>{book.title}</S.BookTitle>
        <p>
          저자: {book.author} | 
          출판사: {book.publisher} | 
          출판년도: {book.pubYear} | 
          소장학교:
        </p>
        <p>
          {mainLibrary} |
          청구기호: {mainCallNumber} | 
          소장처: 도서관
        </p>
        <p>
          등록번호: {book.registrationId} | 
          발매일: {book.releaseDate}
        </p>
        
        <S.Categories>
          <S.CategoryLabel>카테고리 분류</S.CategoryLabel>
          {book.categories.map((cat, index) => (
            <S.CategoryItem key={index}>
              {cat}
            </S.CategoryItem>
          ))}
        </S.Categories>
      </S.BookMetadata>
      
      {/* 3. 요약 */}
      <S.BookSummary>
        <S.BookSummaryTextContent>
          {book.summary}
        </S.BookSummaryTextContent>
      </S.BookSummary>
    </S.InfoSection>
  );
};

export default BookInfoSection;