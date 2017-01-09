import { PropTypes } from 'react';

// JedWatson/classnames
// --------------------
//
// This is a PropType definition that is suitable for converting to a HTML 'class' attribute value.
// See: https://github.com/JedWatson/classnames
let styleClassName = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
]);

export const styleClassNames = {
    rowClassName: styleClassName,
    labelClassName: styleClassName,
    elementWrapperClassName: styleClassName
};

export const controlProps = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};

export const commonProps = {
    ...styleClassNames,
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
