import * as React from 'react';
import classNames from 'classnames/dedupe';
import Label from './label';
import {ClassNamesType} from '../types';

interface Props {
  elementWrapperClassName: ClassNamesType;
  rowClassName: ClassNamesType;
  labelClassName: ClassNamesType;
  label: React.ReactNode;
  layout: 'horizontal' | 'vertical' | 'elementOnly';
  showErrors: boolean;
  errorMessages: JSX.Element[];
  required: boolean;
  fakeLabel: boolean;
  htmlFor: string;
  children?: React.ReactNode; //JSX.Element[] | JSX.Element;
}

const Row = (props: Props): React.ReactElement<any> => {
  const {
    elementWrapperClassName,
    errorMessages,
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
    row: ['form-group'] as ClassNamesType[],
    elementWrapper: [] as ClassNamesType[],
  };

  if (showErrors && (errorMessages.length > 0 || required)) {
    cssClasses.row.push('text-danger');
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

Row.defaultProps = {
  elementWrapperClassName: '',
  labelClassName: '',
  rowClassName: '',
  fakeLabel: false,
  label: null,
  htmlFor: '',
  layout: 'horizontal',
  required: false,
  showErrors: false,
};

export default Row;
