import * as React from 'react';

interface Props {
  required: boolean;
  symbol: JSX.Element;
}

const RequiredSymbol = ({required, symbol}: Props): JSX.Element | null => {
  if (required === false) {
    return null;
  }
  return <span className="required-symbol">{symbol}</span>;
};

RequiredSymbol.defaultProps = {
  symbol: ' *',
};

export default RequiredSymbol;
