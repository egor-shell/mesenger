import React from "react";
import {
    Link
  } from "react-router-dom";
import './ChatList.css'

function ChatList() {
    const People = ['John', 'Alex', 'Andrew']

    return (
        <div className="chatlist">
            {People.map((name, id) => {
                const index = id + 1
                return <Link key={id} className="chatlist-list" to={'/chat/' + index}>{name}</Link>
            })}
        </div>
    )
}
export default ChatList;