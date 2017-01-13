/* eslint-env node, browser */

import React, { PropTypes } from 'react';
import FRC from 'formsy-react-components';

const { Checkbox, RadioGroup } = FRC;

const Options = (props) => {

    const { disabledChoice, layoutChoice, validateOnSubmitChoice, validatePristineChoice, onChangeOption } = props;

    const optionsForm = (
        <FRC.Form>
            <RadioGroup
                name="layout"
                type="inline"
                label="layout"
                value={layoutChoice}
                options={[
                    {value: 'horizontal', label: <code>horizontal</code>},
                    {value: 'vertical', label: <code>vertical</code>},
                    {value: 'elementOnly', label: <code>elementOnly</code>}
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
        </FRC.Form>
    );

    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <button
                    className="btn btn-default"
                    onClick={props.onToggle}>
                    {props.showing ? 'Hide options' : 'Show options'}
                </button>
            </div>
            {props.showing ? (
                <div className="panel-body">
                    {optionsForm}
                </div>
            ) : null}
        </div>
    );
}

Options.propTypes = {
    disabledChoice: PropTypes.bool.isRequired,
    layoutChoice: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']).isRequired,
    showing: PropTypes.bool.isRequired,
    validateOnSubmitChoice: PropTypes.bool.isRequired,
    validatePristineChoice: PropTypes.bool.isRequired,
    onChangeOption: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default Options;
