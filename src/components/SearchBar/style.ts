import styled from "styled-components";

export const SearchContainer = styled.div<{ $active: boolean } & State>`
  box-sizing: border-box;
  width: ${({state}) => state === "book" ? "1440px" : "1118px"};
  height: 64px;
  border: 2px solid
    ${({ $active }) => ($active ? "black" : "#d5d5d5")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  padding: 17px 30px;
  margin-bottom: 40px;
  &:focus-within{
    border-color: black;
    color: black;
  }
`

export const SearchBar = styled.input`
  box-sizing: border-box;
  width: 100%;
  color: black;
  border: none;
  outline: none;
  font-size: 20px;
  font-weight: 400;
  &::placeholder{
    color: #7D7D7D;
  }
`

export const SearchButton = styled.div`
  &:hover{
    cursor: pointer;
  }
`

export const Container = styled.div`
  width: 1920px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`

export const Title = styled.h1`
  margin: 0;
  font-size: 36px;
  font-weight: 600;
  color: black;
  margin: 0 0 75px 240px;
`

type State = {
  state: "book" | "user"
}