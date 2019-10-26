import React from 'react';
import styled from 'styled-components';
import { LightenedText, Avatar, AvatarLink } from '../styled';
import { constants } from '../../util';

const MessagesListUserContainer = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;

  &:hover {
    background: #ddd;
  }
`;

const FlexItem = styled.div`
  padding: 0 0.5rem;
`;

const MessagesListUser = props => {
  return (
    <MessagesListUserContainer onClick={() => props.loadConversation(props.messageId, props.handle)}>
      <AvatarLink 
        to={`/${props.user.handle}`} 
        style={{background:`url(${props.user.profileImage || constants.DEFAULT_USER_IMAGE}) center center no-repeat`}}>
        <Avatar style={{display:'none'}} src={props.user.profileImage || constants.DEFAULT_USER_IMAGE} alt="Yapper User" />
      </AvatarLink>

      <FlexItem>
        Alexander Atallah <LightenedText>@potato</LightenedText>
      </FlexItem>

      <FlexItem>
        2h ago
      </FlexItem>
    </MessagesListUserContainer>
  );
};

export default MessagesListUser;
