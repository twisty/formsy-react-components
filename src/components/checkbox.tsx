import * as React from 'react';
import {CommonProps as CommonControlProps} from './controls/common-prop-types';
import {componentDefaultProps} from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

type CommonControlPropsCleaned = Omit<CommonControlProps, 'id' | 'name'>;

const defaultProps = {
  ...componentDefaultProps,
  value: false,
  valueLabel: '',
  elementRef: React.createRef<HTMLInputElement>(),
};

type Props = CommonControlPropsCleaned &
  typeof defaultProps & {
    name: string;
  };

class Checkbox extends React.Component<Props, {}> {
  public static defaultProps = defaultProps;

  // Need to supply a constructor to be recognised as ComponentClass?
  public constructor(props) {
    super(props);
  }

  private handleChange = (event): void => {
    const value = event.currentTarget.checked;
    const {onSetValue, changeCallback, name} = this.props;
    onSetValue(value);
    changeCallback(name, value);
  };

  private renderElement = (): JSX.Element => {
    const {
      elementRef,
      id,
      label,
      value,
      valueLabel,
      ...inputProps
    } = this.props;
    Object.keys(componentDefaultProps).forEach((key): void => {
      delete inputProps[key];
    });

    return (
      <div className="custom-control custom-checkbox">
        <input
          {...inputProps}
          checked={value === true}
          className="custom-control-input"
          id={id}
          onChange={this.handleChange}
          ref={elementRef}
          type="checkbox"
        />
        <label className="custom-control-label" htmlFor={id}>
          {valueLabel}
        </label>
      </div>
    );
  };

  public render(): JSX.Element {
    const element = this.renderElement();
    const {
      errorMessages,
      help,
      id,
      labelClassName,
      layout,
      showErrors,
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

export {Props};
export default Checkbox;
