import React, { PropTypes } from 'react';

const SelectControl = (props) => {
    const optionNodes = props.options.map((item, index) => {
        return (
            <option key={index} {...item} label={null}>{item.label}</option>
        );
    });
    return (
        <select
            className="form-control"
            {...props}
        >
            {optionNodes}
        </select>
    );
}

SelectControl.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string
        })
    ).isRequired,
    multiple: PropTypes.bool
}

export default SelectControl;
