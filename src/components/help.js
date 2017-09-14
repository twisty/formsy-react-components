import React from 'react';
import PropTypes from 'prop-types';

const Help = props => <span className="help-block">{props.help}</span>;

Help.propTypes = {
  help: PropTypes.string.isRequired,
};

export default Help;
