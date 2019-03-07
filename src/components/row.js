import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/dedupe';
import {styleClassNames} from './component-common';
import Label from './label';

const Row = props => {
  const {
    elementWrapperClassName,
    required,
    rowClassName,
    showErrors,
    layout,
    label,
    children,
  } = props;

  let element = children;

  if (layout === 'elementOnly') {
    return <span>{element}</span>;
  }

  const cssClasses = {
    row: ['form-group'],
    elementWrapper: [],
  };

  if (showErrors) {
    cssClasses.row.push('was-validated');
  }

  // We should render the label if there is label text defined, or if the
  // component is required (so a required symbol is displayed in the label tag)
  const shouldRenderLabel = label !== null || required;

  if (layout === 'horizontal') {
    cssClasses.row.push('form-row');

    if (!shouldRenderLabel) {
      cssClasses.elementWrapper.push('offset-sm-3');
    }

    cssClasses.elementWrapper.push('col-sm-9');
    cssClasses.elementWrapper.push(elementWrapperClassName);

    element = (
      <div className={classNames(cssClasses.elementWrapper)}>{element}</div>
    );
  }

  cssClasses.row.push(rowClassName);

  return (
    <div className={classNames(cssClasses.row)}>
      {shouldRenderLabel ? <Label {...props} /> : null}
      {element}
    </div>
  );
};

Row.propTypes = {
  ...styleClassNames,
  children: PropTypes.node.isRequired,
  fakeLabel: PropTypes.bool,
  htmlFor: PropTypes.string,
  label: PropTypes.node,
  layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
  required: PropTypes.bool,
  showErrors: PropTypes.bool,
};

Row.defaultProps = {
  /* eslint-disable react/default-props-match-prop-types */
  elementWrapperClassName: '',
  labelClassName: '',
  rowClassName: '',
  /* eslint-enable */
  fakeLabel: false,
  htmlFor: null,
  label: null,
  layout: 'horizontal',
  required: false,
  showErrors: false,
};

export default Row;
