import {createContext} from 'react';

import {ClassNamesType} from '../form';

export interface Props {
  layout: 'horizontal' | 'vertical' | 'elementOnly';
  validateBeforeSubmit: boolean;
  validatePristine: boolean;
  elementWrapperClassName: ClassNamesType;
  labelClassName: ClassNamesType;
  rowClassName: ClassNamesType;
  [key: string]: any;
}

const defaultContextValue: Props = {
  layout: 'horizontal',
  validateBeforeSubmit: true,
  validatePristine: false,
  elementWrapperClassName: '',
  labelClassName: '',
  rowClassName: '',
};

const FrcContext = createContext(defaultContextValue);

export default FrcContext;
