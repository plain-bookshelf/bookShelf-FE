import styled from "styled-components";


export const Card = styled.section<{$width: string, $maxWidth: string, $minHeight: string}>`
  width: ${({$width}) => $width};
  max-width: ${({$maxWidth}) => $maxWidth};
  min-height: ${({$minHeight}) => $minHeight};
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  border-radius: 12px;
  border: none;
  box-shadow: 0 6px 20px 0 #00000026;
  overflow: hidden;

`

export const Spilt = styled.div`
  flex: 1;
  width: 100%;
  min-height: inherit;
  display: flex;
  align-items: stretch;
`

export const Left = styled.div`
  flex: 1;
  min-width: 0;
  min-height: inherit;
  display: flex;
  align-self: stretch;
`

export const Right = styled.div`
  flex: 1;
  min-width: 0;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-self: stretch;
`

export const Body = styled.div`
  flex: 1;
  min-width: 0;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`
