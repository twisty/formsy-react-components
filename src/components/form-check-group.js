import React from 'react';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import {componentPropTypes, componentDefaultProps} from './component-common';

const FormCheckGroup = props => {
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
      {children}
      {help ? <Help help={help} /> : null}
      {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
    </Row>
  );
};

FormCheckGroup.propTypes = componentPropTypes;
FormCheckGroup.defaultProps = componentDefaultProps;

export default FormCheckGroup;
