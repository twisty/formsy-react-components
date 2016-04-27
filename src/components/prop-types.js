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

export const commonComponentProps = {
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
};
