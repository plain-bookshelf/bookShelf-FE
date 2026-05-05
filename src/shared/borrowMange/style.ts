import styled from "styled-components";

export const ManageCategoryContainer = styled.div`
  box-sizing: border-box;
  width: 1440px;
  padding: 23px 70px;
  display: flex;
  gap: 40px;
  border: 1px solid #E7E7E7;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`

export const Category = styled.span<Width>`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: #7A7886;
  width: ${({ width }) => width}px;
`

export const BorrowInfpContainer = styled.div`
  box-sizing: border-box;
  width: 1440px;
  padding: 23px 70px;
  display: flex;
  gap: 40px;
  border-bottom: 1px solid #DCDCDC;
  align-items: center;
`

export const Info = styled(Category)<Text>`
  color: ${({ color }) => color};
  font-weight: ${({ weight }) => weight};
`

export const overdueInfo = styled(Category)<State>`
  color: ${( props ) => props.overdue ? "#FF0000" : "#444444"};
  font-size: ${( props ) => props.overdue ? 17 : 20 };
  font-weight: ${( props ) => props.overdue ? 600 : 500 };
`

export const AllowButtonBox = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
`

export const AllowButton = styled.button<State>`
  width: 89px;
  height: 38px;
  font-size: 17px;
  font-weight: 600;
  color: ${(props) => props.allow ? "#ADADAD" : "#00C471"};
  border: 1px solid ${(props) => props.allow ? "#ADADAD" : "#00C471"};
  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
`

type Width = {
  width: 400 | 200 | 160 | 100;
}

type Text = {
  weight: 600 | 500;
  color: "black" | "#5D5D5D" | "#7A7886";
}

type State = {
  overdue?: boolean;
  allow?: boolean;
}