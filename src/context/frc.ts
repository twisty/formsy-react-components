import {createContext} from 'react';

import {ClassValue} from 'classnames/types';

export interface FrcContextType {
  layout: 'horizontal' | 'vertical' | 'elementOnly';
  validateBeforeSubmit: boolean;
  validatePristine: boolean;
  elementWrapperClassName: ClassValue;
  labelClassName: ClassValue;
  rowClassName: ClassValue;
}

const defaultContextValue: FrcContextType = {
  layout: 'horizontal',
  validateBeforeSubmit: true,
  validatePristine: false,
  elementWrapperClassName: '',
  labelClassName: '',
  rowClassName: '',
};

const FrcContext = createContext(defaultContextValue);

export default FrcContext;
