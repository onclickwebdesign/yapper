import React from 'react';
import styled from 'styled-components';
import MessagesListUser from './MessagesListUser';

const MessagesList = props => {
  return (
    props.messages.map((message, idx) => (
      message && <MessagesListUser key={message.id} loadConversation={props.loadConversation} {...message} />
    ))
  );
};

export default MessagesList;
