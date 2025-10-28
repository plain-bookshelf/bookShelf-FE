import { FirstChat, MyChat, AIChat } from "../components/chat/Chat"
import { useState } from "react";
import styled from "styled-components";
import type { Chat } from "../types/Chat"
import InputBar from "../components/inputBar/InputBar";

export default function ChatBot() {
  const [chatList, setChatList] = useState<Chat[]>([]);

  function temp(content: string){
    if(content === ""){
      alert("채팅을 입력해주세요");
      return;
    }
    setChatList([...chatList, {who: "Me", content: content}])
  }

  //여기 리팩토링 시급함;;
  return(
    <div style={{display: "flex", justifyContent: "center"}}>
      {chatList.length !== 0 ? <Container style={{padding: "0 0 100px 0"}}>
        <div style={{display: "flex", flexDirection:"column", gap: 35}}>
          {chatList.map((e) => (
            e.who === "AI" ? <AIChat content={e.content} /> : <MyChat content={e.content} />
          ))}
        </div>
        <div style={{marginTop: 80}}>
        <InputBar handleSend={temp} />
        </div>
      </Container>
      : <Container style={{height: 630, overflow: "hidden"}}>
          <FirstChat handleSend={temp} />
        </Container>}
    </div>
  )
}

const Container = styled.div`
  box-sizing: border-box;
  width: 860px;
  height: 750px;
  margin: 80px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  overflow-x: hidden;
  white-space: nowrap;
  scrollbar-width: none;
`