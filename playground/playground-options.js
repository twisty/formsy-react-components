'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRC = require('formsy-react-components');

var Checkbox = FRC.Checkbox;
var RadioGroup = FRC.RadioGroup;

var PlaygroundOptions = React.createClass({

    mixins: [FRC.ParentContextMixin],

    render: function() {
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

module.exports = PlaygroundOptions;
