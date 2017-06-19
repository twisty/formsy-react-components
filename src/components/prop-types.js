import PropTypes from 'prop-types';

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
