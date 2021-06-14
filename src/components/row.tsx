import * as React from 'react';
import classNames from 'classnames/dedupe';
import {Argument as ClassValue} from 'classnames';
import Label from './label';
import {LayoutType} from '../types';

interface RowProps {
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

interface HorizontalElementWrapperProps {
  elementWrapperClassName: ClassValue;
  renderLabel: boolean;
}

const HorizontalElementWrapper: React.FC<HorizontalElementWrapperProps> = ({
  children,
  elementWrapperClassName,
  renderLabel,
}) => {
  const wrapperClassNames = [] as ClassValue[];
  if (!renderLabel) {
    wrapperClassNames.push('offset-sm-3');
  }
  wrapperClassNames.push('col-sm-9');
  wrapperClassNames.push(elementWrapperClassName);

  return <div className={classNames(wrapperClassNames)}>{children}</div>;
};

const Row: React.FunctionComponent<RowProps> = ({
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
  if (layout === 'elementOnly') {
    return <span>{children}</span>;
  }

  const rowClassNames = ['form-group'] as ClassValue[];
  if (showErrors && (errorMessages.length > 0 || required)) {
    rowClassNames.push('text-danger');
  }
  if (layout === 'horizontal') {
    rowClassNames.push('form-row');
  }
  rowClassNames.push(rowClassName);

  // We should render the label if there is label text defined, or if the
  // component is required (so a required symbol is displayed in the label tag)
  const renderLabel = label !== null || required;

  return (
    <div className={classNames(rowClassNames)}>
      {renderLabel ? (
        <Label
          fakeLabel={fakeLabel}
          htmlFor={htmlFor}
          label={label}
          labelClassName={labelClassName}
          layout={layout}
          required={required}
        />
      ) : null}
      {layout === 'horizontal' ? (
        <HorizontalElementWrapper
          elementWrapperClassName={elementWrapperClassName}
          renderLabel={renderLabel}>
          {children}
        </HorizontalElementWrapper>
      ) : (
        children
      )}
    </div>
  );
};

export default Row;
