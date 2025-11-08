import styled from "styled-components";

export const Title = styled.h1`
  margin: 0;
  font-size: 36px;
  font-weight: 600;
  color: black;
  margin: 0 0 80px 240px;
`

export const Container = styled.div`
  display: flex;
  gap: 110px;
  align-items: center;
  margin: 0 91px;
`

export const BookContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 48px;
  width: 1440px;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
`

export const Book = styled.div`
  box-sizing: border-box;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-wrap: wrap;
`

export const BookTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: black;
  white-space: pre-wrap;
`

export const Author = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #5D5D5D;
  flex-wrap: wrap;
`

export const CategoryBox = styled.div`
  box-sizing: border-box;
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CategoryFilter = styled.span`
  box-sizing: border-box;
  width: 91px;
  height: 27px;
  background-color: #F1F1F1;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 400px;
  color: #878787;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Category = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #5D5D5D;
  flex-wrap: wrap;
`

export const ScrollButton = styled.div`
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  background-color: #DBFFEF;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    cursor: pointer;
  }
`

export const RankBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ChangeRankBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`

export const ChangeRankText = styled.span<TextColor>`
  font-size: 18px;
  font-weight: 400;
  color: ${(props) => props.color};
`

export const LineContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const Line = styled.div`
  width: 1360px;
  height: 1px;
  background-color: #00C471;
  margin: 80px 0;
`

type TextColor={
  color: string;
}