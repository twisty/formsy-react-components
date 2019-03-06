import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wraps an input to implement a Bootstrap [Input Group](http://getbootstrap.com/components/#input-groups)
 */
const InputGroup = props => {
  const renderAddon = addon => {
    if (!addon) {
      return null;
    }
    return <span className="input-group-addon">{addon}</span>;
  };

  const renderButton = button => {
    if (!button) {
      return null;
    }
    return <span className="input-group-btn">{button}</span>;
  };

  const {addonBefore, addonAfter, buttonBefore, buttonAfter, children} = props;

  return (
    <div className="input-group">
      {renderAddon(addonBefore)}
      {renderButton(buttonBefore)}
      {children}
      {renderAddon(addonAfter)}
      {renderButton(buttonAfter)}
    </div>
  );
};

export const propTypes = {
  children: PropTypes.node.isRequired,
  addonAfter: PropTypes.node,
  addonBefore: PropTypes.node,
  buttonAfter: PropTypes.node,
  buttonBefore: PropTypes.node,
};

InputGroup.propTypes = propTypes;

InputGroup.defaultProps = {
  addonAfter: null,
  addonBefore: null,
  buttonAfter: null,
  buttonBefore: null,
};

export default InputGroup;
