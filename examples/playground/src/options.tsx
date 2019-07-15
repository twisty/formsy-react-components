/* eslint-env node, browser */

import React from 'react';

import {CheckboxGroup, RadioGroup, Form} from 'formsy-react-components';

interface Props {
  disabledChoice: boolean;
  layoutChoice: 'horizontal' | 'vertical' | 'elementOnly';
  showing: boolean;
  validateBeforeSubmitChoice: boolean;
  validatePristineChoice: boolean;
  onChangeOption: (name: string, value) => void;
  onToggle: () => void;
}

const Options = ({
  disabledChoice,
  layoutChoice,
  onChangeOption,
  onToggle,
  showing,
  validateBeforeSubmitChoice,
  validatePristineChoice,
}: Props): JSX.Element => {
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
        changeCallback={onChangeOption}
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
        changeCallback={onChangeOption}
      />
      <CheckboxGroup
        name="elementOptions"
        options={[{value: 'disabled', label: 'disabled'}]}
        value={[disabledChoice ? 'disabled' : '']}
        label="Element options"
        changeCallback={onChangeOption}
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

export default Options;
