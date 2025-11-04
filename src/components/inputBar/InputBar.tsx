import * as S from "./style"
import sendButton from "../../assets/sendButton.png"
import unSendButton from "../../assets/unSendButton.png"
import { useState } from "react"
import type { Queryfunc } from "../../types/function";

interface InputBarProps extends Queryfunc {
  say?: boolean;  // ← 추가
}

export default function InputBar({handleSend, say}: InputBarProps) {
  const [query, setQuery] = useState<string>("");

  function send() {
    if(say){
      return;
    }
    handleSend?.(query);
    setQuery("");
  }

  return(
    <S.InputContainer>
      <S.Input
        placeholder="원하는 책을 찾으세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        title="sadasd"
        onKeyDown={(e) => {
          if(e.key === "Enter" && !say){
            send();
          }
        }}
      />
      {say ? <img src={unSendButton} style={{width: 40, height: 40, cursor: "not-allowed"}} /> : <img src={sendButton} onClick={send} style={{width: 40, height: 40, cursor: "pointer"}} />}
    </S.InputContainer>
  )
}