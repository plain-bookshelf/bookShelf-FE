import styled from "styled-components";
import {Link} from "react-router-dom"

export const ShowIdContainer = styled.div`
  width: 620px;
  height: 575px;
  border: 1px solid #E7E7E7;
  box-shadow: 1px 1px 10px #E7E7E7;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ShowIdContent = styled.div`
  width: 500px;
  height: 450px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Arrow = styled.img`
  width: 31px;
  height: 32px;


  transition: all 0.2s ease;
  cursor: pointer;
  
  &:active{
    filter: brightness(0);
  }
`

export const ShowIdTitleContent = styled.div`
  width: 480px;
  height: 172px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ShowIdTitle = styled.h1`
  font-size: 32px;
`

export const ShowIdText = styled.p`
  font-size: 16px;
  color: #7D7D7D;
`

export const ShowIdInfoContainer = styled.div`
  width: 500px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ShowIdInfoContent = styled.div`
  width: 500px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #DBFFEF;
  border: 1px solid #00C471;
`

export const NextButton = styled.button`
  width: 500px;
  height: 55px;
  background-color: #00C471; 
  cursor: pointer; 
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    background-color: #00A05D;
  }
`

export const PasswordReset = styled(Link)`
  color: #5A5A5A;
  font-size: 16px;
`