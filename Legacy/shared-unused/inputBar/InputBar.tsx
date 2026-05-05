import { useState } from "react";
import type { Queryfunc } from "../../types/function";
import * as S from "./style";

interface InputBarProps extends Queryfunc {
  say?: boolean;
}

export default function InputBar({ handleSend, say }: InputBarProps) {
  const [query, setQuery] = useState("");

  const send = () => {
    if (say) {
      return;
    }

    handleSend?.(query);
    setQuery("");
  };

  return (
    <S.InputContainer>
      <S.Input
        placeholder="찾고 싶은 책을 입력해보세요"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !say) {
            send();
          }
        }}
      />
      {say ? (
        <img src={unSendButton} alt="sending disabled" style={{ width: 40, height: 40, cursor: "not-allowed" }} />
      ) : (
        <img src={sendButton} alt="send" onClick={send} style={{ width: 40, height: 40, cursor: "pointer" }} />
      )}
    </S.InputContainer>
  );
}


