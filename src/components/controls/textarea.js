import React, { PropTypes } from 'react';

const TextareaControl = (props) => {
    return (
        <textarea
            {...props}
        ></textarea>
    );
}

TextareaControl.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string
}

TextareaControl.defaultProps = {
    className: 'form-control',
    value: ''
}

export default TextareaControl;
