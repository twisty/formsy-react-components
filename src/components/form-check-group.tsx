import * as React from 'react';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import {ComponentPropTypes, componentDefaultProps} from './component-common';

interface Props extends ComponentPropTypes {
  children?: any;
}

const FormCheckGroup = (props: Props): JSX.Element => {
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

  return (
    <Row {...props} labelClassName={['pt-0', labelClassName]} fakeLabel>
      <>
        {children}
        {help ? <Help help={help} /> : null}
        {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
      </>
    </Row>
  );
};

FormCheckGroup.defaultProps = componentDefaultProps;

export default FormCheckGroup;
