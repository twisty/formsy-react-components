import {createContext} from 'react';

const defaultContextValue = {
  layout: 'horizontal',
  validateBeforeSubmit: true,
  validatePristine: false,
  elementWrapperClassName: '',
  labelClassName: '',
  rowClassName: '',
};

const FrcContext = createContext(defaultContextValue);

export default FrcContext;
