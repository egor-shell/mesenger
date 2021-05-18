import React, { useRef, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap'
import "./MessageField.css"
import { Message } from '../index'
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux'

import {
    // selectChatId,
    // selectMessages,
    // selectChat
} from '../../features/slice/messageSlice'

const listStyles = {
    height: '75vh',
    border: '1px solid rgba(0,0,0,.4)',
    borderRadius: '4px',
    overflow: 'auto'
}

export const MessageField = ({ messages, removeMessage }) => {
    // const chatId = useSelector(selectChatId)
    // const messages = useSelector(selectMessages)
    // const chats = useSelector(selectChat)
    // const messagesInChat = messages.filter((item, id) => chats[chatId].messages.includes(id))
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
      }, [messages]);

    return (
        <ListGroup variant='flush' style={listStyles}>
            {messages.map((msg) => (
                <Message
                    key={msg.messageId}
                    msg={msg}
                    removeMessage={removeMessage}
                />
            ))}
            <span ref={messagesEndRef}></span>
            {/* <div className="messageField__field">
                { messages.map(({message, author, id}, index) => <React.Fragment key={index}><Message message={message} author={author} id={id}/></React.Fragment>)}
                <div ref={messagesEndRef} />
            </div> */}
        </ListGroup>
    );
}

MessageField.propTypes = {
    messages: PropTypes.array,
    removeMessage: PropTypes.func
}