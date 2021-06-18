import React, { useRef, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap'
import "./MessageField.css"
import { Message } from '../index'
import PropTypes from 'prop-types';

const listStyles = {
    height: '75vh',
    border: '1px solid rgba(0,0,0,.4)',
    borderRadius: '4px',
    overflow: 'auto'
}

export const MessageField = ({ messages, removeMessage }) => {
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
        </ListGroup>
    );
}

MessageField.propTypes = {
    messages: PropTypes.array,
    removeMessage: PropTypes.func
}