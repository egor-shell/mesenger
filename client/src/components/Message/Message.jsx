import React from 'react';
import TimeAgo from 'react-timeago'
import { ListGroup, Card, Button } from 'react-bootstrap'
import { AiOutlineDelete } from 'react-icons/ai'
import './Message.css';
import PropTypes from 'prop-types';

export const Message = ({ msg, removeMessage }) => {
    const handleRemoveMessage = (id) => {
        removeMessage(id)
    }

    console.log(msg)

    const { messageId, messageText, senderName, createdAt, currentUser } = msg
    return (
            <ListGroup.Item
                className={`d-flex ${currentUser ? 'justify-content-end' : ''}`}
            >
                <Card
                    bg={`${currentUser ? 'primary' : 'secondary'}`}
                    text='light'
                    style={{ width: '55%' }}
                >
                    <Card.Header className='d-flex justify-content-between align-items-center'>
                        <Card.Text as={TimeAgo} date={createdAt} className='small' />
                        <Card.Text>{senderName}</Card.Text>
                    </Card.Header>
                    <Card.Body className='d-flex justify-content-between align-items-center'>
                        <Card.Text>{messageText}</Card.Text>
                        {currentUser && (
                            <Button
                                variant='none'
                                className='text-warning'
                                onClick={() => handleRemoveMessage(messageId)}
                            >
                                <AiOutlineDelete />
                            </Button>
                        )}
                    </Card.Body>
                </Card>
                {/* <div className="message-info">
                    <a href='/' className='message__author'>{props.author}</a>
                    <p className="message__time">{date.toLocaleString("ru", options)}</p>
                </div>
                <div className="message" style={{background: props.author === 'Me' ? 'rgb(20, 126, 251)' : 'rgb(83, 215, 105)'}}>
                    <p className="message__text">{props.message}</p>
                </div> */}
            </ListGroup.Item>
    );
}

Message.propTypes = {
    msg: PropTypes.object,
    removeMessage: PropTypes.func
}
