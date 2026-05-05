import React from "react";
import styled from "styled-components";

export type BaseModalType = {
  onClose: () => void;
  children?: React.ReactNode;
}

export const BaseModal = ({children, onClose}: BaseModalType) => {

  return(
    <>
      <BackDrop onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </BackDrop>
    </>
  )
}

const BackDrop = styled.div`
  top: 0;
  left: 0;
  background-color: rgba(194, 194, 194, 0.4);
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`