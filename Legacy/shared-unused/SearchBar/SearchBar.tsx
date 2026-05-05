import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import * as S from "./style";

type SearchBarProps = {
  handleSearch: (query: string) => void;
  State: "book" | "user";
};

export default function SearchBar({ handleSearch, State }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(query);
    }
  };

  return (
    <S.Container>
      <S.SearchContainer state={State} $active={focused || query.length > 0}>
        <S.SearchBar
          placeholder={State === "book" ? "검색어를 입력해주세요." : "유저 이름을 입력해주세요."}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
        />
        <S.SearchButton onClick={() => handleSearch(query)}>
          <img src={search} alt="search" style={{ width: 26, height: 26 }} />
        </S.SearchButton>
      </S.SearchContainer>
    </S.Container>
  );
}

