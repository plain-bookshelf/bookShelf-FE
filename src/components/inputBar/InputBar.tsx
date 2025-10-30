import * as S from "./style"
import sendButton from "../../assets/sendButton.png"
import { useState } from "react"
import type { Queryfunc } from "../../types/function";

export default function InputBar({handleSend}: Queryfunc) {
  const [query, setQuery] = useState<string>("");

  function send() {
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
          if(e.key === "Enter"){
            send();
          }
        }}
      />
      <img src={sendButton} onClick={send} style={{width: 40, height: 40, cursor: "pointer"}} />
    </S.InputContainer>
  )
}