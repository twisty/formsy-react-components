import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({symbol, className}) => {
  const classNames = ['glyphicon', `glyphicon-${symbol}`];
  if (className) {
    classNames.push(className);
  }
  return <span className={classNames.join(' ')} aria-hidden="true" />;
};

Icon.propTypes = {
  symbol: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
