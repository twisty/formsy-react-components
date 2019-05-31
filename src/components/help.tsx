import * as React from 'react';

interface Props {
  help: string;
}

const Help = ({help}: Props): JSX.Element => (
  <small className="form-text text-muted">{help}</small>
);

export default Help;
