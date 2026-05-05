import styled from "styled-components";

export const IdFindContainer = styled.div`
  width: min(620px, 100%);
  min-height: 600px;
  border: 1px solid #e7e7e7;
  box-shadow: 1px 1px 10px #e7e7e7;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 40px;
  box-sizing: border-box;
  background-color: white;

  @media (max-width: 768px) {
    min-height: auto;
    padding: 28px 20px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
    box-shadow: none;
    border-radius: 10px;
  }
`;

export const IdFindContent = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;

  @media (max-width: 768px) {
    min-height: auto;
    gap: 24px;
  }
`;

export const Arrow = styled.img`
  width: 31px;
  height: 32px;
  transition: all 0.2s ease;
  cursor: pointer;
  flex-shrink: 0;

  &:active {
    filter: brightness(0);
  }

  @media (max-width: 480px) {
    width: 26px;
    height: 26px;
  }
`;

export const IdFindTitleContent = styled.div`
  width: 100%;
  max-width: 400px;
  min-height: 140px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 768px) {
    min-height: auto;
  }
`;

export const IdFindTitle = styled.h1`
  font-size: clamp(26px, 4vw, 32px);
  margin: 0;
`;

export const IdFindText = styled.p`
  font-size: clamp(14px, 2.4vw, 16px);
  color: #7d7d7d;
  margin: 0;
`;

export const IdFindInputContainer = styled.div`
  width: 100%;
  min-height: 330px;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const EmailInPutContainer = styled.div`
  width: 100%;
  min-height: 90px;
  display: flex;
  flex-direction: column;
`;

export const EmailInputTextContent = styled.div`
  width: fit-content;
  min-height: 25px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`;

export const EmailInputContent = styled.div`
  width: 100%;
  min-height: 50px;

  display: flex;
  gap: 20px;
  align-items: stretch;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const EmailInputDiv = styled.div<{ hasError?: boolean }>`
  flex: 1;
  min-width: 0;
  height: 50px;
  box-sizing: border-box;

  border: 1px solid ${(props) => (props.hasError ? "#C40000" : "#B9B9B9")};
  overflow: hidden;
  border-radius: 10px;

  &:focus-within {
    border-color: ${(props) => (props.hasError ? "#C40000" : "#00C471")};
    outline: none;
    box-shadow: ${(props) =>
      props.hasError
        ? "0 2px 5px 5px rgba(196, 0, 0, 0.1)"
        : "0 2px 5px 5px rgba(0, 196, 113, 0.1)"};
  }
`;

export const EmailInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 15px;
  border: none;
  color: #5d5d5d;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border: none;
    outline: none;
  }

  &::placeholder {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const InputError = styled.div`
  width: 100%;
  min-height: 24px;
  margin-bottom: 5px;
  color: #c40000;
  font-size: 14px;

  display: flex;
  align-items: center;
  gap: 5px;
  word-break: keep-all;
`;

export const EmailCheckButton = styled.button<{ disabled?: boolean }>`
  width: 100px;
  min-width: 100px;
  height: 50px;
  background-color: ${(props) => (props.disabled ? "#EDEDED" : "#ebfff7")};
  border: 1px solid ${(props) => (props.disabled ? "#898989" : "#00C471")};
  color: ${(props) => (props.disabled ? "#898989" : "#00C471")};
  border-radius: 10px;
  box-sizing: border-box;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:active:not(:disabled) {
    background-color: #cbffe9;
  }

  @media (max-width: 480px) {
    width: 100%;
    min-width: 0;
  }
`;

export const NextButton = styled.button`
  width: 100%;
  min-height: 55px;
  background-color: #00c471;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0 16px;

  &:active {
    background-color: #00A05D;
  }
`;

export const EmailInPutImg = styled.img`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

export const EmailInputText = styled.div`
  color: #5d5d5d;
  font-size: 16px;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const CheckInPutContainer = styled.div`
  width: 100%;
  min-height: 90px;
  display: flex;
  flex-direction: column;
`;

export const CheckInputTextContent = styled.div`
  width: fit-content;
  min-height: 25px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`;

export const CheckInputText = styled.div`
  color: #5d5d5d;
  font-size: 16px;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const CheckInputContent = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  gap: 20px;
  align-items: stretch;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const CheckInputDiv = styled.div<{ disabled?: boolean; hasError?: boolean }>`
  flex: 1;
  min-width: 0;
  height: 50px;
  box-sizing: border-box;

  border: 1px solid ${(props) => (props.hasError ? "#C40000" : "#B9B9B9")};
  overflow: hidden;
  border-radius: 10px;
  background-color: ${(props) => (props.disabled ? "#F5F5F5" : "white")};

  &:focus-within {
    border-color: ${(props) => {
      if (props.disabled) return "#B9B9B9";
      if (props.hasError) return "#C40000";
      return "#00C471";
    }};
    outline: none;
    box-shadow: ${(props) => {
      if (props.disabled) return "none";
      if (props.hasError) return "0 2px 5px 5px rgba(196, 0, 0, 0.1)";
      return "0 2px 5px 5px rgba(0, 196, 113, 0.1)";
    }};
  }
`;

export const CheckInput = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  padding: 0 15px;
  border: none;
  color: #5d5d5d;
  font-size: 16px;
  background-color: transparent;

  &:focus {
    border: none;
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &::placeholder {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const CheckButton = styled.button<{ disabled?: boolean }>`
  width: 100px;
  min-width: 100px;
  height: 50px;
  background-color: ${(props) => (props.disabled ? "#EDEDED" : "#ebfff7")};
  border: 1px solid ${(props) => (props.disabled ? "#898989" : "#00C471")};
  color: ${(props) => (props.disabled ? "#898989" : "#00C471")};
  border-radius: 10px;
  box-sizing: border-box;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:active:not(:disabled) {
    background-color: #c1ffe5;
  }

  @media (max-width: 480px) {
    width: 100%;
    min-width: 0;
  }
`;

export const SuccessMessage = styled.div`
  width: 100%;
  min-height: 30px;
  color: #00C471;
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-top: -5px;
  word-break: keep-all;
`;

export const ErrorMessage = styled.div`
  width: 100%;
  min-height: 30px;
  color: #C40000;
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  gap: 5px;
  word-break: keep-all;
`;