import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap'
import { Picker } from 'emoji-mart'
import { FiSend } from 'react-icons/fi'
import { GrEmoji } from 'react-icons/gr'
import './SendMessage.css'
// import { Icon } from '@iconify/react';
// import sendIcon from '@iconify/icons-ion/send';
import PropTypes from 'prop-types';
import { checkChats } from "http/userApi";
import { useSelector } from "react-redux";
import { selectUsersId } from "features/usersId/usersId";
import { selectId } from "features/user/userSlice";
import {useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_CHAT} from "../../query/user";

export const SendMessage = ({ username, send, checkChat }) => {
    let [text, setText] = useState('')
    const [showEmoji, setShowEmoji] = useState(false)
    const usersId = useSelector(selectUsersId)
    const userId = useSelector(selectId)
    const { refetch } = useQuery(GET_CHAT, {
        variables: {
            usersId: usersId
        }
    })
    const { refetch: usersRefetch} = useQuery(GET_ALL_USERS)

    
    const sendMessage = event => {
        event.preventDefault()
        refetch().then(
            () => console.log('REFETCH')
        )
        const trimmed = text.trim()
        if(trimmed) {
            const message = {
                messageText: text,
                senderName: username,
                userId: userId
            }
            send({usersId, message})
            setText('')
            checkChat(usersId)
        }
        usersRefetch().then(() => console.log('USERS REFETCH'))
    }

    const handleKeyPress = event => {
        if(event.key === 'Enter'){
            sendMessage(event)
            checkChats()
        }
    }

    const handleEmojiShow = () => {
        setShowEmoji((v) => !v)
    }

    const handleEmojiSelect = (e) => {
        setText((text) => (text += e.native))
    }
    return (
        <div className="Send-field">
            <Form onSubmit={sendMessage}>
                <Form.Group className='d=flex'>
                    <Button 
                        variant='primary'
                        type='button'
                        onClick={handleEmojiShow}
                    >
                        <GrEmoji />    
                    </Button>
                    <Form.Control
                        value={text}
                        onChange={event => setText(event.target.value)}
                        type='text'
                        placeholder='Сообщение...'
                        onKeyPress={handleKeyPress}
                    />
                    <Button
                        variant='success'
                        type='submit'
                    >
                        <FiSend />
                    </Button>
                </Form.Group>
            </Form>
            {showEmoji && <Picker onSelect={handleEmojiSelect} emojiSize={20} />}
        </div>
    );
}

SendMessage.propTypes = {
    username: PropTypes.string,
    send: PropTypes.func.isRequired,
    checkChat: PropTypes.func
}