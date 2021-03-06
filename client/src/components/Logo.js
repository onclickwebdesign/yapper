import React from 'react';
import styled from 'styled-components';

const Logo = props => {
  const StyledLogo = styled.div`
    font-size: 3rem;
    font-family: Courier;
    font-weight: 300;
  `;

  return <StyledLogo style={props.style}>Y</StyledLogo>;
};

export default Logo;