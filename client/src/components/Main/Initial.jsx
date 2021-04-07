import React from "react";
import {
    Link
  } from "react-router-dom";
function Main() {
  return (
      <div className="initial">
        <ul className="initial-list">
            <li>
                <Link to="/">Главная</Link>
            </li>
            <li>
                <Link to="/chats">Чаты</Link>
            </li>
        </ul>
      </div>
  );
};

export default Main;