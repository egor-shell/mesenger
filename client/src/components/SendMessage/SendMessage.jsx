import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap'
import { Picker } from 'emoji-mart'
import { FiSend } from 'react-icons/fi'
import { GrEmoji } from 'react-icons/gr'
import './SendMessage.css'
// import { Icon } from '@iconify/react';
// import sendIcon from '@iconify/icons-ion/send';
import PropTypes from 'prop-types';

export const SendMessage = ({ username, send }) => {
    let [text, setText] = useState('')
    const [showEmoji, setShowEmoji] = useState(false)

    
    const sendMessage = event => {
        event.preventDefault()
        const trimmed = text.trim()
        if(trimmed) {
            send({ messageText: text, senderName: username})
            setText('')
        }
    }
    
    const handleKeyPress = event => {
        if(event.key === 'Enter'){
            sendMessage(event)
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
            {/* <input className="Send-field__input" type="text" placeholder="Введите сообщение" value={message} onChange={event => sendMessage(event.target.value)} name='message' onKeyPress={handleKeyPress}></input>
            <button className="Send-field__btn" onClick={() => {
                sendMessage()
            }}>
                    <Icon width="2em" icon={sendIcon} />
            </button> */}
        </div>
    );
}

SendMessage.propTypes = {
    username: PropTypes.string,
    send: PropTypes.func.isRequired
}