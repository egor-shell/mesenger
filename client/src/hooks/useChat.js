import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useBeforeUnload } from '../hooks/useBeforeUnload'
import { useSelector } from 'react-redux'
import { selectUsername, selectId } from 'features/user/userSlice'
const SERVER_URL = 'http://192.168.0.7:5000'

export const useChat = (roomId) => {
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const username = useSelector(selectUsername)
  const userId = useSelector(selectId)

  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: { roomId },
      transports: ['websocket', 'polling', 'flashsocket']
    })
    console.log(socketRef.current)

    socketRef.current.emit('user:get')

    socketRef.current.emit('user:add', { username, userId })

    socketRef.current.on('user', (data) => {
      console.log(socketRef.current.id)
      setUsers(data)
    })

    socketRef.current.emit('message:get')

    socketRef.current.on('messages', (messages) => {
      const newMessages = messages.map((msg) =>
        msg.senderName === username ? { ...msg, currentUser: true } : msg
      )
      setMessages(newMessages)
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [roomId, userId, username])

  const sendMessage = ({ senderName, messageText }) => {
    console.log(users)
    socketRef.current.emit('message:add', {
      userId,
      messageText,
      senderName
    })
  }

  const removeMessage = (id) => {
    socketRef.current.emit('message:remove', id)
  }

  const exitUser = (id) => {
    socketRef.current.emit('user:leave', id)
  }
  
  useBeforeUnload(() => {
    socketRef.current.emit('user:leave', userId)
  })

  const privateMessage = (userId) => {
    let id = socketRef.current.id
    socketRef.current.emit('privateMessage', {id, userId})
  }

  return { users, messages, sendMessage, removeMessage, username, exitUser, privateMessage }
}