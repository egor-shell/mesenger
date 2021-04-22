import React from "react";
import PropTypes from 'prop-types';
import {
    Link
  } from "react-router-dom";
import './ChatList.css'

function ChatList(props) {

    return (
        <div className="chatlist">
            {props.chats.map(({name}, id) => {
                const index = id + 1
                return <Link key={id} className="chatlist-list" to={'/chat/' + index}>{name}</Link>
            })}
        </div>
    )
}

ChatList.propTypes = {
    chats: PropTypes.array.isRequired
}
export default ChatList;