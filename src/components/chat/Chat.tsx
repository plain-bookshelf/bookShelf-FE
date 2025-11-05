import * as S from "./style"
import chatBotProfile from "../..//assets/chatBotProfile.png"
import { bouncy } from 'ldrs'
bouncy.register();

export function FirstChat() {
  return(
    <S.firstContent>
      <S.firstMessage>지금 읽고 싶은 책, 같이 찾아볼까요?</S.firstMessage>
    </S.firstContent>
  )
}

export function MyChat({content}: {content: string}) {
  return(
    <S.ChatBox $AI={false}>
      <S.Chat $AI={false}>{content}</S.Chat>
    </S.ChatBox>
  )
}

export function AIChat({ content, loading }: { content: string; loading?: boolean }) {
  return(
    <S.ChatBox $AI={true}>
      <S.AIChatContainer>
        <img src={chatBotProfile} />
        <S.AIChatContent>
          <S.AIName>마루</S.AIName>
          <S.Chat $AI={true} style={{backgroundColor: "white"}}>
            {loading ? (
              <l-bouncy
                size="40"
                speed="2.0" 
                color="#00C471" 
              ></l-bouncy>
            ) : (
              content
            )}
          </S.Chat>
        </S.AIChatContent>
      </S.AIChatContainer>
    </S.ChatBox>
  )
}