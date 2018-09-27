import PropTypes from 'prop-types';
import styleClassNames from './prop-types';

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
