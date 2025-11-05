import { FirstChat, MyChat, AIChat } from "../components/chat/Chat"
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import type { Chat } from "../types/Chat"
import InputBar from "../components/inputBar/InputBar";
import { useUser } from "../components/contexts/UserContext";
import { postMessage } from "../api/chatBot";

export default function ChatBot() {
  const { user } = useUser();
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [move, setMove] = useState(false);
  const [sayChat, setsayChat] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const send = async (content: string) => {
    console.log("요청 보냄 대기중");
    if(content === ""){
      alert("채팅을 입력해주세요");
      return;
    }

    if(chatList.length === 0){
      setMove(true);
    }

    setChatList(prev => [...prev, {who: "Me", content: content}]);
    setChatList((prev) => [...prev, { who: "AI", content: "" , loading: true}]);
    setsayChat(true);

    try {
      const fullText = await postMessage(user.id, content);

      const chars = fullText.split("");
      await new Promise<void>((resolve) => {
        let index = 0;
        const interval = setInterval(() => {
          if (index < chars.length) {
            const nextChar = chars[index];
            setChatList((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              updated[updated.length - 1] = {
                ...last,
                content: (last.content || "") + nextChar,
                loading: false,
              };
              return updated;
            });
            index++;
          } else {
            clearInterval(interval);
            resolve();
          }
        }, 35);
      });

      setsayChat(false);
    } catch (error) {
      console.error("에러 남", error);
      setsayChat(false);
    }
  };
  useEffect(() => {
    containerRef.current?.scrollBy({ top: 1000, behavior: "smooth" });
  }, [chatList]);

  //여기 리팩토링 시급함;;
  return(
      <Container style={{padding: "0 0 100px 0"}}>
        {!move && <FirstChat />}
        <ChatContainer ref={containerRef}>
          {chatList.map((e) => (
            e.who === "AI" 
              ? <AIChat content={e.content} loading={e.loading} />
              : <MyChat content={e.content} />
          ))}
        </ChatContainer>
        <InputBarWrapper move={move}>
          <InputBar handleSend={send} say={sayChat}/>
        </InputBarWrapper>
      </Container>
  )
}

const ChatContainer = styled.div`
  box-sizing: border-box;
  width: 860px;
  max-height: 540px;
  display: flex;
  flex-direction: column;
  gap: 35px;
  overflow-y: auto;
  overflow-x: hidden;
  white-space: nowrap;
  scrollbar-width: none;
`

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 750px;
  margin: 80px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputBarWrapper = styled.div<Move>`
  position: absolute;
  top: ${({ move }) => move ? "780px" : "450px"};
  transition: top 0.2s ease;
`

type Move = {
  move: boolean
}