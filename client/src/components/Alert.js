import React from 'react';
import styled from 'styled-components';

const AlertContainer = styled.div`
  position: fixed;
  display: inline-block;
  border-radius: 10px;
  left: 0;
  right: 0;
  bottom: 3rem;
  padding: 10px;
  margin: 10px auto 0;
  text-align: center;
  color: #fff;
  font-size: 1rem;
  z-index: 10;
  max-width: 420px;
`;

const Alert = props => {
  const styles = props.type === 'danger' ? {color: '#721c24', background: '#f8d7da', borderColor: '#f5c6cb'} : {color: '#155724', background: '#d4edda', borderColor: '#c3e6cb'};
  return (
    <AlertContainer style={styles}>
      {props.message}
    </AlertContainer>
  )
};

export default Alert;