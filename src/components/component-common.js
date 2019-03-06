import PropTypes from 'prop-types';

// JedWatson/classnames
// --------------------
//
// This is a PropType definition that is suitable for converting to a HTML 'class' attribute value.
// See: https://github.com/JedWatson/classnames
export const styleClassName = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.array,
  PropTypes.object,
]);

export const styleClassNames = {
  rowClassName: styleClassName,
  labelClassName: styleClassName,
  elementWrapperClassName: styleClassName,
};

export const componentPropTypes = {
  ...styleClassNames,
  onChange: PropTypes.func,
  onSetValue: PropTypes.func,
  isPristine: PropTypes.func.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.node),
  help: PropTypes.string,
  label: PropTypes.node,
  layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
  showErrors: PropTypes.bool,
};

export const componentDefaultProps = {
  onChange: () => {},
  onSetValue: () => {},
  errorMessages: [],
  help: null,
  label: null,
  layout: 'horizontal',
  showErrors: true,
};
