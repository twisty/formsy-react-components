import React from 'react';
import PropTypes from 'prop-types';

const ControlCommon = () => {
    return (
        <h1>This component just holds props and default props.</h1>
    );
}
ControlCommon.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};

export default ControlCommon;
