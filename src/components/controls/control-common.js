import React from 'react';
import PropTypes from 'prop-types';

const ControlCommon = props => (
  <h1 {...props}>This component just holds props and default props.</h1>
);

ControlCommon.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

ControlCommon.defaultProps = {
  disabled: false,
};

export default ControlCommon;
