import React, { PropTypes } from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

const { Checkbox, RadioGroup, ParentContextMixin } = FRC;

const Options = React.createClass({

    mixins: [ParentContextMixin],

    propTypes: {
        onChangeOption: PropTypes.func.isRequired,
        disabledChoice: PropTypes.bool,
        layoutChoice: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
        validatePristineChoice: PropTypes.bool
    },

    render() {
        let { disabledChoice, layoutChoice, validatePristineChoice, onChangeOption } = this.props;
        return (
            <div className="well">
                <Formsy.Form className={this.getLayoutClassName()}>
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
                        label="Yes"
                        rowLabel="validatePristine"
                        onChange={onChangeOption}
                    />
                    <Checkbox
                        name="disabled"
                        value={disabledChoice}
                        label="Yes"
                        rowLabel="disabled"
                        onChange={onChangeOption}
                    />
                </Formsy.Form>
            </div>
        );
    }
});

module.exports = Options;
