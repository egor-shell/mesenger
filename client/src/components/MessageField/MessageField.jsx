import React, { useRef, useEffect } from 'react';
import {Container, ListGroup} from 'react-bootstrap'
import "./MessageField.css"
import { Message } from '../index'
import PropTypes from 'prop-types';
import {useQuery} from "@apollo/client";
import {GET_CHAT} from "../../query/user";
import {useSelector} from "react-redux";
import {selectUsersId} from "../../features/usersId/usersId";

const listStyles = {
    height: '75vh',
    border: '1px solid rgba(0,0,0,.4)',
    borderRadius: '4px',
    overflow: 'auto'
}
const emptyList = {
    height: '75vh',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(0,0,0,.4)',
    borderRadius: '4px',
    overflow: 'auto'
}
const notMessage = {
    width: '100%'
}

export const MessageField = ({ messages, removeMessage }) => {
    const usersId = useSelector(selectUsersId)
    const messagesEndRef = useRef(null)
    const { data: dataChat, refetch } = useQuery(GET_CHAT, {
        variables: {
            usersId: usersId
        }
    })

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
        refetch()
      }, [messages]);

    console.log(dataChat)

    if(!dataChat || !dataChat.getChat) {
        return (
            <Container style={emptyList}>
                <div style={notMessage}> Not messages</div>
            </Container>
        )
    } else {
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

}

MessageField.propTypes = {
    messages: PropTypes.array,
    removeMessage: PropTypes.func
}