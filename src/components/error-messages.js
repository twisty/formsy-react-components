import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessages = props => {
  const messageNodes = props.messages.map((message, key) => (
    // eslint-disable-next-line react/no-array-index-key
    <span key={key} className="help-block validation-message">
      {message}
    </span>
  ));
  return <div>{messageNodes}</div>;
};

ErrorMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.node),
};

ErrorMessages.defaultProps = {
  messages: [],
};

export default ErrorMessages;
