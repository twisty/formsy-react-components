import * as React from 'react';

interface Props {
  required: boolean;
  symbol?: React.ReactNode;
}

const RequiredSymbol: React.FunctionComponent<Props> = ({required, symbol}) => {
  if (required === false) {
    return null;
  }
  return <span className="required-symbol">{symbol}</span>;
};

RequiredSymbol.defaultProps = {
  symbol: ' *',
};

export default React.memo(RequiredSymbol);
