import styled from "styled-components";

import { UserInfo } from "./userInfo/userInfo";
import { List } from "./list/list";
import { MainItem } from "./list/mainItem";

export type AdminSection = "request" | "status";

interface SideBarProps {
  activeSection: AdminSection;
  onSelectSection: (section: AdminSection) => void;
}

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

export const ListContaniner = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  padding: 22px 24px;
  box-sizing: border-box;
  flex-direction: column;
  gap: 8px;
`;

export const ListContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
