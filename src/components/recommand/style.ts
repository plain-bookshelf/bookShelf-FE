import styled from "styled-components";

export const BookBox = styled.div`
  box-sizing: border-box;
  width: 1440px;
  display: flex;
  gap: 40px;
`

export const BookContent = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 15px;
`

export const BookTitle = styled.h3`
  font-size: 25px;
  font-weight: 700;
  margin: 0 10px 0 0;
`

export const PublicationInfo = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #999999;
`

export const BookSummary = styled.span`
  font-size: 21px;
  font-weight: 500;
`

export const Possession = styled.span<Allow>`
  box-sizing: border-box;
  border-radius: 7px;
  padding: 10px 13px;
  background-color: ${({status}) => status === true ? "#00C47140" : "#C4000340"};
  color: ${({status}) => status === true ? "#00C471" : "#C40003"};
`

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 20px;
`

export const Button = styled.div<Allow>`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 16px 20px;
  border-radius: 10px;
  border: ${({status}) => status === true ? "none" : "1px solid #ADADAD"};
  background-color: ${({status}) => status === true ? "#00C471" : "#EDEDED"};
  color: ${({status}) => status === true ? "#ffffff" : "#ADADAD"};
  pointer-events: ${({status}) => status === true ? "auto" : "none"};
  cursor: ${({status}) => status === true ? "pointer" : "not-allowed"};
  /*이거 커서 부모로 뺴서 거기서 처리하게 해야 함 안그럼 pointer-events 기본 값에 잡아먹힘
  예전에 적은 거라 뭔지 기억 안남;;*/
`

export const BookImg = styled.img`
  width: 180px;
  height: 280px;
`

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #D5D5D5;
`

type Allow = {
  status: boolean;
}