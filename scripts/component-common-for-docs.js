import React from 'react';
import {
  componentPropTypes,
  componentDefaultProps,
} from '../src/components/component-common';

const Stub = () => <div>Stub component</div>;

Stub.propTypes = componentPropTypes;
Stub.defaultProps = componentDefaultProps;

export default Stub;
