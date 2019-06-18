import * as React from 'react';

interface Props {
  messages: React.ReactNode[];
}

const ErrorMessages: React.FunctionComponent<Props> = ({messages}) => {
  const messageNodes = messages.map((message, key) => (
    <div key={key}>{message}</div>
  ));
  return <div className="invalid-feedback">{messageNodes}</div>;
};

ErrorMessages.defaultProps = {
  messages: [],
};

export default ErrorMessages;
