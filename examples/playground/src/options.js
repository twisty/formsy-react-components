/* eslint-env node, browser */

import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable import/extensions, import/no-unresolved, import/no-extraneous-dependencies */
import {CheckboxGroup, RadioGroup, Form} from 'formsy-react-components';
/* eslint-enable */

const Options = ({
  disabledChoice,
  layoutChoice,
  onChangeOption,
  onToggle,
  showing,
  validateBeforeSubmitChoice,
  validatePristineChoice,
}) => {
  const optionsForm = (
    <Form>
      <RadioGroup
        name="layout"
        label="Layout"
        value={layoutChoice}
        options={[
          {value: 'horizontal', label: 'horizontal'},
          {value: 'vertical', label: 'vertical'},
          {value: 'elementOnly', label: 'elementOnly'},
        ]}
        onChange={onChangeOption}
      />
      <CheckboxGroup
        name="validationOptions"
        options={[
          {value: 'validatePristine', label: 'validatePristine'},
          {value: 'validateBeforeSubmit', label: 'validateBeforeSubmit'},
        ]}
        value={[
          validatePristineChoice ? 'validatePristine' : '',
          validateBeforeSubmitChoice ? 'validateBeforeSubmit' : '',
        ]}
        label="Validation options"
        onChange={onChangeOption}
      />
      <CheckboxGroup
        name="elementOptions"
        options={[{value: 'disabled', label: 'disabled'}]}
        value={[disabledChoice ? 'disabled' : '']}
        label="Element options"
        onChange={onChangeOption}
      />
    </Form>
  );

  return (
    <div className="card bg-light">
      <div className="card-header">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onToggle}>
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
  validateBeforeSubmitChoice: PropTypes.bool.isRequired,
  validatePristineChoice: PropTypes.bool.isRequired,
  onChangeOption: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Options;
