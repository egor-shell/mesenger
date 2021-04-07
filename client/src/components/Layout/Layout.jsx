import React, { useEffect, useState } from 'react';
import MessageField from '../MessageField/MessageField';
import SendMessage from '../SendMessage/SendMessage';
import Header from '../Header/Header';
import ChatList from '../ChatList/ChatList';

import {
    Link,
  } from "react-router-dom";

function Layout() {
    const [messages, sendMessages] = useState([{message: "Hello", author: "Bot"}, {message: "World", author: "Bot"}])
  const send = (objMsg) => {
    sendMessages(prevMsg => {
      return [
        ...prevMsg,
        objMsg
      ]
    })
  }
  useEffect(() => {
    if(messages.length > 2 && messages.length % 2 > 0) {
      const BOT_MESSAGE = {
        message: 'I do not answer you. I am robot',
        author: 'Bot'
      };
      setTimeout(
        () => {
          sendMessages(prevMsg => { return [ ...prevMsg, BOT_MESSAGE]});
        },
        2000
      );
    }
  })
  return (
    <div className="App-field">
      <Header />
      <Link to="/">Главная</Link>
      <div className="App-block">
        <ChatList />
        <div className="Message-Block">
          <MessageField messages={messages} />
          <SendMessage send={send}/>
        </div>
      </div>
    </div>
  );
}
export default Layout;