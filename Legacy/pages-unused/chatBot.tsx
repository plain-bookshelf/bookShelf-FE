import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { postMessage } from "../api/chatBot";
import { FirstChat, MyChat, AIChat } from "../shared/chat/Chat";
import { useUser } from "../shared/contexts/UserContext";
import InputBar from "../shared/inputBar/InputBar";
import type { Chat } from "../types/Chat";

export default function ChatBot() {
  const { user } = useUser();
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [move, setMove] = useState(false);
  const [sayChat, setSayChat] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const send = async (content: string) => {
    if (!content.trim()) {
      alert("채팅 내용을 입력해주세요.");
      return;
    }

    if (chatList.length === 0) {
      setMove(true);
    }

    setChatList((prev) => [...prev, { who: "Me", content }]);
    setChatList((prev) => [...prev, { who: "AI", content: "", loading: true }]);
    setSayChat(true);

    try {
      const fullText = await postMessage(user.name, content);
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
            index += 1;
          } else {
            clearInterval(interval);
            resolve();
          }
        }, 35);
      });
    } catch (error) {
      console.error("챗봇 요청 실패", error);
    } finally {
      setSayChat(false);
    }
  };

  useEffect(() => {
    containerRef.current?.scrollBy({ top: 1000, behavior: "smooth" });
  }, [chatList]);

  return (
    <Container style={{ padding: "0 0 100px 0" }}>
      {!move && <FirstChat />}
      <ChatContainer ref={containerRef}>
        {chatList.map((chat, index) =>
          chat.who === "AI" ? (
            <AIChat key={`ai-${index}`} content={chat.content} loading={chat.loading} />
          ) : (
            <MyChat key={`me-${index}`} content={chat.content} />
          ),
        )}
      </ChatContainer>
      <InputBarWrapper move={move}>
        <InputBar handleSend={send} say={sayChat} />
      </InputBarWrapper>
    </Container>
  );
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
`;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 750px;
  margin: 80px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBarWrapper = styled.div<{ move: boolean }>`
  position: absolute;
  top: ${({ move }) => (move ? "780px" : "450px")};
  transition: top 0.2s ease;
`;

