import {createContext} from 'react';
import {Argument as ClassValue} from 'classnames';
import {LayoutType} from '../types';

const defaultContextValue = {
  elementWrapperClassName: '' as ClassValue,
  labelClassName: '' as ClassValue,
  layout: 'horizontal' as LayoutType,
  rowClassName: '' as ClassValue,
  validateBeforeSubmit: true,
  validatePristine: false,
};

const FrcContext = createContext(defaultContextValue);

FrcContext.displayName = 'FrcContext';

export default FrcContext;
