import * as React from 'react';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import {ComponentPropTypes, componentDefaultProps} from './component-common';

interface Props extends ComponentPropTypes {
  children: React.ReactElement;
}

const FormCheckGroup: React.FunctionComponent<Props> = props => {
  const {
    layout,
    help,
    showErrors,
    errorMessages,
    labelClassName,
    children,
  } = props;

  if (layout === 'elementOnly') {
    return children;
  }

  const {...passProps} = props;
  delete passProps.children;

  return (
    <Row {...passProps} labelClassName={['pt-0', labelClassName]} fakeLabel>
      {children}
      {help ? <Help help={help} /> : null}
      {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
    </Row>
  );
};

FormCheckGroup.defaultProps = componentDefaultProps;

export default FormCheckGroup;
