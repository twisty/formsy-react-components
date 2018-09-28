import React from 'react';
import PropTypes from 'prop-types';

const RequiredSymbol = ({required, symbol}) => {
  if (required === false) {
    return null;
  }
  return <span className="required-symbol">{symbol}</span>;
};

RequiredSymbol.propTypes = {
  required: PropTypes.bool.isRequired,
  symbol: PropTypes.node,
};

RequiredSymbol.defaultProps = {
  symbol: ' *',
};

export default RequiredSymbol;
