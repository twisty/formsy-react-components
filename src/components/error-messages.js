import React, { PropTypes } from 'react';

const ErrorMessages = (props) => {
    let messageNodes = props.messages.map((message, key) => {
        return (
            <span key={key} className="help-block validation-message">{message}</span>
        );
    });
    return (
        <div>{messageNodes}</div>
    );
};

ErrorMessages.propTypes = {
    messages: PropTypes.array
};

ErrorMessages.defaultProps = {
    messages: []
};

export default ErrorMessages;
