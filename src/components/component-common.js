import React from 'react';
import PropTypes from 'prop-types';
import { styleClassNames } from './prop-types';

const ComponentCommon = () => {
    return (
        <h1>This component just holds props and default props.</h1>
    );
}

ComponentCommon.propTypes = {
    ...styleClassNames,
    errorMessages: PropTypes.array,
    help: PropTypes.string,
    label: PropTypes.string,
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
    showErrors: PropTypes.bool,
    onChange: PropTypes.func,
    onSetValue: PropTypes.func
}

ComponentCommon.defaultProps = {
    onChange: () => {},
    onSetValue: () => {}
}

export default ComponentCommon;
