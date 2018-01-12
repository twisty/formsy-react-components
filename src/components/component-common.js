import React from 'react';
import PropTypes from 'prop-types';
import styleClassNames from './prop-types';

const ComponentCommon = () => (
  <h1>This component just holds props and default props.</h1>
);

ComponentCommon.propTypes = {
  ...styleClassNames,
  onChange: PropTypes.func,
  onSetValue: PropTypes.func,
  isPristine: PropTypes.func.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.node),
  help: PropTypes.string,
  label: PropTypes.node,
  layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
  showErrors: PropTypes.bool,
};

ComponentCommon.defaultProps = {
  onChange: () => {},
  onSetValue: () => {},
  errorMessages: [],
  help: null,
  label: null,
  layout: 'horizontal',
  showErrors: true,
};

export default ComponentCommon;
