import { Link } from "react-router-dom"
import styled from "styled-components"



export const LogInContent = styled.div`
  width: 920px;
  height: 488px;
  border: 1px solid #E7E7E7;
  box-shadow: 1px 1px 10px  #E7E7E7;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TextContainer = styled.div`
  width: 300px;
  height: 488px;

  display: flex;
  flex-direction: column;
  align-items: center;
  
`

export const TextContent = styled.div`
  width: 187px;
  height: 184px;
  margin-top: 100px;
`

export const LogInText = styled.h1`
  width: 187px;
  height: 60px; 

  font-size: 50px;
  margin-top: 0px;
  margin-bottom: 60px;
`

export const LinkContent = styled.div`
  width: 187px;
  height: 67px;

  display: flex;
  flex-direction: column;
`

export const IdPasswordFind = styled(Link)`
  font-size: 16px;
  color: #5D5D5D;
  text-decoration: none;
`

export const SignUpText = styled(Link)`
  font-size: 16px;
  color: #00C471;
  text-decoration: none;
`

export const InputContainer = styled.div`
  width: 620px;
  height: 488px;

  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  gap: 10px;
`

export const IdInputContainer = styled.div`
  width: 500px;
  height: 99px;
  display: flex;
  flex-direction: column;
`

export const IdInputTextContent = styled.div`
  width: 87px;
  height:25px;

  display: flex;
  align-items: center; 
  gap: 5px;
  
  margin-bottom: 10px;
`

export const IdInputImg = styled.img`

`

export const IdInputText = styled.p`
  color: #5D5D5D;
  font-size: 16px;
`

export const IdInputContent = styled.div<{ hasError?: boolean }>`
   width: 500px;
   height: 50px;
   border: 1px solid #B9B9B9;
   border-color: ${(props) => (props.hasError ? "#C40000" : "#B9B9B9")};
   overflow: hidden;
   border-radius: 10px;

   &:focus-within {
      border-color:${(props) => (props.hasError ? "#C40000" : "#00C471")};
      outline: none;
      box-shadow: ${(props) => props.hasError ?  "0 2px 5px 5px rgba(196, 0, 0, 0.1)" : "0 2px 5px 5px rgba(0, 196, 113, 0.1)"};
  }
`

export const IdInput = styled.input`
  width: 500px;
  height: 50px;

  padding-left: 15px;
  border: none;
  box-sizing: border-box;
  
  color: #5D5D5D;
  font-size: 16px;
  
  &:focus {
      outline: none;
      border: none;
      box-shadow: none;
  }
`

export const PasswordInputContainer = styled.div`
  width: 500px;
  height: 99px;

  display: flex;
  flex-direction: column;
`

export const PasswordInputTextContent = styled.div`
  width: 87px;
  height: 25px;

  display: flex;
  align-items: center; 
  gap: 5px;
  
  margin-bottom: 10px;
`

export const PasswordInputImg = styled.img`

`

export const PasswordInputText = styled.p`
  color: #5D5D5D;
  font-size: 16px;
`

export const PasswordInputContent = styled.div<{ hasError?: boolean }>`
   width: 500px;
   height: 50px;
   border: 1px solid #B9B9B9;
   border-color: ${(props) => (props.hasError ? "#C40000" : "#B9B9B9")};
   overflow: hidden;
   border-radius: 10px;
   position: relative;

   &:focus-within {
      border-color: ${(props) => (props.hasError ? "#C40000" : "#00C471")};
      outline: none;
      box-shadow: ${(props) => props.hasError ?  "0 2px 5px 5px rgba(196, 0, 0, 0.1)": "0 2px 5px 5px rgba(0, 196, 113, 0.1)"};
  }
`

export const PasswordInput = styled.input`
  width: 500px;
  height: 50px;

  padding-left: 15px;
  border: none;
  box-sizing: border-box;
  
  color: #5D5D5D;
  font-size: 16px;
  
    &:focus {
      outline: none;
      border: none;
      box-shadow: none;
  }
`

export const SeeButton = styled.img<{ hasError?: boolean }>`
  width: 25px;
  height: 25px;

  position: absolute;

  cursor: pointer;
  
  top: 13px;
  right: 15px;

  filter: ${(props) => (props.hasError ? "invert(14%) sepia(97%) saturate(7426%)" : "none")};

`

export const Button = styled.button`
  width: 500px;
  height: 55px;

  background-color: #00C471;
  border: none;

  color: white;
  border-radius: 10px;
  font-size: 16px;

  transition: all 0.2s ease;
  

  &:active {
    background-color: #00A05D;
  }
`

export const ErrorMessageContent = styled.div`
  width: 500px;
  margin-bottom: 11px;
  display: flex;
  align-items: center;
  gap: 4px;
`

export const ErrorMessage = styled.div`
  width: 500px;
  color: #C40000;
  font-size: 16px;
`