import * as S from "./style";
import icon from "../../../assets/searchIcon.svg";

interface TitleContentProps {
  checked: boolean;
  searchValue: string;
  onToggle: () => void;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export default function TitleContent({
  checked,
  searchValue,
  onToggle,
  onSearchChange,
  onSearchSubmit,
}: TitleContentProps) {
  return (
    <S.Toolbar>
      <S.TitleContainer>
        <S.Title>대여 요청함</S.Title>
        <S.FilterLabel>
          <S.FilterText>연체만 보기</S.FilterText>
          <S.CheckLabel>
            <S.HiddenCheckBox checked={checked} onChange={onToggle} />
            <S.CheckBox />
          </S.CheckLabel>
        </S.FilterLabel>
      </S.TitleContainer>

      <S.SearchContent>
        <S.SearchBar
          placeholder="검색하기"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchSubmit();
            }
          }}
        />
        <S.SearchButton type="button" onClick={onSearchSubmit} aria-label="검색">
          <S.Icon src={icon} alt="" />
        </S.SearchButton>
      </S.SearchContent>
    </S.Toolbar>
  );
}
