import React from 'react';
import { useLocation } from 'react-router-dom';
import { useChat } from 'hooks'
import { Col, Container, Row } from 'react-bootstrap'
import { Header, MessageField, SendMessage } from '../index'
import { useSelector } from 'react-redux';
import { selectUsername } from 'features/user/userSlice';
import Users from 'components/Users/users';
// import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
export function Layout() {
  const path = useLocation(),
    roomId = path.pathname.substr(1),
    username = useSelector(selectUsername),
    { messages, sendMessage, removeMessage, users, exitUser, privateMessage } = useChat(roomId)

  return (

    <Container>
      <Header exit={exitUser} sending={privateMessage}/>
      <Row>
        <Col sm={2}>
          <Users users={users}/>
        </Col>
        <Col sm={10}>
          <MessageField messages={messages} removeMessage={removeMessage}/>
          <SendMessage username={username} send={sendMessage} />
        </Col>
      </Row>
    </Container>
  );
}