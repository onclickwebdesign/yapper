import React from 'react';
import styled from 'styled-components';
import { BackgroundFade } from './styled';

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  margin: -50px auto 0;
  left: 0;
  right: 0;
  font-size: 5rem;
  z-index: 10;
  width: 70px;
`;

const LoadingSpinner = props => {
  const spinners = [
    <Spinner className="la-ball-atom la-3x">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Spinner>,
    <Spinner className="la-ball-climbing-dot la-3x">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Spinner>,
    <Spinner className="la-ball-newton-cradle la-3x">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Spinner>,
    <Spinner className="la-pacman la-3x">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Spinner>,
    <Spinner className="la-square-jelly-box la-3x">
      <div></div>
      <div></div>
    </Spinner>,
    <Spinner className="la-ball-fussion la-3x">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Spinner>,
    <Spinner className="la-timer la-3x"><div></div></Spinner>,
    <Spinner className="fas fa-atom fa-spin" />
  ]
  return (
    <BackgroundFade>
      {spinners[props.random]}
    </BackgroundFade>
  );
};

export default LoadingSpinner;