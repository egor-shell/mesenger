import React, { useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import MessageField from '../MessageField/MessageField';
import SendMessage from '../SendMessage/SendMessage';
import Header from '../Header/Header';
import ChatList from '../ChatList/ChatList';
import queryString from 'query-string'
import io from 'socket.io-client'
import {
  // getChatId,
  sender,
  toChat,
  selectMessages,
  // selectChat,
  getName,
  getRoom,
  selectName,
  selectRoom
} from '../../features/slice/messageSlice'

import {
    Link,
    useParams
  } from "react-router-dom";

let socket

// eslint-disable-next-line react/prop-types
function Layout({ location }) {
  const dispatch = useDispatch(),
    messages = useSelector(selectMessages),
    // chats = useSelector(selectChat),
    name = useSelector(selectName),
    room = useSelector(selectRoom),
    ENDPOINT = 'localhost:5000'
    console.log(name, room)
    
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const { name, room }= queryString.parse(location.search)

    socket = io(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']})

    console.log(name, room)

    socket.emit('join', { name, room })

    return () => {
      socket.emit('disconnect')

      socket.off()
    }
  // eslint-disable-next-line react/prop-types
  }, [ENDPOINT, location.search])
  const send = (objMsg) => {
    const newMesId = messages.length
    dispatch(sender({...objMsg, id: newMesId})),
    dispatch(toChat(newMesId))
  }
  const prevMes = usePrevious(messages.length)

  return (
    <div className='container'>
      <h3>{room}</h3>
      <form action="">
        <input id="m" /><button onClick="submitMessage(event)">Send</button>
      </form>
    </div>
  )
}
  // useEffect(() => {
  //   if(prevMes < messages.length && messages[messages.length - 1].author === 'Me') {
  //     const BOT_MESSAGE = {
  //       message: 'I do not answer you. I am robot',
  //       author: 'Bot',
  //       id: messages.length
  //     }
  //     setTimeout(
  //       () => {
  //         dispatch(sender(BOT_MESSAGE))
  //         dispatch(toChat(BOT_MESSAGE.id))
  //       },
  //       2000
  //       );
  //     }
  //   })
    // const { chatId } = useParams()
    // console.log(chatId - 1)
    // dispatch(getChatId(chatId - 1))
    
    // if (!chatId) {
    //   return (
    //     <div className="App-field">
    //       <Header />
    //       <Link to="/">
    //         <button onClick={() => dispatch(getName(''), getRoom(''))}>
    //           Главная
    //         </button>
    //       </Link>
    //       <div className="App-block">
    //         <ChatList chats={chats} />
    //       </div>
    //     </div>
    //   );
    // }
//     return (
//       <div className="App-field">
//       <Header chatId={room}/>
//       <Link to="/chat">Главная</Link>
//       <div className="App-block">
//         {/* <ChatList chats={chats} /> */}
//         <div className="Message-Block">
//           <MessageField />
//           <SendMessage send={send} />
//         </div>
//       </div>
//     </div>
//   );
// }
export default Layout;