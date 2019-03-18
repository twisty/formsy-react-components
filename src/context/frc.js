import {createContext} from 'react';

const defaultContextValue = {
  layout: 'horizontal',
  validateOnSubmit: false,
  validatePristine: false,
  elementWrapperClassName: '',
  labelClassName: '',
  rowClassName: '',
};

const FrcContext = createContext(defaultContextValue);

export default FrcContext;
