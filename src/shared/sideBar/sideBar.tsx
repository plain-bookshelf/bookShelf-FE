import styled from "styled-components";
import { List } from "./list/list";
import { MainItem } from "./list/mainItem";
import { UserInfo } from "./userInfo/userInfo";

/**
 * 관리자 페이지에서 오른쪽 본문에 어떤 화면을 보여 줄지 구분하는 타입
 *
 * request: 대여 요청함
 * status : 책 대여 상태 확인
 */
export type AdminSection = "request" | "status";

/**
 * SideBar props
 *
 * 사이드바는 현재 선택된 섹션을 직접 관리하지 않는다.
 * 선택 상태와 변경 함수는 상위 페이지(admin.tsx)가 내려준다.
 */
interface SideBarProps {
  activeSection: AdminSection;
  onSelectSection: (section: AdminSection) => void;
}

/**
 * 관리자 사이드바 컴포넌트
 *
 * 구성
 * - UserInfo: 상단 관리자 정보
 * - MainItem: 대시보드 등 상위 메뉴
 * - List: 책 관리 하위 메뉴
 *
 * 실제로 어떤 화면을 보여 줄지는 activeSection을 기준으로 상위 페이지가 결정한다.
 */
export function SideBar({ activeSection, onSelectSection }: SideBarProps) {
  return (
    <Wrapper>
      <UserInfo />
      <ListContaniner>
        <MainItem />
        <ListContent>
          <List activeSection={activeSection} onSelectSection={onSelectSection} />
        </ListContent>
      </ListContaniner>
    </Wrapper>
  );
}

/** 사이드바 전체 외곽 컨테이너 */
export const Wrapper = styled.div`
  width: 236px;
  min-width: 236px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #ffffff;
  border-right: 1px solid #ececec;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  align-items: center;
`;

/** 상단 정보 아래 메뉴 영역 전체를 감싸는 래퍼 */
export const ListContaniner = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  padding: 22px 24px;
  box-sizing: border-box;
  flex-direction: column;
  gap: 8px;
`;

/** 실제 메뉴 묶음을 세로로 쌓아 주는 영역 */
export const ListContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
