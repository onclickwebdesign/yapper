import React from 'react';
import styled from 'styled-components';

const ConversationContainer = props => {
  return (
    <div>
      {props.fullName}<br/>
      {props.handle}
      <br/><br/>
      {props.conversation.map((msg, index) => <div key={index}><small>{msg.handle}</small>{msg.body}</div> )}
      <input type="text" name="body" value={props.body} onChange={props.handleInputChange} />
      <button onClick={() => props.startConversation(props.messageId, props.handle)}>Send</button>
    </div>
  );
};

export default ConversationContainer;
