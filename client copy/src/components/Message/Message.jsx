import React from 'react';
import './Message.css';
import PropTypes from 'prop-types';

function Message(props) {
    // Time
    const date = new Date();

    const options = {
      hour: 'numeric',
      minute: 'numeric'
    };
    return (
        <div className='windows__message' style={{alignSelf: props.author === 'Me' ? 'flex-end' : 'flex-start'}}>
            <div className="message-info">
                <a href='/' className='message__author'>{props.author}</a>
                <p className="message__time">{date.toLocaleString("ru", options)}</p>
            </div>
            <div className="message" style={{background: props.author === 'Me' ? 'rgb(20, 126, 251)' : 'rgb(83, 215, 105)'}}>
                <p className="message__text">{props.message}</p>
            </div>
        </div>
    );
}

Message.propTypes = {
    author: PropTypes.string,
    message: PropTypes.string
}

export default Message;