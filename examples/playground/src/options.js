import React, { Component, PropTypes } from 'react';
import FRC from 'formsy-react-components';

const { Checkbox, RadioGroup } = FRC;

const Options = (props) => {

    let { disabledChoice, layoutChoice, validatePristineChoice, onChangeOption } = props;
    return (
        <div className="well">
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
                    name="disabled"
                    value={disabledChoice}
                    valueLabel="Yes"
                    label="disabled"
                    onChange={onChangeOption}
                />
            </FRC.Form>
        </div>
    );
}

Options.propTypes = {
    onChangeOption: PropTypes.func.isRequired,
    disabledChoice: PropTypes.bool,
    layoutChoice: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
    validatePristineChoice: PropTypes.bool
};

export default Options;
