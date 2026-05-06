import styled from "styled-components";

export const HeroSection = styled.section`
  flex: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: clamp(28px, 2.4vw, 36px) clamp(24px, 2vw, 28px) clamp(28px, 2.2vw, 34px);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

export const TopBg = styled.div`
  position: absolute;
  top: -48px;
  left: -64px;
  width: 280px;
  height: 136px;
  border-radius: 999px;
  background: #84e580;
`;

export const BottomBg = styled.div`
  position: absolute;
  right: -40px;
  bottom: -50px;
  width: 138px;
  height: 104px;
  border-radius: 999px;
  background: #84e580;
`;

export const ImgWrap = styled.div`
  position: relative;
  width: 100%;
  height: clamp(280px, 20vw, 340px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Welcome = styled.h2`
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 40px;
  line-height: 1.2;
  font-weight: 800;
  color: #202020;
  word-break: keep-all;
`;
