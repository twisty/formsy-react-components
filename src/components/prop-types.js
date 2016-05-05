import { PropTypes } from 'react';

// JedWatson/classnames
// --------------------
//
// This is a PropType definition that is suitable for converting to a HTML 'class' attribute value.
// See: https://github.com/JedWatson/classnames
export const styleClassname = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
]);

export const commonProps = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    errorMessages: PropTypes.array,
    help: PropTypes.string,
    label: PropTypes.string,
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
    showErrors: PropTypes.bool,
    onChange: PropTypes.func,
    onSetValue: PropTypes.func
};

export const commonDefaults = {
    onSetValue: () => {},
    onChange: () => {}
};
