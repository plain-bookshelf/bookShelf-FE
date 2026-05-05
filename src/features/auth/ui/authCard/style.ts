import styled from "styled-components";


export const Card = styled.section<{$width: string, $maxWidth: string, $minHeight: string}>`
  width: ${({$width}) => $width};
  max-width: ${({$maxWidth}) => $maxWidth};
  min-height: ${({$minHeight}) => $minHeight};
  
  background-color: #FFFFFF;
  border-radius: 12px;
  border: none;
  box-shadow: 0 6px 20px 0 #00000026;
  overflow: hidden;

`

export const Spilt = styled.div`
  width: 100%;
  display: flex;
`

export const Left = styled.div`
  flex: 1;
`

export const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`
