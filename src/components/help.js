import React, { PropTypes } from 'react';

const Help = (props) => {
    return (
        <span className="help-block">{props.help}</span>
    );
}

Help.propTypes = {
    help: PropTypes.string.isRequired
}

export default Help;
