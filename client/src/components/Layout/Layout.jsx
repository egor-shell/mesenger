import React, { useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import MessageField from '../MessageField/MessageField';
import SendMessage from '../SendMessage/SendMessage';
import Header from '../Header/Header';
import ChatList from '../ChatList/ChatList';

import {
  getChatId,
  sender,
  toChat,
  selectMessages,
  selectChat
} from '../../features/slice/messageSlice'

import {
    Link,
    useParams
  } from "react-router-dom";

function Layout() {
  const messages = useSelector(selectMessages)
  const chats = useSelector(selectChat)
  const dispatch = useDispatch()
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const send = (objMsg) => {
    const newMesId = messages.length
    dispatch(sender({...objMsg, id: newMesId})),
    dispatch(toChat(newMesId))
  }
  const prevMes = usePrevious(messages.length)
  useEffect(() => {
    if(prevMes < messages.length && messages[messages.length - 1].author === 'Me') {
      const BOT_MESSAGE = {
        message: 'I do not answer you. I am robot',
        author: 'Bot',
        id: messages.length
      }
      setTimeout(
        () => {
          dispatch(sender(BOT_MESSAGE))
          dispatch(toChat(BOT_MESSAGE.id))
        },
        2000
        );
      }
    })
    const { chatId } = useParams()
    console.log(chatId - 1)
    dispatch(getChatId(chatId - 1))
    
    if (!chatId) {
      return (
        <div className="App-field">
          <Header />
          <Link to="/">Главная</Link>
          <div className="App-block">
            <ChatList chats={chats} />
          </div>
        </div>
      );
    }
    return (
      <div className="App-field">
      <Header chatId={chatId}/>
      <Link to="/chat">Главная</Link>
      <div className="App-block">
        <ChatList chats={chats} />
        <div className="Message-Block">
          <MessageField />
          <SendMessage send={send} />
        </div>
      </div>
    </div>
  );
}
export default Layout;