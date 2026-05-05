import * as S from "./style";
import icon from "../../../assets/bookIconsvg.svg";
import rentReq from "../../../assets/RentlReq.svg";
import rentState from "../../../assets/rentState.svg";
import downArrow from "../../../assets/downArrow.svg";
import type { AdminSection } from "../sideBar";

/**
 * 책 관리 하위 메뉴 props
 *
 * activeSection은 현재 어떤 메뉴가 선택되어 있는지 보여 주는 값이고,
 * onSelectSection은 사용자가 다른 메뉴를 눌렀을 때 상위 페이지에 알려 주는 함수다.
 */
interface ListProps {
  activeSection: AdminSection;
  onSelectSection: (section: AdminSection) => void;
}

/**
 * 사이드바의 "책 관리" 하위 메뉴 컴포넌트
 *
 * 이 컴포넌트는 메뉴 UI만 보여 주고,
 * 실제 섹션 상태는 상위 admin 페이지가 소유한다.
 */
export function List({ activeSection, onSelectSection }: ListProps) {
  return (
    <S.Container>
      <S.MainContent>
        <S.TitleContent>
          <img src={icon} width={18} height={18} alt="책 관리" />
          <S.Title>책 관리</S.Title>
        </S.TitleContent>
        <img src={downArrow} width={14} height={14} alt="펼침" />
      </S.MainContent>

      <S.SubContent>
        <S.SubItems
          type="button"
          $active={activeSection === "request"}
          onClick={() => onSelectSection("request")}
        >
          <img src={rentReq} width={16} height={16} alt="대여 요청함" />
          <S.Text $active={activeSection === "request"}>대여 요청함</S.Text>
        </S.SubItems>
        <S.SubItems
          type="button"
          $active={activeSection === "status"}
          onClick={() => onSelectSection("status")}
        >
          <img src={rentState} width={16} height={16} alt="책 대여 상태 확인" />
          <S.Text $active={activeSection === "status"}>책 대여 상태 확인</S.Text>
        </S.SubItems>
      </S.SubContent>
    </S.Container>
  );
}

