import {ClassValue} from 'classnames/types'; // eslint-disable-line import/no-unresolved
import {LayoutType, ComponentValue} from '../types';

export const componentDefaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  changeCallback: (name: string, value: ComponentValue): void => {},
  elementWrapperClassName: '' as ClassValue,
  errorMessages: [] as React.ReactNode[],
  help: '',
  id: '',
  isPristine: true,
  label: null as React.ReactNode,
  labelClassName: '' as ClassValue,
  layout: 'horizontal' as LayoutType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onSetValue: (value: ComponentValue): void => {},
  rowClassName: '' as ClassValue,
  showErrors: true,
};
