import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProfileInfoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-left: 1rem;
  padding-top: 4.25rem;
`;

const PositionedImage = styled.div`
  position: absolute;
  top: -50%;
  width: 175px;
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FlexItem = styled.div`
  margin: 5px 10px 0 0;
`;

const StyledLink = styled(Link)`
  color: #fff;
  &:hover {
    text-decoration: underline;
    color: #fff;
  }
`;

const FollowButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

const lightened = {
  opacity: '0.5',
  fontWeight: 300
};

// Only for public profile
const GetFollowButton = (isFollowing, doFollow) => {
  return isFollowing ? 
    <FollowButton onClick={() => doFollow(true)} className="btn btn-primary yapper-btn-primary">Unfollow</FollowButton> : 
    <FollowButton onClick={() => doFollow(false)} className="btn btn-primary yapper-btn-primary">Follow</FollowButton>;
};

const ProfileInfo = props => { 
  return (
    <ProfileInfoContainer>
      {props.publicProfile && props.token ? 
        GetFollowButton(props.isFollowing, props.doFollow) : ''}
      <PositionedImage>
        {props.children}
      </PositionedImage>

      <h4 style={{marginBottom:5}}>{props.fullName} <span className="fa fa-lock"></span></h4>
      <div style={lightened}>@{props.handle}</div>
      <div style={{margin:'10px 0'}}>{props.occupation} at {props.employer}</div>
      <Flex>
        <FlexItem style={lightened}>
          <span className="fas fa-map-marker-alt"></span> {props.locationCity}, {props.locationState}
        </FlexItem>
        <FlexItem style={lightened}>
          <span className="fa fa-calendar"></span> Joined {props.dateJoined}
        </FlexItem>
      </Flex>
      <Flex>
        <FlexItem style={{marginRight:20}}>
          <StyledLink to={`/${props.handle}/following`}>
            <strong>{props.followingCount}</strong> 
            <span style={{fontWeight:'300'}}> Following</span>
          </StyledLink>
        </FlexItem>
        <FlexItem>
          <StyledLink to={`/${props.handle}/followers`}>
            <strong>{props.followerCount}</strong> 
            <span style={{fontWeight:'300'}}>{props.followerCount === 1 ? ' Follower' : ' Followers'}</span>
          </StyledLink>
        </FlexItem>
      </Flex>
    </ProfileInfoContainer>
  )
};

export default ProfileInfo;