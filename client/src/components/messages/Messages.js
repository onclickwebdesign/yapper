import React, { useState, useEffect } from 'react';
import MessagesList from './MessagesList';
import ConversationContainer from './ConversationContainer';
import styled from 'styled-components';
import { fetchApi } from '../../util';

const MessagesSection = styled.section`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #fff;
  height: 100vh;
`;

const useGetMessages = token => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function handleMessages() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      };

      const response = await fetchApi.fetchGet('/api/message', headers);
      const data = await response.json();
      console.log('from custom hook, messages: ', data);
      setMessages(data.user.messages || []);
    }
    handleMessages();
  }, []);

  return messages;
};

export default props => {
  const session = JSON.parse(localStorage.getItem('usersession'));
  const [token, setToken] = useState(session ? session.token : null);
  const [body, setBody] = useState('');
  const [currentConversation, setCurrentConversation] = useState({ handle: 'crazyantoine', fullName: '', conversation: [] });
  const messages = useGetMessages(token);
  
  const startConversation = async (id, handle) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    };

    const data = { body };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/message/${id}` : `/api/message/${handle}`;
    
    const response = await fetchApi.fetch(url, headers, JSON.stringify(data), method);
    const sent = await response.json();
    console.log('sent message: ', sent);
  }

  const loadConversation = async (id, handle) => {
    console.log('loadConversation: ', id, handle);

    // fetch call to get entire conversation
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    };

    const response = await fetchApi.fetchGet(`/api/message/${id}`, headers);
    const conversation = await response.json();
    console.log('message: ', conversation);

    setCurrentConversation(conversation.message);
  };

  return (
    <MessagesSection>
      <MessagesList messages={messages} loadConversation={loadConversation} />
      <ConversationContainer {...currentConversation} setBody={setBody} startConversation={startConversation} body={body} />
    </MessagesSection>
  );
  
}
