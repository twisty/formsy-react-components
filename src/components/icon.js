import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => {
  const classNames = ['glyphicon', `glyphicon-${props.symbol}`];
  if (props.className) {
    classNames.push(props.className);
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
