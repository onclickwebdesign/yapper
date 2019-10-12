import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProfileInfoContainer = styled.div`
  position: relative;
  width: 50%;
  padding-left: 1rem;
  padding-top: 3rem;
`;

const PositionedImage = styled.div`
  position: absolute;
  top: -50%;
  width: 150px;
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FlexItem = styled.div`
  margin: 5px 10px 0 0;
`;

const white = {
  color: '#fff'
};

const lightened = {
  opacity: '0.35'
};

const ProfileInfo = props => {
  return (
    <ProfileInfoContainer>
      <PositionedImage>
        {props.children}
      </PositionedImage>

      <h4 style={{marginBottom:5}}>{props.fullName} <span className="fa fa-lock"></span></h4>
      <div style={lightened}>@{props.handle}</div>
      <div style={{margin:'10px 0'}}>{props.occupation} at {props.employer}</div>
      <Flex>
        <FlexItem style={lightened}><span className="fas fa-map-marker-alt"></span> {props.locationCity}, {props.locationState}</FlexItem>
        <FlexItem style={lightened}><span className="fa fa-calendar"></span> Joined {props.dateJoined}</FlexItem>
      </Flex>
      <Flex>
        <FlexItem style={{marginRight:20}}><Link style={white} to={`/${props.handle}/following`}><strong>{props.followingCount}</strong> <span style={lightened}>Following</span></Link></FlexItem>
        <FlexItem><Link style={white} to={`/${props.handle}/followers`}><strong>{props.followerCount}</strong> <span style={lightened}>Followers</span></Link></FlexItem>
      </Flex>
    </ProfileInfoContainer>
  )
};

export default ProfileInfo;