import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { nanoid } from 'nanoid'
import { useLocalStorage, useBeforeUnload } from 'react-use'

const SERVER_URL = 'http://192.168.0.7:5000'

export const useChat = (roomId) => {
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [userId] = useLocalStorage('userId', nanoid(8))
  const [username] = useLocalStorage('username')

  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: { roomId },
      transports: ['websocket', 'polling', 'flashsocket']
    })

    socketRef.current.emit('user:add', { username, userId })

    socketRef.current.on('users', (users) => {
      setUsers(users)
    })

    socketRef.current.emit('message:get')

    socketRef.current.on('messages', (messages) => {
      const newMessages = messages.map((msg) =>
        msg.userId === userId ? { ...msg, currentUser: true } : msg
      )
      setMessages(newMessages)
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [roomId, userId, username])

  const sendMessage = ({ senderName, messageText }) => {
    console.log(messageText, senderName)
    socketRef.current.emit('message:add', {
      userId,
      messageText,
      senderName
    })
  }

  const removeMessage = (id) => {
    socketRef.current.emit('message:remove', id)
  }

  useBeforeUnload(() => {
    socketRef.current.emit('user:leave', userId)
  })

  return { users, messages, sendMessage, removeMessage, username }
}