import React from 'react';
import styled from 'styled-components';
import MessagesListUser from './MessagesListUser';

const MessagesList = props => {
  return (
    props.messages.length ? props.messages.map((message, idx) => (
      message && <MessagesListUser key={message.id} loadConversation={props.loadConversation} {...message} />
    )) : <div>No messages in your inbox.</div>
  );
};

export default MessagesList;
