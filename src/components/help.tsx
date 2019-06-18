import * as React from 'react';

interface Props {
  help: string;
}

const Help: React.FunctionComponent<Props> = ({help}) => (
  <small className="form-text text-muted">{help}</small>
);

export default Help;
