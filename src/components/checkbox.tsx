import * as React from 'react';
import {CommonProps as CommonControlProps} from './controls/common-prop-types';
import {
  ComponentPropTypes,
  ComponentPropKeys,
  componentDefaultProps,
} from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

type CommonControlPropsCleaned = Omit<CommonControlProps, 'id' | 'name'>;

interface Props extends ComponentPropTypes, CommonControlPropsCleaned {
  value: boolean;
  valueLabel: string;
}

class Checkbox extends React.Component<Props, {}> {
  public element;

  public static defaultProps = {
    ...componentDefaultProps,
    value: false,
    valueLabel: '',
  };

  private handleChange = (event): void => {
    const value = event.currentTarget.checked;
    const {onSetValue, changeCallback, name} = this.props;
    onSetValue(value);
    changeCallback(name, value);
  };

  private initElementRef = (element): void => {
    this.element = element;
  };

  private renderElement = (): JSX.Element => {
    const {valueLabel, label, value, ...inputProps} = this.props;
    ComponentPropKeys.forEach(
      (key): void => {
        delete inputProps[key];
      },
    );

    return (
      <div className="form-check">
        <input
          {...inputProps}
          className="form-check-input"
          type="checkbox"
          checked={value === true}
          onChange={this.handleChange}
          ref={this.initElementRef}
        />
        <label className="form-check-label" htmlFor={inputProps.id}>
          {valueLabel}
        </label>
      </div>
    );
  };

  public render(): JSX.Element {
    const element = this.renderElement();
    const {
      layout,
      id,
      help,
      showErrors,
      errorMessages,
      labelClassName,
    } = this.props;

    if (layout === 'elementOnly') {
      return element;
    }

    return (
      <Row
        {...this.props}
        fakeLabel
        htmlFor={id}
        labelClassName={['pt-0', labelClassName]}>
        <>
          {element}
          {help ? <Help help={help} /> : null}
          {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
        </>
      </Row>
    );
  }
}

export default Checkbox;
