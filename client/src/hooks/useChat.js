import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { selectUsername, selectId } from 'features/user/userSlice'
import { selectUsersId } from 'features/usersId/usersId'
import { newUsersInChat, clearUsersInChat } from 'features/usersInChat/usersInChat'
import { clearChatId, newChatId, selectChatId } from 'features/chatId/chatIdSlice'
import { clearChats, newChats } from 'features/chats/chatsSlice'
import {REACT_APP_API_URL} from "../config/apiUrl";
import {useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "../query/user";
// import { pushing } from '../features/messages/messagesSlice'
const SERVER_URL = REACT_APP_API_URL

export const useChat = (roomId) => {
  // const [users, setUsers] = useState(null)
  const [usersList, setUsersList] = useState([])
  const [messages, setMessages] = useState([])
  const [chatId, setChatId] = useState(null)
  const username = useSelector(selectUsername)
  const userId = useSelector(selectId)
  const usersId = useSelector(selectUsersId)
  const idChat = useSelector(selectChatId)
  // const usersInChat = useSelector(selectUsersInChat)
  const dispatch = useDispatch()
  const { refetch } = useQuery(GET_ALL_USERS)

  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: { roomId },
      transports: ['websocket', 'polling', 'flashsocket'],
      upgrade: false
    })

    socketRef.current.emit('users:get')

    socketRef.current.emit('users:add', { username, userId })

    socketRef.current.on('users', (data) => {
      console.log('USERS')
      setUsersList(data)
    })

    socketRef.current.on('chats', (data) => {
      console.log(data)
      console.log('CHATS')
      dispatch(clearChats())
      dispatch(newChats(data))
    })

    socketRef.current.emit('chat:get', {usersId: usersId, chatId: idChat})

    socketRef.current.on('chat', (data) => {
      const chattingId = data.chatId
      console.log(chattingId)
      if(chattingId === 'undefined') {
        const chatId = data[2]
          const usersList = []
          data.map(i => {
            if(typeof i === 'number') {
              usersList.push(i)
            }
          })
          console.log('DISPATCH')
          dispatch(clearUsersInChat())
          dispatch(newUsersInChat(usersList))
          dispatch(clearChatId())
          return dispatch(newChatId(chatId))  
        } else if (chattingId !== 'undefined' && chattingId !== undefined) {
          console.log('CHAT_ID !== UNDEFINED')
          dispatch(clearChatId())
          dispatch(newChatId(data.chatId))
          const newMessages = data.messages.map((msg) =>
            msg.senderName === username ? { ...msg, currentUser: true } : msg
          )
          setMessages(newMessages)
        }

      })
      socketRef.current.on('chattt', (data) => {
        refetch()
        if(data.messages) {
          const newMessages = data.messages.map((msg) => 
            msg.senderName === username ? { ...msg, currentUser: true } : msg
          )
          setMessages(newMessages)
        } else {
          setMessages([])
        }
      })
    socketRef.current.on('chat:find', (data) => {
      console.log('FIND')
      console.log(data)
    })
    socketRef.current.on('check:chat', (data) => {
      console.log(data)
      setChatId(data.chatId)
      setMessages(data.messages)
    })

    return () => {
      socketRef.current.off('user:get')
      socketRef.current.off('user:add')
      socketRef.current.off('user')
      socketRef.current.off('chat:get')
      socketRef.current.off('chat')
      socketRef.current.off('chattt')
      socketRef.current.disconnect()
    }
  }, [roomId, userId, username])

  // const sendMessage = ({ senderName, messageText }) => {
  const sendMessage = ({ usersId, message }) => {
    console.log(`%c${usersId}`, 'color:yellow; background:black;')
    const {messageText, senderName} = message
    console.log('MESSAGES')
    console.log(messages)
    socketRef.current.emit('message:add', {
      usersId,
      chatId: idChat,
      userId,
      messageText,
      senderName
    })
    socketRef.current.emit('user:addMessage', {
      usersId: usersId
    })
  }

  const removeMessage = (id) => {
    socketRef.current.emit('message:remove', id)
  }

  const exitUser = (id) => {
    socketRef.current.emit('user:leave', id)
  }
  
  // useBeforeUnload(() => {
  //   socketRef.current.emit('user:leave', userId)
  // })

  const checkChat = (data) => {
    socketRef.current.emit('chat:check', data)
  }

  const addChat = (data) => {
    let chat = [data]
    socketRef.current.emit('chat:add', chat)
  }

  const getChats = (id) => {
    socketRef.current.emit('chats:get', id)
  }
  // const checkChat = (sender, destination) => {
  //   socketRef.current.emit('checkChat', { sender, destination })
  // }

  return { chatId, usersList, messages, sendMessage, removeMessage, username, exitUser, checkChat, addChat, getChats }
}