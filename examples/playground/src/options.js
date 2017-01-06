/* eslint-env node, browser */

import React, { PropTypes } from 'react';
import FRC from 'formsy-react-components';

const { Checkbox, RadioGroup } = FRC;

const Options = (props) => {

    const { disabledChoice, layoutChoice, validatePristineChoice, onChangeOption } = props;

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
    disabledChoice: PropTypes.bool.isRequired,
    layoutChoice: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']).isRequired,
    validatePristineChoice: PropTypes.bool.isRequired,
    onChangeOption: PropTypes.func.isRequired
};

export default Options;
