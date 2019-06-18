import * as React from 'react';
import {
  ComponentPropTypes,
  ComponentPropKeys,
  componentDefaultProps,
} from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import SelectControl, {Props as SelectControlProps} from './controls/select';

interface SelectOption {
  value: string;
  label: string;
  group?: string;
}

interface Props extends ComponentPropTypes, SelectControlProps {
  multiple: boolean;
  options: SelectOption[];
}

class Select extends React.Component<Props, {}> {
  public element;

  public static defaultProps = {
    ...componentDefaultProps,
    options: [],
    multiple: false,
  };

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

  private initElementRef = (control): void => {
    this.element = control ? control.element : null;
  };

  public render() {
    const inputProps = Object.assign({}, this.props);
    ComponentPropKeys.forEach((key): void => {
      delete inputProps[key];
    });

    const control = (
      <SelectControl
        {...inputProps}
        onChange={this.handleChange}
        ref={this.initElementRef}
      />
    );

    const {layout, id, help, showErrors, errorMessages} = this.props;

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

export default Select;
