import styled from "styled-components";

export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(24px, 3vw, 40px);
  background: #fafafa;
`;

export const FormSection = styled.section`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(48px, 3.4vw, 60px) clamp(40px, 3vw, 52px);
  background: #ffffff;
  box-sizing: border-box;
`;

export const FormInner = styled.div`
  width: 100%;
  max-width: 360px;
`;

export const Dots = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

export const Dot = styled.div<{ $active: boolean; $current: boolean }>`
  width: ${(props) => (props.$current ? "34px" : "10px")};
  height: 10px;
  border-radius: 999px;
  background: ${(props) => (props.$active ? "#7ee37b" : "#d4d4d4")};
`;

export const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 40px;
  line-height: 1.2;
  font-weight: 800;
  color: #202020;
`;

export const Text = styled.p`
  margin: 0 0 26px;
  font-size: 16px;
  line-height: 1.45;
  color: #5f5f5f;
  word-break: keep-all;
  white-space: pre-line;
`;

export const Field = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 700;
  color: #4c4c4c;
`;

export const CodeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 10px;
  align-items: center;
`;

export const CodeInputWrap = styled.div`
  position: relative;
  width: 100%;

  input {
    padding-right: 56px;
  }
`;

export const Timer = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #ff6a6a;
`;

export const ReSend = styled.button`
  height: 52px;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  background: #ffffff;
  font-size: 16px;
  color: #676767;
  cursor: pointer;
`;

export const Error = styled.div`
  min-height: 24px;
  margin-top: -4px;
  margin-bottom: 4px;
  font-size: 16px;
  line-height: 1.3;
  color: #ef5353;
`;

export const ButtonWrap = styled.div`
  margin-top: 18px;
`;
