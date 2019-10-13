import React from 'react';
import styled from 'styled-components';
import { RemoveIcon } from './styled';

const ModalFade = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9;
`;

const ModalContainer = styled.div`
  position: absolute;
  border-radius: 10px;
  left: 0;
  right: 0;
  top: 2rem;
  padding: 0 2rem;
  margin: 0 auto;
  text-align: center;
  color: #fff;
  font-size: 1rem;
  z-index: 10;
  width: 80%;
  
  background-color: rgb(30, 35, 38);
`;

const ModalBody = styled.div`
  width: 90%;
  margin: 0 auto;
`;


const Modal = props => {
  return (
    <ModalFade onClick={props.closeModal}>
      <ModalContainer id="modalContainer">
        <RemoveIcon onClick={props.closeModal}>&times;</RemoveIcon>
        <ModalBody id="modalBody">{props.body}</ModalBody>
      </ModalContainer>
    </ModalFade>
  )
};

export default Modal;