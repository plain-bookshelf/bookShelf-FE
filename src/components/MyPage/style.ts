import styled from "styled-components";

export const Banner = styled.div`
  box-sizing: border-box;
  width: 1920px;
  height: 257px;
  background: #02DD80;
  background: linear-gradient(180deg,rgba(2, 221, 128, 0.79) 0%, rgba(24, 181, 112, 1) 100%);
  display: flex;
  justify-content: center;
  padding-top: 66px;
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
  gap: 80px;
  padding: 40px;
`

export const DetailInfoBox = styled.div`
  box-sizing: border-box;
  width: 404px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`

export const DetailInfoTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin: 0;
  color: black;
`

export const DetailInfoList = styled.div`
  box-sizing: border-box;
  width: 404px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const DetailInfo = styled.div`
  box-sizing: border-box;
  width: 404px;
  height: 46px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Line = styled.div`
  height: 2px;
  background-color: #D5D5D5;
  width: 404px;
`

export const BookInfoBox = styled.div`
  display: flex;
`

export const BookNumber = styled.span`
  font-size: 20px;
  font-weight: 500;
  background-color: #767676;
  color: white;
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

export const BookState = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: black;
`

export const ProfileContainer = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  width: 1440px;
  height: 180px;
  background-color: white;
  margin: 48px 0 80px;  
`

export const ProfileBox = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 32px;
  align-items: center;
  width: 450px;
  height: 100px;
`

export const InfoTitle = styled.span<TextColor>`
  font-size: 28px;
  font-weight: 600;
  color: ${(props) => props.color};
`

export const InfoContainer = styled.div`
  display: flex;
  gap: 160px;
`

export const InfoBox = styled.div`
  display: flex;
  gap: 22px;
  justify-content: flex-start;
  flex-direction: column;
`

export const InfoContent = styled.span<TextColor>`
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.color};
`

type TextColor = {
  color: string
}