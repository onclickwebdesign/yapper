import React from 'react';
import styled from 'styled-components';

const ConversationSection = styled.section`
  flex-grow: 1;
  padding: 1rem;
`;

const CurrentUserContainer = styled.div`
  border-bottom: 1px solid #fff;
  padding: 0.5rem;
`;

const ConversationContainer = props => {
  return (
    <ConversationSection>
      <CurrentUserContainer>
      <h1> 
         
      </h1>
        {props.fullName}<br/>
        {props.handle}
      </CurrentUserContainer>
      <br/><br/>
      {props.conversation.map((msg, index) => <div key={index}><small>{msg.handle}</small>{msg.body}</div> )}
      <input type="text" name="body" value={props.body} onChange={(e) => props.setBody(e.target.value)} />
      <button onClick={() => props.startConversation(props.messageId, props.handle)}>Send</button>
    </ConversationSection>
  );
};

export default ConversationContainer;
