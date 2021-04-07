import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// const Demo = ({ match }) => {
//     return <h1>It is {match.params.chatId} chat!</h1>
// };
const Demo = () => {
    const { chatId } = useParams()
    return <h1>It is {chatId} chat!</h1>
};

Demo.propTypes = {
    match: PropTypes.object.isRequired
}

export default Demo;