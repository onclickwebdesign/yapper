import React, { Component } from 'react';
import MessagesList from './MessagesList';
import ConversationContainer from './ConversationContainer';
import styled from 'styled-components';
import { fetchApi } from '../../util';

const MessagesSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = { messages: [], currentMessage: {} };
  }

  async componentDidMount() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.state.token}`
    };

    const messages = await fetchApi.fetchGet('/api/message', headers);
    this.setState({ messages });
  }

  loadConversation = (id, handle) => {
    console.log('loadConversation: ', id, handle);
    this.setState({ currentMessage });
  }

  postMessage = (id, handle) => {
    console.log('postMessage: ', id, handle);
  }

  replyMessage = (id, handle) => {
    console.log('replyMessage: ', id, handle);
  
  }

  render() {
    return (
      <MessagesSection>
        <MessagesList messages={this.state.messages.messageUserIds} loadConversation={this.loadConversation} />
        <ConversationContainer currentMessage={this.state.currentMessage} postMessage={this.postMessage} replyMessage={this.replyMessage} />
      </MessagesSection>
    )
  }
}
