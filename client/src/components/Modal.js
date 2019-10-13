import React from 'react';
import styled from 'styled-components';
import { RemoveIcon, BackgroundFade } from './styled';

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
    <BackgroundFade onClick={props.closeModal}>
      <ModalContainer id="modalContainer">
        <RemoveIcon onClick={props.closeModal}>&times;</RemoveIcon>
        <ModalBody id="modalBody">{props.body}</ModalBody>
      </ModalContainer>
    </BackgroundFade>
  )
};

export default Modal;