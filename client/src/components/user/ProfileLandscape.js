import React from 'react';
import styled from 'styled-components';

const ProfileLandscapeContainer = styled.div`
  background: rgb(204, 214, 221);
  opacity: 0.75;
  height: 300px;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  position: relative;
  top: -50px;
`;

const ProfileLandscape = props => {
  const imageT = 'https://www.atlasandboots.com/wp-content/uploads/2019/05/alpamayo-most-beautiful-mountains-in-the-world-1024x683.jpg';
  return (
    <ProfileLandscapeContainer>
      {/* <img src={props.landscapeImage} alt="User Profile Landscape" /> */}
      <StyledImage src={imageT} alt="User Profile Landscape" />
    </ProfileLandscapeContainer>
  );
};

export default ProfileLandscape;