import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useChat } from 'hooks'
import { Col, Container, Row } from 'react-bootstrap'
import { Header, MessageField, SendMessage } from '../index'
import { selectUsername } from 'features/user/userSlice';
import Users from 'components/Users/users'
import { useSelector } from 'react-redux';
import { EmptyField } from '../EmptyField/emptyField'

export function Layout() {
  const path = useLocation(),
    roomId = path.pathname.substr(1),
    username = useSelector(selectUsername),
    history = useHistory(),
    { chatId, messages, sendMessage, removeMessage, usersList, exitUser, checkChat, getChats } = useChat(roomId)

    const escFunction = ((event) => {
      if(event.key === 'Escape') {
        history.push('/im')
      }
    });

  React.useEffect(() => {
      document.addEventListener("keydown", escFunction, false);
      const path = localStorage.getItem('path')
      window.onload = () => {
        history.push(path)
      }
      if(path !== null) {
        checkChat(path.substr(4))
      }
      localStorage.setItem('path', location.pathname)
  
      return () => {
        document.removeEventListener("keydown", escFunction, false);
      };
    }, [usersList, localStorage.getItem('path')]);

    if(path.pathname === '/im') {
      return (
        <Container>
          <Header exit={exitUser} sending={checkChat}/>
          <Row>
            <Col sm={4}>
              <Users users={usersList} checkChat={checkChat} getChats={getChats} chatId={chatId} />
            </Col>
            <Col sm={8}>
              <EmptyField />
            </Col>
          </Row>
        </Container>
      );
    }

  return (
    <Container>
      <Header exit={exitUser} sending={checkChat}/>
      <Row>
        <Col sm={4}>
          <Users users={usersList} checkChat={checkChat} getChats={getChats} chatId={chatId} />
        </Col>
        <Col sm={8}>
          <MessageField messages={messages} removeMessage={removeMessage}/>
          <SendMessage username={username} send={sendMessage} checkChat={checkChat} />
        </Col>
      </Row>
    </Container>
  );
}