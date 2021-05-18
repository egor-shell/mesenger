import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import MessageField from '../MessageField/MessageField';
import SendMessage from '../SendMessage/SendMessage';
import Header from '../Header/Header';
// import ChatList from '../ChatList/ChatList';
import queryString from 'query-string'
import io from 'socket.io-client'
import {
  sender,
  // toChat,
  selectMessages,
  // selectChat,
  getName,
  getRoom,
  selectName,
  selectRooms
} from '../../features/slice/messageSlice'

import {
    Link,
  } from "react-router-dom";

let socket

// eslint-disable-next-line react/prop-types
function Layout({ location }) {
  const dispatch = useDispatch(),
    messages = useSelector(selectMessages),
    // [message, setMessage] = useState(''),
    // chats = useSelector(selectChat),
    // eslint-disable-next-line no-unused-vars
    name = useSelector(selectName),
    // eslint-disable-next-line no-unused-vars
    rooms = useSelector(selectRooms),
    ENDPOINT = 'http://192.168.0.7:5000',
    // eslint-disable-next-line react/prop-types
    naming = queryString.parse(location.search),
    room = naming.room
    
  // function usePrevious(value) {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // }
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const { name, room }= queryString.parse(location.search)

    socket = io(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']})

    socket.emit('join', { name, room })

    return () => {
      socket.on('disconnect')

      socket.off()
    }
  // eslint-disable-next-line react/prop-types
  }, [ENDPOINT, location.search])
  // const send = (objMsg) => {
  //   const newMesId = messages.length
  //   dispatch(sender({...objMsg, id: newMesId})),
  //   dispatch(toChat(newMesId))
  // }
  const sendMessage = (objMsg) => {
    if(objMsg) {
      socket.emit('sendMessage', objMsg)
    }
    console.log(messages)
  }
  useEffect(() => {
    socket.on('message', (message) => {
      
      // eslint-disable-next-line react/prop-types
      const { name }= queryString.parse(location.search)
      if(name.trim().toLowerCase() === message.author) {
        message.author = 'Me'
      }
        dispatch(sender(message))
      socket.off('message')
    })
  }, [messages])
  return (
    <div className="App-field">
    <Header chatId={room}/>
    <Link to="/">
      <button onClick={() => dispatch(getName(''), getRoom(''), socket.disconnect())}>
        Главная
      </button>
    </Link>
    <div className="App-block">
      {/* <ChatList chats={chats} /> */}
      <div className="Message-Block">
        <MessageField />
        <SendMessage send={sendMessage} />
      </div>
    </div>
  </div>
  );
}
export default Layout;