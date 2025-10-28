import styled from "styled-components"

export const InputContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 860px;
  height: 70px;
  padding: 10px 20px;
  border: 1px solid #E7E7E7;
  background-color: #ffffff;
  border-radius: 100px;
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

type FirstInputBar = {
  first: boolean;
}