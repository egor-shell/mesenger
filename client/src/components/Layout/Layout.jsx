import React from 'react';
import { useParams } from 'react-router-dom';
import { useChat, useLocalStorage } from 'hooks'
import { Container } from 'react-bootstrap'
import { Header, MessageField, SendMessage } from '../index'

// eslint-disable-next-line react/prop-types
export function Layout() {
  const { roomId } = useParams(),
    name = useLocalStorage('name'),
    { messages, sendMessage, removeMessage } = useChat(roomId)
  return (

    <Container>
      <Header chatId={roomId}/>
      <MessageField messages={messages} removeMessage={removeMessage}/>
      <SendMessage name={name} send={sendMessage} />
    </Container>
  );
}