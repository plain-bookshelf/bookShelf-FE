import styled from "styled-components";
import bgImage from "../../assets/backgroundLogo.png";

export const Banner = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1920px;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 65px;
  background-image: url(${bgImage});
`

export const Container = styled.div`
  box-sizing: border-box;
  width: 1440px;
  display: flex;
  flex-direction: column;
`

export const BannerTitle = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: white;
  margin: 0;
`

export const DetailInfoContainer = styled.div`
  box-sizing: border-box;
  width: 1440px;
  display: flex;
  align-items: flex-start;
  gap: 53px;
  padding: 40px;
`

export const DetailInfoBox = styled.div`
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0px 8px 20px 0 rgba(0, 0, 0, 0.15);
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  gap: 48px;
  border-radius: 10px;
`

export const DetailInfoTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin: 0;
  color: black;
`

export const DetailInfoList = styled.div`
  box-sizing: border-box;
  width: 378px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const DetailInfo = styled.div`
  box-sizing: border-box;
  width: 378px;
  display: flex;
  flex-direction: column;
`

export const BookInfoBox = styled.div`
  display: flex;
  align-items: center;
`

export const BookNumber = styled.span`
  font-size: 20px;
  font-weight: 500;
  border: 1px solid #00C471;
  border-radius: 5px;
  color: #00C471;
  text-align: center;
  width: 30px;
  height: 30px;
  margin: 0 10px 0px 4px;
  border-radius: 5px;
`

export const BookInfo = styled.div`
  box-sizing: border-box;
  width: 340px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const BookTitle = styled.span`
  color: #5D5D5D;
  font-size: 20px;
  font-weight: 400;
`

export const BookState = styled.span`
  color: #444444;
  font-size: 20px;
  font-weight: 500;
`

export const ProfileContainer = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  padding: 40px 120px 40px 40px;
  box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  width: 1440px;
  height: auto;
  background-color: white;
  margin: 48px 0 80px;  
`

export const ProfileBox = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 32px;
  align-items: center;
  max-width: 600px;
  height: 100px;
`

export const ProfileOutlien = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
  width: 100px;
  height: 100px;
  border: 2px solid #005E36;
  border-radius: 50%;
  cursor: pointer;
`

export const InfoTitle = styled.span<Color>`
  font-size: 28px;
  font-weight: 600;
  color: ${(props) => props.color};
`

export const InfoContainer = styled.div`
  display: flex;
  gap: 52px;
`

export const InfoBox = styled.div`
  display: flex;
  gap: 22px;
  justify-content: flex-start;
  flex-direction: column;
`

export const VerticalLine = styled.div`
  width: 1px;
  height: 95px;
  background-color: #EEEEEE;
`

export const InfoContent = styled.span<Color>`
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.color};
`

export const EditContainer = styled.div`
  box-sizing: border-box;
  width: 740px;
  padding: 28px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 44px;
  box-shadow: 0px 8px 20px 0 rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`

export const EditTitle = styled.h2`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
`

export const EditInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const EditInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const EditInputTitle = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  color: #5A5A5A;
`

export const EditBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

export const EditGo = styled.span<How>`
  position: absolute;
  font-size: 20px;
  font-weight: 500;
  color: #5A5A5A;
  text-decoration: underline;
  left: ${(props) => `${props.go}px`};
`

export const EditInput = styled.input<Input>`
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  width: 700px;
  height: 64px;
  padding: 20px;
  font-size: 20px;
  border: 1px solid #5A5A5A;
  border-radius: 10px;
  outline: none;
  pointer-events: ${(props) => props.allow ? "auto" : "none"};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
`

export const Button = styled.button`
  box-sizing: border-box;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  background-color: #00C471;
  border: none;
  height: 64px;
  border-radius: 10px;
  cursor: pointer;
`

type Color = {
  color: string
}

type Input = {
  bgColor: string;
  color: string;
  weight: number;
  allow: boolean;
}

type How = {
  go: number;
}