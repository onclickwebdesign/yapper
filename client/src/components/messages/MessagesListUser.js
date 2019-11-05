import React from 'react';
import styled from 'styled-components';
import { LightenedText, Avatar, AvatarLink } from '../styled';
import { constants } from '../../util';

const MessagesListUserContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;

const FlexItem = styled.div`
  padding: 0 0.5rem;
`;

const MessagesListUser = props => {
  return (
    <MessagesListUserContainer onClick={() => props.loadConversation(props.id, props.handle)}>
      <AvatarLink 
        to={`/${props.handle}`} 
        style={{background:`url(${props.profileImage || constants.DEFAULT_USER_IMAGE}) center center no-repeat`}}>
        <Avatar style={{display:'none'}} src={props.profileImage || constants.DEFAULT_USER_IMAGE} alt="Yapper User" />
      </AvatarLink>

      <FlexItem>
        {props.name} <LightenedText>@{props.handle}</LightenedText>
      </FlexItem>

      <FlexItem>
        2h ago
      </FlexItem>
    </MessagesListUserContainer>
  );
};

export default MessagesListUser;
