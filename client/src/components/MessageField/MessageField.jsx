import React from 'react';
import "./MessageField.css"
import Message from "../Message/Message";
import { useRef, useEffect} from "react";
import PropTypes from 'prop-types'

function MessageField(props) {

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
      }, [props.messages]);

    return (
        <div className="messageField">
            <div className="messageField__field">
                { props.messages.map(({message, author}, index) => <React.Fragment key={index}><Message message={message} author={author}/></React.Fragment>)}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

MessageField.propTypes = {
    messages: PropTypes.array.isRequired
}

export default MessageField;