import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
    return (
        <div>
            <h2>ЧАТ {props.chatId}</h2>
        </div>
    )
}
Header.propTypes = {
    chatId: PropTypes.string
}

export default Header;