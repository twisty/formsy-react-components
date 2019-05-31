import * as React from 'react';

interface Props {
  messages: JSX.Element[];
}

const ErrorMessages = ({messages}: Props): JSX.Element => {
  const messageNodes = messages.map(
    (message, key): JSX.Element => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={key}>{message}</div>
    ),
  );
  return <div className="invalid-feedback">{messageNodes}</div>;
};

ErrorMessages.defaultProps = {
  messages: [],
};

export default ErrorMessages;
