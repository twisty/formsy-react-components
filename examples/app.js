'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var Row = require('../src/row');
var Input = require('../src/input');
var Select = require('../src/select');
var Textarea = require('../src/textarea');
var RadioGroup = require('../src/radio-group');

var Examples = React.createClass({

    getInitialState: function() {
        return {
            layout: 'horizontal',
            validatePristine: false,
            disabled: false
        };
    },

    resetForm: function () {
        this.refs.form.reset();
    },

    changeLayout: function(layout) {
        this.setState({layout: layout});
    },

    changeSelectProp: function(event) {
        var target = event.currentTarget;
        this.changeProp(target.name, target.checked);
    },

    changeProp: function(name, value) {
        var newState = {};
        newState[name] = value;
        this.setState(newState);
    },

    render: function() {

        var radioOptions = [
            {value: 'a', label: 'Option A'},
            {value: 'b', label: 'Option B'},
            {value: 'c', label: 'Option C'}
        ];

        var radioOptionsDisabled = [
            {value: 'a', label: 'Option A'},
            {value: 'b', label: 'Option B', disabled: true},
            {value: 'c', label: 'Option C'}
        ];

        var selectOptions = radioOptions.slice(0);
        selectOptions.unshift({value: '', label: 'Please select…'});

        var formClassName = '';
        if (this.state.layout === 'horizontal') {
            formClassName = 'form-horizontal';
        }

        return (
            <div className="row">
                <div className="page-header">
                    <h1>Form Playground</h1>
                </div>
                <h3>Options…</h3>
                <div className="well">
                    <Formsy.Form className="form-horizontal">
                        <RadioGroup
                            name="layout"
                            type="inline"
                            label="layout"
                            value={this.state.layout}
                            options={[
                                {value: 'horizontal', label: <code>horizontal</code>},
                                {value: 'vertical', label: <code>vertical</code>},
                                {value: 'elementOnly', label: <code>elementOnly</code>}
                            ]}
                            onChange={this.changeProp}
                        />
                        <Row layout="horizontal" label="validatePristine">
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        defaultChecked={this.state.validatePristine}
                                        name="validatePristine"
                                        onChange={this.changeSelectProp}
                                    /> Yes
                                </label>
                            </div>
                        </Row>
                        <Row layout="horizontal" label="disabled">
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        defaultChecked={this.state.disabled}
                                        name="disabled"
                                        onChange={this.changeSelectProp}
                                    /> Yes
                                </label>
                            </div>
                        </Row>
                    </Formsy.Form>
                </div>
                <div className="page-header">
                    <h2>Layout: <code>{this.state.layout}</code></h2>
                </div>
                <Formsy.Form className={formClassName} ref="form">
                    <fieldset>
                        <legend>Input types</legend>
                        <Input
                            name="text1"
                            value=""
                            label="Text"
                            type="text"
                            layout={this.state.layout}
                            validatePristine={this.state.validatePristine}
                            disabled={this.state.disabled}
                            placeholder="Here is a text input."
                            help="This is a required text input."
                            required
                        />
                        <Input
                            name="date1"
                            value=""
                            label="Date"
                            type="date"
                            layout={this.state.layout}
                            validatePristine={this.state.validatePristine}
                            disabled={this.state.disabled}
                            placeholder="This is a date input."
                            required
                        />
                        <Input
                            name="email1"
                            value=""
                            label="Email"
                            type="email"
                            layout={this.state.layout}
                            validatePristine={this.state.validatePristine}
                            disabled={this.state.disabled}
                            placeholder="This is an email input."
                        />
                        <Input
                            name="password1"
                            value=""
                            label="Password"
                            type="password"
                            layout={this.state.layout}
                            validatePristine={this.state.validatePristine}
                            validations="minLength:8"
                            validationError="Your password must be at least 8 characters long."
                            disabled={this.state.disabled}
                            placeholder="Choose a password"
                        />
                        <Input
                            name="password2"
                            value=""
                            label="Confirm password"
                            type="password"
                            layout={this.state.layout}
                            validatePristine={this.state.validatePristine}
                            disabled={this.state.disabled}
                            validations="equalsField:password1"
                            validationErrors={{
                                equalsField: 'Passwords must match.'
                            }}
                            placeholder="Retype password"
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Textarea</legend>
                        <Textarea
                            name="txtArea1"
                            label="Textarea"
                            layout={this.state.layout}
                            validatePristine={this.state.validatePristine}
                            disabled={this.state.disabled}
                            placeholder="This field requires 10 characters."
                            help="This is some help text for the textarea."
                            validations="minLength:10"
                            validationErrors={{
                                minLength: 'Please provide at least 10 characters.'
                            }}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Select</legend>
                        <Select
                            name="select1"
                            label="Select"
                            layout={this.state.layout}
                            validatePristine={this.state.validatePristine}
                            disabled={this.state.disabled}
                            help="This is a required select element."
                            options={selectOptions}
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Radio group</legend>
                        <RadioGroup
                            name="radioGrp1"
                            value="b"
                            label="Radio group (stacked)"
                            layout={this.state.layout}
                            validatePristine={this.state.validatePristine}
                            disabled={this.state.disabled}
                            help="Here, “Option B” is initially selected."
                            options={radioOptions}
                        />
                        <RadioGroup
                            name="radioGrp2"
                            type="inline"
                            label="Radio group (inline)"
                            layout={this.state.layout}
                            validatePristine={this.state.validatePristine}
                            disabled={this.state.disabled}
                            help="This is a required radio group."
                            options={radioOptions}
                            required
                        />
                        <RadioGroup
                            name="radioGrp3"
                            type="inline"
                            label="Radio group (disabled)"
                            layout={this.state.layout}
                            validatePristine={this.state.validatePristine}
                            disabled={this.state.disabled}
                            help="Here, “Option B” is disabled."
                            options={radioOptionsDisabled}
                        />
                    </fieldset>
                    <Row layout={this.state.layout}>
                        <input className="btn btn-default" onClick={this.resetForm} type="reset" defaultValue="Reset" />
                        {' '}
                        <input className="btn btn-primary" type="submit" defaultValue="Submit" />
                    </Row>
                </Formsy.Form>
            </div>
        );
    }
});

React.render(
    <Examples />,
    document.getElementById('examples')
);
