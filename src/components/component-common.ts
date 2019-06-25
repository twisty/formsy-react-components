import {ClassValue} from 'classnames/types';

type LayoutType = 'horizontal' | 'vertical' | 'elementOnly';

export interface ComponentPropTypes {
  id: string;
  rowClassName: ClassValue;
  labelClassName: ClassValue;
  elementWrapperClassName: ClassValue;
  name: string;
  changeCallback: (name: string, value) => void;
  onSetValue: (value) => void;
  isPristine: boolean;
  errorMessages: React.ReactNode[];
  help: string;
  label: React.ReactNode;
  layout: LayoutType;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changeCallback: (name: string, value): void => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSetValue: (value): void => {},
  errorMessages: [],
  help: '',
  label: null,
  layout: 'horizontal' as LayoutType,
  showErrors: true,
  rowClassName: '',
  labelClassName: '',
  elementWrapperClassName: '',
  isPristine: true,
};
