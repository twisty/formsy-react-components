import * as React from 'react';
import {componentDefaultProps} from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import SelectControl, {Props as SelectControlProps} from './controls/select';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  className?: string;
  group?: string;
}

const defaultProps = {
  ...componentDefaultProps,
  options: [] as SelectOption[],
  multiple: false,
  elementRef: React.createRef<HTMLSelectElement>(),
};

type SelectProps = SelectControlProps & typeof defaultProps;

class Select extends React.Component<SelectProps, {}> {
  public static defaultProps = defaultProps;

  // Need to supply a constructor to be recognised as ComponentClass?
  public constructor(props) {
    super(props);
  }

  private handleChange = (event: React.FormEvent<HTMLSelectElement>): void => {
    const target = event.currentTarget;
    const {multiple, onSetValue, changeCallback, name} = this.props;
    let value;
    if (multiple) {
      value = Array.from(target.options)
        .filter((option): boolean => option.selected)
        .map((option): string => option.value);
    } else {
      ({value} = target);
    }
    onSetValue(value);
    changeCallback(name, value);
  };

  public render(): JSX.Element {
    const {
      errorMessages,
      help,
      id,
      layout,
      name,
      showErrors,
      ...inputProps
    } = this.props;
    Object.keys(componentDefaultProps).forEach((key): void => {
      delete inputProps[key];
    });

    const control = (
      <SelectControl
        {...inputProps}
        elementRef={this.props.elementRef}
        id={id}
        name={name}
        onChange={this.handleChange}
      />
    );

    if (layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={id}>
        <>
          {control}
          {help ? <Help help={help} /> : null}
          {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
        </>
      </Row>
    );
  }
}

export {SelectProps};
export default Select;
