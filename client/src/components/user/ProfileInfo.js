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
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FlexItem = styled.div`
  width: 50%;
  margin-top: 5px;
`;

const white = {
  color: '#fff'
};

const lightened = {
  opacity: '0.75'
};

const ProfileInfo = props => {
  console.log('profileInfo props: ', props);
  return (
    <ProfileInfoContainer>
      <PositionedImage>
        {props.children}
      </PositionedImage>

      <h4 style={{marginBottom:5}}>{props.fullName} <span className="fa fa-lock"></span></h4>
      <div style={lightened}>@{props.handle}</div>
      <div style={{margin:'10px 0'}}>{props.occupation}</div>
      <Flex>
        <FlexItem style={lightened}><span className="fa fa-location"></span> {props.location}</FlexItem>
        <FlexItem style={lightened}><span className="fa fa-calendar"></span> Joined {props.dateJoined}</FlexItem>

        <FlexItem><Link style={white} to={`/${props.handle}/following`}><strong>{props.followingCount}</strong> <span style={lightened}>Following</span></Link></FlexItem>
        <FlexItem><Link style={white} to={`/${props.handle}/followers`}><strong>{props.followerCount}</strong> <span style={lightened}>Followers</span></Link></FlexItem>
      </Flex>
    </ProfileInfoContainer>

  )
};

export default ProfileInfo;