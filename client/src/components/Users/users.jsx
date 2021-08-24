import React from 'react'
import { ListGroup, Container, InputGroup, FormControl } from 'react-bootstrap'
import {
    Link
} from 'react-router-dom'
import PropTypes from 'prop-types'
import './users.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectId, selectUsername } from 'features/user/userSlice'
import  { clearUsersId, newUsersId, selectUsersId } from 'features/usersId/usersId'
import { clearChatId, newChatId } from 'features/chatId/chatIdSlice'
import { useQuery } from '@apollo/client'
import { GET_ALL_USERS, GET_CHAT } from 'query/user'

export default function Users() {
    const [search, setSearch] = React.useState('')
    // const [messages, setMessages] = React.useState(null)
    const dispatch = useDispatch()
    const userId = useSelector(selectId)
    const usersId = useSelector(selectUsersId)
    const username = useSelector(selectUsername)
    let chatId = ''
    const { data } = useQuery(GET_ALL_USERS)
    const { data: dataChat } = useQuery(GET_CHAT, {
        variables: {
            usersId: usersId
        }
    })
    
    let users = []
    let usersChat = []
    let messages = []

    if(dataChat && dataChat.getChat !== null) {
        messages = dataChat.getChat.messages
    }

    if(data) {
        users = data.getAllUsers
        const chatWithUser = users.find((user) => String(user.id) === String(userId))
        if(chatWithUser) {
            let chats = chatWithUser.chats
            const idUserChats = []
            if(chats) {
                chats.map((chat) => {
                    if(chat) {
                        const idUser = chat.usersId.find((id) => { 
                            return id !== userId
                        })
                        idUserChats.push(idUser)
                    }
                })
                idUserChats.map((id) => {
                    let user = users.find((user) => user.id === String(id))
                    console.log(messages)
                    usersChat.push(user)
                })
    
            }
            if(search.length) {
                usersChat = users
            }
        }
    }
    

    return (
        <Container>
            <InputGroup>
                <FormControl
                    placeholder='Вветите имя'
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                />
            </InputGroup>
            <ListGroup variant='flush'>
                {usersChat.filter((user) => {
                    if(search == '') {
                        return user
                    } else if(user.username.toLowerCase().includes(search.toLowerCase())) {
                        return user
                    }
                }).map((user) => (
                    <ListGroup.Item 
                        className='user-item'
                        key={user.id}
                    >
                        <Link
                            onClick={() => {
                                setSearch('')
                                const usersId = [Number(userId), Number(user.id)].sort((a, b) => {
                                    return a - b
                                })
                                dispatch(clearUsersId())
                                dispatch(newUsersId(usersId))
                                let currentChat = user.chats.find(c => JSON.stringify(c.usersId) === JSON.stringify(usersId))
                                if (!currentChat) {
                                    const currentUser = data.getAllUsers.find(u => u.username === user.username)
                                    const usersChat = [
                                        currentUser,
                                        { id: userId, username }
                                    ]
                                    usersChat.sort((a, b) => {
                                        return a.id - b.id
                                    })
                                    chatId = usersChat[0].username + usersChat[1].username
                                    dispatch(clearChatId())
                                    dispatch(newChatId(chatId))
                                } else {
                                    chatId = currentChat.chatId
                                    dispatch(clearChatId())
                                    dispatch(newChatId(chatId))
                                }
                            }}
                            to={() => {
                                if (chatId === '') {
                                    return `/im/`
                                } else {
                                    return `/im/${chatId}`
                                }
                            }}
                        >
                            {user.username}
                        </Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
}

Users.propTypes = {
    users: PropTypes.array,
    checkChat: PropTypes.func
    // chatId: PropTypes.symbol
}