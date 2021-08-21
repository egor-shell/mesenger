/* eslint-disable no-unused-vars */
import React from 'react'
import { ListGroup } from 'react-bootstrap'
import {
    Link
} from 'react-router-dom'
import PropTypes from 'prop-types';
import './users.css'
import { useDispatch, useSelector } from 'react-redux';
import { newDestinationId, clearDestinationId, selectDestinationId } from 'features/destinationId/destinationIdSlice';
import { selectId } from 'features/user/userSlice';
import { selectChatId} from 'features/chatId/chatIdSlice';
// import { selectChats } from 'features/chats/chatsSlice';

function Users({ users, checkChat, getChats }) {

    const dispatch = useDispatch()
    const userId = useSelector(selectId)
    const chatId = useSelector(selectChatId)
    const destenationId = useSelector(selectDestinationId)
    // const chats = useSelector(selectChats)

    return (
        <ul>
            {users.map((user) => {
                {console.log(user)}
                <li>{userId}</li>
                // <ListGroup.Item
                //     key={user.id}
                //     clasName='user-item'
                // >
                //     <Link
                //         onClick={() => {
                //             dispatch(clearDestinationId())
                //             dispatch(newDestinationId(user.id))
                //         }}
                //         to={`/im/${destenationId}`}
                //     >
                //         <div className='d-flex'>
                //             {user.username}
                //         </div>
                //     </Link>
                // </ListGroup.Item>
            })}
        </ul>
    )

    // return (
    //     <ListGroup variant='flush'>
    //         {users.map((user) => (
    //             <ListGroup.Item
    //                 key={user.id}
    //                 className='user-item'
    //                 onClick={() => {
    //                     chats(user)
    //                 }}
    //             >
    //                 <Link
    //                     onClick={() => {
    //                         dispatch(clearDestinationId())
    //                         dispatch(newDestinationId(user.id))
    //                         console.log(chatId)
    //                         checkChat(userId, user.id)
    //                     }}
    //                     // to={() => {
    //                     //     const chat = chats.filter(currentChat => currentChat.usersId.toString() === [userId, user.id].toString())
    //                     //     dispatch(clearChatId())
    //                     //     dispatch(newChatId(chat.chatId))
    //                     //     return '/im/' + chat.chatId
    //                     // }}
    //                     to={`/im?sel=${chatId}`}
    //                 >
    //                     <div className='d-flex'>
    //                         {user.username}
    //                     </div>
    //                 </Link>
    //             </ListGroup.Item>
    //         ))}
    //     </ListGroup>
    // )
}

Users.propTypes = {
    users: PropTypes.array,
    checkChat: PropTypes.func,
    getChats: PropTypes.func,
}