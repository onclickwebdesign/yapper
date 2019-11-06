import React, { Component } from 'react';
import MessagesList from './MessagesList';
import ConversationContainer from './ConversationContainer';
import styled from 'styled-components';
import { fetchApi } from '../../util';

const MessagesSection = styled.section`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #fff;
`;

export default class Messages extends Component {
  constructor(props) {
    super(props);
    const session = JSON.parse(localStorage.getItem('usersession'));

    this.state = { 
      messages: [],
      user: session,
      token: session.token,
      body: '',
      currentConversation: { handle: 'crazyantoine', fullName: '', conversation: [] }
    };
  }

  async componentDidMount() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.state.token}`
    };

    const response = await fetchApi.fetchGet('/api/message', headers);
    const messages = await response.json();
    console.log('messages: ', messages);
    this.setState({ messages: messages.user.messages || [] });
  }

  startConversation = async (id, handle) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.state.token}`
    };

    const data = { body: this.state.body };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/message/${id}` : `/api/message/${handle}`;
    
    const response = await fetchApi.fetch(url, headers, JSON.stringify(data), method);
    const sent = await response.json();
    console.log('sent message: ', sent);
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  loadConversation = async (id, handle) => {
    console.log('loadConversation: ', id, handle);

    // fetch call to get entire conversation
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.state.token}`
    };

    const response = await fetchApi.fetchGet(`/api/message/${id}`, headers);
    const conversation = await response.json();
    console.log('message: ', conversation);
    this.setState({ currentConversation: conversation.message });
  };

  render() {
    return (
      <MessagesSection>
        <MessagesList messages={this.state.messages} loadConversation={this.loadConversation} />
        <ConversationContainer {...this.state.currentConversation} handleInputChange={this.handleInputChange} startConversation={this.startConversation} body={this.state.body} />
      </MessagesSection>
    )
  }
}
