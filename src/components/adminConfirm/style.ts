// 관리자 대여/반납 확인 모달 전용 스타일 모음이다.
import styled from "styled-components";

export const Modal = styled.div`
  width: 460px;
  padding: 44px 28px 24px;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.14);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const Title = styled.h3`
  margin: 0;
  color: #262626;
  font-size: 28px;
  font-weight: 700;
`;

export const Message = styled.p`
  margin: 0;
  color: #4f4f4f;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  line-height: 1.5;
`;

export const Actions = styled.div`
  width: 100%;
  margin-top: 22px;
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 12px;
`;

export const CancelButton = styled.button`
  height: 52px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background: #ffffff;
  color: #8f8f8f;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export const ConfirmButton = styled.button`
  height: 52px;
  border-radius: 10px;
  border: none;
  background: #8fe48f;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

