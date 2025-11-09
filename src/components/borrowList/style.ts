import styled from "styled-components";

export const Container = styled.div`
  width: 1440px;
  display: flex;
  justify-content: flex-end;
  margin: 42px 0 18px 0;
`

export const Box = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 164px;
  cursor: pointer;
`

export const Text = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: black;
`

export const HiddenCheckBox = styled.input.attrs({type: "CheckBox"})`
  display: none;
`