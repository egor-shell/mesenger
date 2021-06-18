import React from 'react'
import { ListGroup } from 'react-bootstrap'
import PropTypes from 'prop-types';

export default function Users({ users }) {

    return (
        <ListGroup variant='flush'>
            {users.map((user) => (
                user.online 
                ? 
                <ListGroup.Item
                    key={user.id}
                >
                    {user.username} online
                </ListGroup.Item>
                :
                <ListGroup.Item
                    key={user.id}
                >
                    {user.username}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

Users.propTypes = {
    users: PropTypes.array
}