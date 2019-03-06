import React from 'react';
import PropTypes from 'prop-types';

const Help = ({help}) => <small className="form-text text-muted">{help}</small>;

Help.propTypes = {
  help: PropTypes.string.isRequired,
};

export default Help;
