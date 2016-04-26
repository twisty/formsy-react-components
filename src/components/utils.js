import { PropTypes } from 'react';

const utils = {
    commonProps: {
        name: PropTypes.string.isRequired,
        onSetValue: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
        errorMessages: PropTypes.array,
        help: PropTypes.string,
        id: PropTypes.string,
        label: PropTypes.string,
        layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
        showErrors: PropTypes.bool,
        onChange: PropTypes.func
    }
};

export default utils;
