import React from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

const {Checkbox, RadioGroup, ParentContextMixin} = FRC;

const Options = React.createClass({

    mixins: [ParentContextMixin],

    render() {
        return (
            <div className="well">
                <Formsy.Form className={this.getLayoutClassName()}>
                    <RadioGroup
                        name="layout"
                        type="inline"
                        label="layout"
                        value={this.props.layoutChoice}
                        options={[
                            {value: 'horizontal', label: <code>horizontal</code>},
                            {value: 'vertical', label: <code>vertical</code>},
                            {value: 'elementOnly', label: <code>elementOnly</code>}
                        ]}
                        onChange={this.props.changeOption}
                    />
                    <Checkbox
                        name="validatePristine"
                        value={this.props.validatePristineChoice}
                        onChange={this.props.changeOption}
                        label="Yes"
                        rowLabel="validatePristine"
                    />
                    <Checkbox
                        name="disabled"
                        value={this.props.disabledChoice}
                        onChange={this.props.changeOption}
                        label="Yes"
                        rowLabel="disabled"
                    />
                </Formsy.Form>
            </div>
        );
    }
});

module.exports = Options;
