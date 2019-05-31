import {ClassNamesType} from '../types';

export interface ComponentPropTypes {
  id: string;
  rowClassName: ClassNamesType;
  labelClassName: ClassNamesType;
  elementWrapperClassName: ClassNamesType;
  name: string;
  changeCallback: (name: string, value) => {};
  onSetValue: (value) => {};
  isPristine: () => {};
  errorMessages: JSX.Element[];
  help: string | null;
  label: React.ReactNode;
  layout: 'horizontal' | 'vertical' | 'elementOnly';
  showErrors: boolean;
}

export const ComponentPropKeys = [
  'rowClassName',
  'labelClassName',
  'elementWrapperClassName',
  'changeCallback',
  'onSetValue',
  'isPristine',
  'errorMessages',
  'help',
  'label',
  'layout',
  'showErrors',
];

export const componentDefaultProps = {
  changeCallback: (): void => {},
  onSetValue: (): void => {},
  errorMessages: [null],
  help: null,
  label: null,
  layout: 'horizontal',
  showErrors: true,
  rowClassName: '',
  labelClassName: '',
  elementWrapperClassName: '',
  isPristine: (): boolean => true,
};
