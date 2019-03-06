/* eslint-env node, browser */

import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable import/extensions, import/no-unresolved, import/no-extraneous-dependencies */
import {Checkbox, RadioGroup, Form} from 'formsy-react-components';
/* eslint-enable */

const Options = props => {
  const {
    disabledChoice,
    layoutChoice,
    onChangeOption,
    onToggle,
    showing,
    validateOnSubmitChoice,
    validatePristineChoice,
  } = props;

  const optionsForm = (
    <Form>
      <RadioGroup
        name="layout"
        type="inline"
        label="layout"
        value={layoutChoice}
        options={[
          {value: 'horizontal', label: <code>horizontal</code>},
          {value: 'vertical', label: <code>vertical</code>},
          {value: 'elementOnly', label: <code>elementOnly</code>},
        ]}
        onChange={onChangeOption}
      />
      <Checkbox
        name="validatePristine"
        value={validatePristineChoice}
        valueLabel="Yes"
        label="validatePristine"
        onChange={onChangeOption}
      />
      <Checkbox
        name="validateOnSubmit"
        value={validateOnSubmitChoice}
        valueLabel="Yes"
        label="validateOnSubmit"
        onChange={onChangeOption}
      />
      <Checkbox
        name="disabled"
        value={disabledChoice}
        valueLabel="Yes"
        label="disabled"
        onChange={onChangeOption}
      />
    </Form>
  );

  return (
    <div className="card">
      <div className="card-header">
        <button type="button" className="btn btn-primary" onClick={onToggle}>
          {showing ? 'Hide options' : 'Show options'}
        </button>
      </div>
      {showing ? <div className="card-body">{optionsForm}</div> : null}
    </div>
  );
};

Options.propTypes = {
  disabledChoice: PropTypes.bool.isRequired,
  layoutChoice: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly'])
    .isRequired,
  showing: PropTypes.bool.isRequired,
  validateOnSubmitChoice: PropTypes.bool.isRequired,
  validatePristineChoice: PropTypes.bool.isRequired,
  onChangeOption: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Options;
