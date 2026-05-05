import styled from "styled-components";
import dashbord from "../../../assets/dashbord.svg";

export function MainItem() {
  return (
    <TitleContent>
      <img src={dashbord} width={18} height={18} />
      <Text>Dashboard</Text>
    </TitleContent>
  );
}

export const TitleContent = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Text = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #b4b4b4;
`;

