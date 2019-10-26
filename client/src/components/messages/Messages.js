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

    this.state = { messages: [] };
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

  };

  render() {
    return (
      <MessagesSection>
        <MessagesList messages={this.state.messages} loadConversation={this.loadConversation} />
        <ConversationContainer />
      </MessagesSection>
    )
  }
}
