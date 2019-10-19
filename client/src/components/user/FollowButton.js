import React from 'react';
import styled from 'styled-components';

const FollowButtonStyled = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

const FollowButton = props => {
  return (
    props.isFollowing ? 
      <FollowButtonStyled onClick={() => props.doFollow(true, props.handle, props.index)} className="btn btn-primary yapper-btn-primary">Unfollow</FollowButtonStyled> : 
      <FollowButtonStyled onClick={() => props.doFollow(false, props.handle, props.index)} className="btn btn-primary yapper-btn-primary">Follow</FollowButtonStyled>
  );
};

export default FollowButton;