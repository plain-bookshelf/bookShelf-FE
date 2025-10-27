import * as S from "./style";
import { BookNumber } from "../my/style";
import type { Book, PopularBook } from "../../types/Book";
import type { ReactNode } from "react";
import { useRef, useState, useEffect } from "react";
import scrollButton from "../../assets/scrollButton.png"
import rankUp from "../../assets/rankUp.png"
import rankDown from "../../assets/rankDown.png"
import rankUnchanged from "../../assets/rankUnchanged.png"

type Props = {
  searchTitle?: string
  BookListTitle: string;
  children: ReactNode;
}

export const BookList: React.FC<Props> = ({searchTitle, BookListTitle, children}) => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;

      setShowLeft(scrollLeft > 0);

      setShowRight(scrollLeft + clientWidth < scrollWidth);
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollLeft = () => {
    containerRef.current?.scrollBy({left: -500, behavior: "smooth"});
  }

  const scrollRight = () => {
    containerRef.current?.scrollBy({left: 500, behavior: "smooth"});
  }

  return(<>
    <S.Title><span style={{color: "#00C471"}}>{searchTitle}</span>{BookListTitle}</S.Title>
    <S.Container>
      {showLeft &&
        <S.ScrollButton onClick={scrollLeft}>
          <img src={scrollButton} style={{width: 15, height: 25, transform: 'rotate(180deg)'}}/>
        </S.ScrollButton>
      }
      {!showLeft && <div style={{width: "48px"}}></div>}
      <S.BookContainer ref={containerRef}>
        {children}
      </S.BookContainer>
      {showRight &&
        <S.ScrollButton onClick={scrollRight}>
          <img src={scrollButton} style={{width: 15, height: 25}}  />
        </S.ScrollButton>
      }
    </S.Container>
  </>)
}

export function Book({title, author, category, img}: Book) {
  return(<>
    <S.Book>
      <img src={img}/>
      <S.BookInfo>
        <S.BookTitle>{title}</S.BookTitle>
        <S.Author>{author}</S.Author>
        <S.CategoryBox>
          <S.CategoryFilter>카테고리 분류</S.CategoryFilter>
          <S.Category>{category}</S.Category>
        </S.CategoryBox>
      </S.BookInfo>
    </S.Book>
  </>)
}

export function Popular({title, author, category, nowRank, preRank, img}: PopularBook) {
  return(<>
    <S.Book>
      <img src={img}/>
      <S.RankBox>
        <BookNumber style={{margin: 0}}>{nowRank}</BookNumber>
        {preRank - nowRank > 0 && 
        <S.ChangeRankBox>
          <img src={rankUp}  style={{width: 20, height: 15}}/>
          <S.ChangeRankText color="#FF0000">{preRank - nowRank}</S.ChangeRankText>
        </S.ChangeRankBox>}
        {preRank - nowRank < 0 && 
        <S.ChangeRankBox>
          <img src={rankDown}  style={{width: 20, height: 15}}/>
          <S.ChangeRankText color="#314FB9">{Math.abs(preRank - nowRank)}</S.ChangeRankText>
        </S.ChangeRankBox>}
        {preRank - nowRank === 0 && 
          <img src={rankUnchanged}  style={{width: 15, height: 2}}/>
          }
      </S.RankBox>
      <S.BookInfo>
        <S.BookTitle>{title}</S.BookTitle>
        <S.Author>{author}</S.Author>
        <S.CategoryBox>
          <S.CategoryFilter>카테고리 분류</S.CategoryFilter>
          <S.Category>{category}</S.Category>
        </S.CategoryBox>
      </S.BookInfo>
    </S.Book>
  </>)
}