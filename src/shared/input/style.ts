import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  height: 52px;
  border: 1px solid #949494;
  border-radius: 8px;
  padding: 14px 16px;
  box-sizing: border-box;
  outline: none;
  font-size: 16px;
  color: #000000;

  &::placeholder {
    color: #a9a9a9;
  }

  &:focus {
    border: 1px solid #000000;
  }
`;
