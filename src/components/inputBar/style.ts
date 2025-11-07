import styled from "styled-components"

export const InputContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 860px;
  height: 70px;
  padding: 10px 20px;
  border: 1px solid rgba(0, 196, 113, 0.6);
  background-color: #ffffff;
  border-radius: 100px;
  box-shadow: 0 0 5px 0 rgba(0, 196, 113, 0.25);
`

export const Input = styled.input`
  width: 800px;
  height: 100%;
  outline: none;
  border: none;
  font-size: 20px;
  font-weight: 500;
  color: black;
  &::placeholder{
    color: #ADADAD;
  }
`