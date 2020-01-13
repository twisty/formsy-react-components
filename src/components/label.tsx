import * as React from 'react';
import classNames from 'classnames/dedupe'; // eslint-disable-line import/default
import RequiredSymbol from './required-symbol';
import {ClassValue} from 'classnames/types'; // eslint-disable-line import/no-unresolved
import {LayoutType} from '../types';

interface Props {
  fakeLabel: boolean;
  htmlFor: string;
  label: React.ReactNode;
  labelClassName: ClassValue;
  layout: LayoutType;
  required: boolean;
}

const Label: React.FunctionComponent<Props> = ({
  fakeLabel = false,
  htmlFor = '',
  label = null,
  labelClassName = '',
  layout = 'horizontal',
  required = false,
}) => {
  if (layout === 'elementOnly') {
    return null;
  }

  const labelClassNames = classNames([
    'col-form-label',
    layout === 'horizontal' ? 'col-sm-3' : '',
    labelClassName,
  ]);

  if (fakeLabel) {
    return (
      <div className={labelClassNames} data-required={required}>
        {label}
        <RequiredSymbol required={required} />
      </div>
    );
  }

  return (
    <label
      className={labelClassNames}
      data-required={required}
      htmlFor={htmlFor}>
      {label}
      <RequiredSymbol required={required} />
    </label>
  );
};

export default Label;
