import React from 'react';
import PropTypes from 'prop-types';

const Help = ({help}) => <span className="help-block">{help}</span>;

Help.propTypes = {
  help: PropTypes.string.isRequired,
};

export default Help;
