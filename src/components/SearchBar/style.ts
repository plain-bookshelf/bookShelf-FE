import styled from "styled-components";

export const SearchContainer = styled.div<{ $active: boolean }>`
  box-sizing: border-box;
  width: 1440px;
  height: 55px;
  border: 2px solid
    ${({ $active }) => ($active ? "black" : "#d5d5d5")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  padding: 16px 30px;
  &:focus-within{
    border-color: black;
    color: black;
  }
`

export const SearchBar = styled.input`
  box-sizing: border-box;
  width: 1200px;
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
  display: flex;
  justify-content: center;
`