import * as S from "./style";
import icon from "../../../assets/bookIconsvg.svg";
import rentReq from "../../../assets/RentlReq.svg";
import rentState from "../../../assets/rentState.svg";
import downArrow from "../../../assets/downArrow.svg";
import type { AdminSection } from "../sideBar";

interface ListProps {
  activeSection: AdminSection;
  onSelectSection: (section: AdminSection) => void;
}

export function List({ activeSection, onSelectSection }: ListProps) {
  return (
    <S.Container>
      <S.MainContent>
        <S.TitleContent>
          <img src={icon} width={18} height={18} />
          <S.Title>책 관리</S.Title>
        </S.TitleContent>
        <img src={downArrow} width={14} height={14} />
      </S.MainContent>

      <S.SubContent>
        <S.SubItems
          type="button"
          $active={activeSection === "request"}
          onClick={() => onSelectSection("request")}
        >
          <img src={rentReq} width={16} height={16} />
          <S.Text $active={activeSection === "request"}>대여 요청함</S.Text>
        </S.SubItems>
        <S.SubItems
          type="button"
          $active={activeSection === "status"}
          onClick={() => onSelectSection("status")}
        >
          <img src={rentState} width={16} height={16} />
          <S.Text $active={activeSection === "status"}>책 대여 상태 확인</S.Text>
        </S.SubItems>
      </S.SubContent>
    </S.Container>
  );
}
