import React, { PropTypes } from 'react';

const RequiredSymbol = (props) => {
    if (props.required === false) {
        return null;
    }
    return (
        <span className="required-symbol">{props.symbol}</span>
    );
}

RequiredSymbol.propTypes = {
    required: PropTypes.bool.isRequired,
    symbol: PropTypes.node
};

RequiredSymbol.defaultProps = {
    symbol: ' *'
};

export default RequiredSymbol;
