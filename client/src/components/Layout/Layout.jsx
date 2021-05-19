import React from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from 'hooks'
import { Container } from 'react-bootstrap'
import { Header, MessageField, SendMessage } from '../index'
import { useSelector } from 'react-redux';
import { selectUsername } from 'features/user/userSlice';
// import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
export function Layout() {
  const { roomId } = useParams(),
    username = useSelector(selectUsername),
    { messages, sendMessage, removeMessage } = useChat(roomId)

  return (

    <Container>
      <Header />
      <MessageField messages={messages} removeMessage={removeMessage}/>
      <SendMessage username={username} send={sendMessage} />
    </Container>
  );
}