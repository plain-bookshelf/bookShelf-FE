import styled from "styled-components";


export const Button = styled.button`
  width: 100%;
  height: 52px;
  background-color: #88E788;
  color: #FFFFFF;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  font-size: 16px;

  transition: all 0.2s ease-in-out;
  

  &:hover{
    background-color: #75c375ff;
  }
  
  &:disabled{
    background-color: #9fe79fed;
    color: #FFFFFF;
    cursor: not-allowed;
  }
`
