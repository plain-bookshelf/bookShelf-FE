import styled from "styled-components";

export const BoxA = styled.div`
  box-sizing: border-box;
  border-radius: 12px;
  background-color: #ffffff;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
`

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  width: 100%;
`

export const BoxHeader = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 162px;
  height: 70px;
  width: 100%;
`

export const BoxHeaderTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #474747;
`

export const ProfileOutlien = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
  width: 120px;
  height: 120px;
  border: 2px solid #005E36;
  border-radius: 50%;
`

export const ProfileBox = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 134px;
  height: 134px;
`

//컴포넌트 이름 바꿔야 할 수도 있음
//기능은 포지셔닝, 줌인데 이름은 CropWrapper..? 애매함
export const CropWrapper = styled.div` 
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  
  .reactEasyCrop_CropArea {
    border: none !important; 
    /* transform: translate(-50%, -50%) scale(0.98);
    transform-origin: center center; */
  }
`

export const BoxLine = styled.div`
  box-sizing: border-box;
  width: 520px;
  height: 6px;
  border-radius: 10px;
  background-color: #00C471;
  margin: 28px 0 20px;
`

export const SpinnerBox = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 29px 0 20px 28px;
  height: 5px;
`

export const BoxInput = styled.input` //button으로
  box-sizing: border-box;
  background-color: #00C471;
  color: transparent;
  text-shadow: 0 0 0 #ffffff;
  font-size: 20px;
  font-weight: 700;
  border-radius: 10px;
  border: none;
  width: 320px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  cursor: pointer;
  outline: none;
`

export const Label = styled.label`
  box-sizing: border-box;
  background-color: #00C471;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  border-radius: 10px;
  border: none;
  width: 320px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  cursor: pointer;
`