import React from 'react';
import styled from 'styled-components';

const ConversationContainer = props => {
  return (
    <div>
      {props.fullName}<br/>
      {props.handle}
      <input type="text" name="body" value={props.body} onChange={props.handleInputChange} />
      <button onClick={() => props.startConversation(props.messageId, props.handle)}>Send</button>
    </div>
  );
};

export default ConversationContainer;
