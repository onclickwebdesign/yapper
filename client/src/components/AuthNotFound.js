import React from 'react';
import styled from 'styled-components';

const Container404 = styled.section`
  background: url('/static/images/nospoon.jpg') center center no-repeat;
  background-size: cover;
  padding: 4rem 2rem;
  position: relative;
`;

const Fade404 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.75);
`;

const Text404 = styled.h2`
  position: relative;
  z-index: 2;
  font-size: 6rem;
`;

const Message = styled.h3`
  font-size: 4rem;
  margin-top: 2rem;
  position: relative;
  z-index: 2;
`;

const AuthNotFound = () => {
  return (
    <Container404>
      <Fade404 />
      <Text404>404.</Text404>
      <Message>There is no page.</Message>
    </Container404>
  );
};

export default AuthNotFound;