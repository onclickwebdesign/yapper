import React from 'react';
import styled from 'styled-components';
import { StyledLink, Flex, FlexItem } from '../styled';

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
      <Flex>
        <FlexItem style={lightened}>@{props.handle}</FlexItem>
        <FlexItem style={{marginLeft: 20, ...lightened}}>{props.yipCount} yips</FlexItem>
      </Flex>
      {/* <div style={lightened}>@{props.handle}</div> */}
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