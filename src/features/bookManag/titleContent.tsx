import * as S from "./style";
import icon from "../../assets/searchIcon.svg";

interface TitleContentProps {
  title: string;
  checked: boolean;
  searchValue: string;
  onToggle: () => void;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export default function TitleContent({
  title,
  checked,
  searchValue,
  onToggle,
  onSearchChange,
  onSearchSubmit,
}: TitleContentProps) {
  return (
    <S.Toolbar>
      <S.TitleContainer>
        <S.Title>{title}</S.Title>
        <S.RentViewContent>
          <S.Text>연체만 보기</S.Text>
          <S.CheckLabel>
            <S.HiddenCheckBox checked={checked} onChange={onToggle} />
            <S.CheckBox />
          </S.CheckLabel>
        </S.RentViewContent>
      </S.TitleContainer>
      <S.ToolbarActions>
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
      </S.ToolbarActions>
    </S.Toolbar>
  );
}

