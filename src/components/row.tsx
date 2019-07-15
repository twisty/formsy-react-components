import * as React from 'react';
import classNames from 'classnames/dedupe';
import Label from './label';
import {ClassValue, LayoutType} from '../types';

interface Props {
  elementWrapperClassName?: ClassValue;
  errorMessages?: React.ReactNode[];
  fakeLabel?: boolean;
  htmlFor?: string;
  label?: React.ReactNode;
  labelClassName?: ClassValue;
  layout?: LayoutType;
  required?: boolean;
  rowClassName?: ClassValue;
  showErrors?: boolean;
}

const Row: React.FunctionComponent<Props> = ({
  children,
  elementWrapperClassName = '',
  errorMessages = [],
  fakeLabel = false,
  htmlFor = '',
  label = null,
  labelClassName = '',
  layout = 'horizontal',
  required = false,
  rowClassName = '',
  showErrors = false,
}) => {
  let element = children;

  if (layout === 'elementOnly') {
    return <span>{element}</span>;
  }

  const cssClasses = {
    row: ['form-group'] as ClassValue[],
    elementWrapper: [] as ClassValue[],
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
      {shouldRenderLabel ? (
        <Label
          fakeLabel={fakeLabel}
          htmlFor={htmlFor}
          label={label}
          labelClassName={labelClassName}
          layout={layout}
          required={required}
        />
      ) : null}
      {element}
    </div>
  );
};

export default Row;
