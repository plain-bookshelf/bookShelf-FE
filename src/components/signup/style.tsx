import {Link} from "react-router-dom"
import styled from "styled-components"

export const SingInContent = styled.div`
  width: 960px;
  height: 650px;
  border: 1px solid #E7E7E7;
  box-shadow: 1px 1px 10px  #E7E7E7;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TextContainer = styled.div`
  width: 300px;
  height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Arrow = styled.img`
  width: 32px;
  height: 32px;

  margin-bottom: 28px;

  transition: all 0.2s ease;
  cursor: pointer;
  
  &:active{
    filter: brightness(0);
  }
`

export const TextContent = styled.div`
  width: 228px;
  height: 244px;

  display: flex;
  flex-direction: column;
  
  justify-content: center;

  margin-top: 50px;
`

export const SingInTitle = styled.h1`
  font-size: 47px;
  margin-bottom: 60px;
`

export const LinkContent = styled.div`
  width: 187px;
  height: 64px;  

  display: flex;
  flex-direction: column;
`

export const IdPasswordFind = styled(Link)`
  font-size: 16px;
  color: #5D5D5D;
  text-decoration: none;
`

export const LogInText = styled(Link)`
    font-size: 16px;
    color: #00C471;
    text-decoration: none;
`

export const InputContainer = styled.div`
  width: 620px;
  height: 550px;

  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  gap: 10px;
`

export const AffiliationInputContainer = styled.div`
  width: 500px;
  height: 90px;
  display: flex;
  flex-direction: column;
`

export const AffiliationInputTextContent = styled.div`
  width: 500px;
  height: 25px;

  display: flex;
  align-items: center; 
  gap: 5px;
  
  margin-bottom: 10px;
`

export const AffiliationInputImg = styled.img`
  width: 20px;
  height: 20px;
`

export const AffiliationInputText = styled.p`
  color: #5D5D5D;
  font-size: 16px;
`

interface InputContentProps {
  hasError?: boolean
  hasValue?: boolean
}

export const AffiliationInputContent = styled.div<InputContentProps>`
   width: 500px;
   height: 50px;
   background-color: gray;
   border: 1px solid ${(props) => 
     (props.hasError ? "#FF4444" : 
     (!props.hasError && props.hasValue) ? "#00C471" : 
     "#B9B9B9")
   };
   box-sizing: border-box;
   overflow: hidden;
   border-radius: 10px;
   position: relative;

   //지금 현재 고정된 값이라 생략
   // &:focus-within {
      /* 포커스 시 테두리 색상 */
      //border-color: ${(props) => (props.hasError ? "#FF4444" : "#00C471")};
      //outline: none;
      /* 포커스 시 그림자 색상 */
     // box-shadow: 0 2px 5px 5px ${(props) => (props.hasError ? "rgba(255, 68, 68, 0.1)" : "rgba(0, 196, 113, 0.1)")};
  //}
`

export const AffiliationInput = styled.input`
  width: 500px;
  height: 50px;
  background-color: #f7f7f7;
  cursor: not-allowed;
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

  &:disabled {
    cursor: not-allowed;
  }
`

export const IdInputContainer = styled.div`
  width: 500px;
  height: 90px;
  display: flex;
  flex-direction: column;
`

export const IdInputTextContent = styled.div`
  width: 500px;
  height: 25px;

  display: flex;
  align-items: center; 
  gap: 5px;
  
  margin-bottom: 10px;
`

export const IdInputImg = styled.img`
  width: 20px;
  height: 20px;
`

export const IdInputText = styled.p`
  color: #5D5D5D;
  font-size: 16px;
`

interface InputContentProps {
  hasError?: boolean
  hasValue?: boolean
}

export const IdInputContent = styled.div<InputContentProps>`
   width: 500px;
   height: 50px;
   border: 1px solid ${(props) => 
     (props.hasError ? "#FF4444" : 
     (!props.hasError && props.hasValue) ? "#00C471" : 
     "#B9B9B9")
   };
   box-sizing: border-box;
   overflow: hidden;
   border-radius: 10px;
   position: relative;

   &:focus-within {
      /* 포커스 시 테두리 색상 */
      border-color: ${(props) => (props.hasError ? "#FF4444" : "#00C471")};
      outline: none;
      /* 포커스 시 그림자 색상 */
      box-shadow: 0 2px 5px 5px ${(props) => (props.hasError ? "rgba(255, 68, 68, 0.1)" : "rgba(0, 196, 113, 0.1)")};
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

  &:disabled {
    cursor: not-allowed;
    background-color: white;
  }
`

export const PasswordInputContainer = styled.div`
  width: 500px;
  height: 90px;

  display: flex;
  flex-direction: column;
`

export const PasswordInputTextContent = styled.div`
  width: 500px;
  height: 25px;

  display: flex;
  align-items: center; 
  gap: 5px;
  
  margin-bottom: 10px;
`

export const PasswordInputImg = styled.img`
  width: 20px;
  height: 20px;
`

export const PasswordInputText = styled.p`
  color: #5D5D5D;
  font-size: 16px;
`

export const PasswordInputContent = styled.div<InputContentProps>`
   width: 500px;
   height: 50px;
   border: 1px solid ${(props) => 
     (props.hasError ? "#FF4444" : 
     (!props.hasError && props.hasValue) ? "#00C471" : 
     "#B9B9B9")
   };
   box-sizing: border-box;
   overflow: hidden;
   border-radius: 10px;
   position: relative;

   &:focus-within {
      /* 포커스 시 테두리 색상 */
      border-color: ${(props) => (props.hasError ? "#FF4444" : "#00C471")};
      outline: none;
      /* 포커스 시 그림자 색상 */
      box-shadow: 0 2px 5px 5px ${(props) => (props.hasError ? "rgba(255, 68, 68, 0.1)" : "rgba(0, 196, 113, 0.1)")};
  }
`

export const PasswordInput = styled.input`
  width: 450px;
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

  &:disabled {
    background-color: white;
    cursor: not-allowed;
  }
`

interface SeeButtonProps {
  hasError?: boolean
  hasValue?: boolean
}

export const SeeButton = styled.img<SeeButtonProps>`
  width: 25px;
  height: 25px;

  position: absolute;

  top: 13px;
  right: 15px;

  cursor: pointer;
  transition: opacity 0.2s ease;

  ${(props) =>
    props.hasError
      ? `filter: invert(27%) sepia(98%) saturate(7426%) hue-rotate(352deg) brightness(101%) contrast(107%);` // 에러(빨강색 필터)
      : props.hasValue // 에러가 없고, 값이 입력되어 있을 때 (hasValue 사용)
      ? `filter: invert(56%) sepia(50%) saturate(1408%) hue-rotate(124deg) brightness(98%) contrast(101%);` // 초록색 필터 적용
      : ``
  }

  &:hover {
    opacity: 0.7;
  }
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
  cursor: pointer;

  &:active {
    background-color: #00A05D;
  }

  &:disabled {
    cursor: not-allowed;
  }
`

export const CheckPasswordInputContainer = styled.div`
  width: 500px;
  height: 90px;

  display: flex;
  flex-direction: column;
`

export const CheckPasswordInputTextContent = styled.div`
  width: 500px;
  height: 25px;

  display: flex;
  align-items: center; 
  gap: 5px;
  
  margin-bottom: 10px;
`

export const CheckPasswordInputText = styled.p`
  color: #5D5D5D;
  font-size: 16px;
`

export const CheckPasswordInputContent = styled.div<InputContentProps>`
   width: 500px;
   height: 50px;
   /* 에러가 없고 값이 있을 때(유효성 성공) 초록색 테두리 적용 */
   border: 1px solid ${(props) => 
     (props.hasError ? "#FF4444" : 
     (!props.hasError && props.hasValue) ? "#00C471" : 
     "#B9B9B9")
   };
   box-sizing: border-box;
   overflow: hidden;
   border-radius: 10px;
   position: relative;

   &:focus-within {
      /* 포커스 시 테두리 색상 */
      border-color: ${(props) => (props.hasError ? "#FF4444" : "#00C471")};
      outline: none;
      /* 포커스 시 그림자 색상 */
      box-shadow: 0 2px 5px 5px ${(props) => (props.hasError ? "rgba(255, 68, 68, 0.1)" : "rgba(0, 196, 113, 0.1)")};
  }
`

export const CheckPasswordInput = styled.input`
  width: 450px;
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

  &:disabled {
    background-color: white;
    cursor: not-allowed;
  }
`

export const ErrorMessageContent = styled.div`
  width: 500px;
  height: 24px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;

`

export const ErrorMessage = styled.p`
  color: #FF4444;
  font-size: 16px;

`