import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LightenedText, StyledLink, Flex, FlexItem } from '../styled';
import FollowButton from '../user/FollowButton';

const MiniProfileContainer = styled.div`
  position: relative;
  border-radius: 5px;
  background: #333;
  box-shadow: 0 2px 10px 0px #222;
  height: 100%;
`;

const BottomContainer = styled.div`
  padding: 1rem;
`;

const MiniProfile = props => {
  return (
    <MiniProfileContainer>
      <Link to={`/${props.user.handle}`} style={{background:`url(${props.user.profileImage}) center center no-repeat`, backgroundSize:'cover', display: 'block', width: '50%'}}>
        <img src={props.user.profileImage} alt={`${props.user.handle} profile`} style={{visibility:'hidden'}} />
      </Link>
      <BottomContainer>
        <h4>{props.user.fullName}</h4>

        <Flex>
          <FlexItem>
            <LightenedText>@{props.user.handle}</LightenedText>
          </FlexItem>
          <FlexItem style={{marginLeft:20}}>
            <LightenedText>{props.user.yipCount} yips</LightenedText>
          </FlexItem>
        </Flex>
        <div style={{margin:'10px 0'}}>{props.user.occupation} at {props.user.employer}</div>
        <Flex>
          <FlexItem style={{marginRight:20}}>
            <StyledLink to={`/${props.user.handle}/following`}>
              <strong>{props.user.followingCount}</strong> 
              <span style={{fontWeight:'300'}}> Following</span>
            </StyledLink>
          </FlexItem>
          <FlexItem>
            <StyledLink to={`/${props.user.handle}/followers`}>
              <strong>{props.user.followerCount}</strong> 
              <span style={{fontWeight:'300'}}>{props.user.followerCount === 1 ? ' Follower' : ' Followers'}</span>
            </StyledLink>
          </FlexItem>
        </Flex>
        {props.token ? <FollowButton index={props.index} isFollowing={props.user.isFollowing} doFollow={props.doFollow} handle={props.user.handle} /> : ''}
      </BottomContainer>
    </MiniProfileContainer>
  );
};

export default MiniProfile;