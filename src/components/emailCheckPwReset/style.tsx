import styled from "styled-components"

export const IdFindContainer = styled.div`
  width: 620px;
  height: 600px;
  border: 1px solid #E7E7E7;
  box-shadow: 1px 1px 10px #E7E7E7;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const IdFindContent = styled.div`
  width: 500px;
  height: 500px;
  
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

export const IdFindTitleContent = styled.div`
  width: 400px;
  height: 140px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const IdFindTitle = styled.h1`
  font-size: 32px;
`

export const IdFindText = styled.p`
  font-size: 16px;
  color: #7D7D7D;
`

export const IdFindInputContainer = styled.div`
  width: 500px;
  height: 330px;

  display: flex;
  flex-direction: column;
  gap: 15px;  
`

export const EmailInPutContainer = styled.div`
  width: 500px;
  height: 90px;
  display: flex;
  flex-direction: column;
`

export const EmailInputTextContent = styled.div`
  width: 87px;
  height: 25px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`

export const EmailInputContent = styled.div`
  width: 500px;
  height: 50px;
  
  display: flex;
  gap: 20px;

`

export const EmailInputDiv = styled.div<{ hasError?: boolean }>`
  width: 380px;
  height: 50px;
  box-sizing: border-box;

  border: 1px solid ${(props) => (props.hasError ? "#C40000" : "#B9B9B9")};
  overflow: hidden;
  border-radius: 10px;

  &:focus-within {
    border-color: ${(props) => (props.hasError ? "#C40000" : "#00C471")};
    outline: none;
    box-shadow: ${(props) => (props.hasError ? "0 2px 5px 5px rgba(196, 0, 0, 0.1)" : "0 2px 5px 5px rgba(0, 196, 113, 0.1)")};
  }
`

export const EmailInput = styled.input`
  width: 380px;
  height: 50px;
  padding-left: 15px;
  border: none;
  color: #5D5D5D;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border: none;
    outline: none;
  }
`

export const InputError = styled.div`
  width: 500px;
  height: 24px;
  margin-bottom: 5px;
  color: #C40000;
  font-size: 16px;

  display: flex;
  align-items: center;
  gap: 5px;
`

export const EmailCheckButton = styled.button<{ disabled?: boolean }>`
  width: 100px;
  height: 50px;
  background-color: ${(props) => (props.disabled ? "#EDEDED" : "#ebfff7")};
  border: 1px solid ${(props) => (props.disabled ? "#898989" : "#00C471")};
  color: ${(props) => (props.disabled ? "#898989" : "#00C471")};
  border-radius: 10px;
  box-sizing: border-box;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:active:not(:disabled) {
    background-color: #cbffe9;
  }
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

export const EmailInPutImg = styled.img`
  width: 16px;
  height: 16px;
`

export const EmailInputText = styled.div`
  color: #5D5D5D;
  font-size: 16px;
`

export const CheckInPutContainer = styled.div`
  width: 500px;
  height: 90px;
  display: flex;
  flex-direction: column;
`

export const CheckInputTextContent = styled.div`
  width: 87px;
  height: 25px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`

export const CheckInputText = styled.div`
  color: #5D5D5D;
  font-size: 16px;
`

export const CheckInputContent = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  gap: 20px;
`

export const CheckInputDiv = styled.div<{ disabled?: boolean; hasError?: boolean }>`
  width: 380px;
  height: 50px;
  box-sizing: border-box;

  
  border: 1px solid ${(props) => (props.hasError ? "#C40000" : "#B9B9B9")};
  overflow: hidden;
  border-radius: 10px;
  background-color: ${(props) => (props.disabled ? "#F5F5F5" : "white")};

  &:focus-within {
    border-color: ${(props) => {
      if (props.disabled) return "#B9B9B9"
      if (props.hasError) return "#C40000"
      return "#00C471"
    }};
    outline: none;
    box-shadow: ${(props) => {
      if (props.disabled) return "none"
      if (props.hasError) return "0 2px 5px 5px rgba(196, 0, 0, 0.1)"
      return "0 2px 5px 5px rgba(0, 196, 113, 0.1)"
    }};
  }
`

export const CheckInput = styled.input`
  width: 380px;
  height: 50px;
  box-sizing: border-box;
  
  padding-left: 15px;
  border: none;
  color: #5D5D5D;
  font-size: 16px;
  background-color: transparent;

  &:focus {
    border: none;
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`

export const CheckButton = styled.button<{ disabled?: boolean }>`
  width: 100px;
  height: 50px;
  background-color: ${(props) => (props.disabled ? "#EDEDED" : "#ebfff7")};
  border: 1px solid ${(props) => (props.disabled ? "#898989" : "#00C471")};
  color: ${(props) => (props.disabled ? "#898989" : "#00C471")};
  border-radius: 10px;
  box-sizing: border-box;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:active:not(:disabled) {
    background-color: #c1ffe5;
  }
`

export const SuccessMessage = styled.div`
  width: 500px;
  height: 30px;
  color: #00C471;
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-top: -5px;
`

export const ErrorMessage = styled.div`
  width: 500px;
  height: 30px;
  color: #C40000;
  font-size: 16px;
  display: flex;
  align-items: center;

  margin-bottom: 5px;
  gap: 5px;
`




