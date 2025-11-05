import search from "../../assets/search.png"
import { useState } from "react"
import * as S from "./style"
import type { Queryfunc } from "../../types/function";

export default function SearchBar({handleSearch}: Queryfunc) {
  const [query, setQuery] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  return(<>
    <S.Container>
      <S.SearchContainer $active={focused || query.length > 0}>
        <S.SearchBar
          placeholder="검색어를 입력해주세요"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if(e.key === "Enter"){
              handleSearch?.(query);
            }
          }}
        />
        <S.SearchButton onClick={() => handleSearch?.(query)}>
          <img src={search} style={{width: 26, height: 26}}/>
        </S.SearchButton>
      </S.SearchContainer>
    </S.Container>
  </>)
}