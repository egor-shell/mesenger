import React from 'react';
import "./MessageField.css"
import Message from "../Message/Message";
import { useRef, useEffect} from "react";
import { useSelector } from 'react-redux'

import {
    // selectChatId,
    selectMessages,
    // selectChat
} from '../../features/slice/messageSlice'

function MessageField() {
    // const chatId = useSelector(selectChatId)
    const messages = useSelector(selectMessages)
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
        <div className="messageField">
            <div className="messageField__field">
                { messages.map(({message, author, id}, index) => <React.Fragment key={index}><Message message={message} author={author} id={id}/></React.Fragment>)}
                {/* { messages.map(({message, author}) => console.log(message, author))} */}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

export default MessageField;