import React, { useState } from "react";
import './SendMessage.css'
import { Icon } from '@iconify/react';
import sendIcon from '@iconify/icons-ion/send';
import PropTypes from 'prop-types';

function SendMessage(props) {
    let [message, sendMessage] = useState('')

    
    const send = () => {
        props.send({message: message, author: 'Me'})
        sendMessage('')
    }
    
    const handleKeyPress = event => {
        if(event.key === 'Enter'){
            send()
        }
    }
    return (
        <div className="Send-field">
            <input className="Send-field__input" type="text" placeholder="Введите сообщение" value={message} onChange={event => sendMessage(event.target.value)} name='message' onKeyPress={handleKeyPress}></input>
            <button className="Send-field__btn" onClick={() => {
                send()
            }}>
                    <Icon width="2em" icon={sendIcon} />
            </button>
        </div>
    );
}

SendMessage.propTypes = {
    send: PropTypes.func.isRequired
}

export default SendMessage;