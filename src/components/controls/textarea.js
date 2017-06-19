import React from 'react';
import PropTypes from 'prop-types';
import ControlCommon from './control-common';

const TextareaControl = (props) => {
    return (
        <textarea
            {...props}
        ></textarea>
    );
}

TextareaControl.propTypes = {
    ...ControlCommon.propTypes,
    className: PropTypes.string,
    value: PropTypes.string
}

TextareaControl.defaultProps = {
    className: 'form-control',
    cols: 0, // React doesn't render the cols attribute if it is zero
    rows: 3,
    value: ''
}

export default TextareaControl;
