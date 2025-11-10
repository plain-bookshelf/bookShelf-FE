import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  width: 600px;
  height: 366px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 42px;
  background-color: #ffffff;
  border-radius: 12px;
`

export const ModalTitle = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: black;
`

export const ModalContent = styled.span`
  font-size: 20px;
  font-weight: 400;
  color: black;
`

export const ButtonBox = styled.div`
  display: flex;
  gap: 16px;
`

//버튼 따로 따로 만들어 둘 건데 나중에 리팩토링 할 때 하나로 합치고 props 받는 식으로 고쳐야 함
export const NoButton = styled.button`
  font-size: 24px;
  font-weight: 400;
  width: 161px;
  height: 53px;
  border-radius: 12px;
  background-color: #E7E7E7;
  color: black;
  border: none;
  cursor: pointer;
`

export const YesButton = styled(NoButton)`
  background-color: #FF0000;
  color: #ffffff;
`

export const OkButton = styled(NoButton)`
  background-color: #00C471;
  color: #ffffff;
`