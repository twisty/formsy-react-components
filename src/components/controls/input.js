import React, { PropTypes } from 'react';

const InputControl = (props) => {
    let { className } = props;
    if (['hidden', 'range'].indexOf(props.type) !== -1) {
        className = null;
    }
    // TODO: We've lost our ref in SFC.
    return (
        <input
            //ref="element"
            {...props}
            className={className}
            //id={props.id}
            //value={props.value}
            //onChange={props.onChange}
        />
    );
}

InputControl.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    className: PropTypes.string
}

InputControl.defaultProps = {
    className: 'form-control',
    type: 'text'
}

export default InputControl;
