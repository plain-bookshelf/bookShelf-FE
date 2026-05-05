import styled from "styled-components";

export const firstContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
  margin: 170px 0 35px 0;
`

export const firstMessage = styled.span`
  font-size: 33px;
  font-weight: 400;
  color: black;
`

export const AIChatContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`

export const AIChatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const AIName = styled.span`
  font-size: 23px;
  font-weight: 500;
  color: black;
`

export const ChatBox = styled.div<WhoChat>`
  width: 100%;
  display: flex;
  justify-content: ${({$AI}) => $AI ? "flex-start" : "flex-end"};
`

export const Chat = styled.span<WhoChat>`
  background-color: ${({$AI}) => $AI ? "#EEEEEE" : "#00C471"};
  color: ${({$AI}) => $AI ? "black" : "white"};
  font-size: 20px;
  max-width: 100%;
  white-space: normal;
  font-weight: 500;
  border-radius: 30px;
  padding: 16px 20px;
  line-height: 1.9;
`

type WhoChat = {
  $AI: boolean;
}