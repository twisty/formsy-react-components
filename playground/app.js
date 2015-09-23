'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Formsy = require('formsy-react');
var FRC = require('formsy-react-components');
var PlaygroundOptions = require('./playground-options');

var Checkbox = FRC.Checkbox;
var CheckboxGroup = FRC.CheckboxGroup;
var Input = FRC.Input;
var RadioGroup = FRC.RadioGroup;
var Row = FRC.Row;
var Select = FRC.Select;
var File = FRC.File;
var Textarea = FRC.Textarea;

var Playground = React.createClass({

    getInitialState: function() {
        return {
            layout: 'horizontal',
            validatePristine: false,
            disabled: false
        };
    },

    resetForm: function() {
        this.refs.form.reset();
    },

    submitForm: function(data) {
        console.log(data);
    },

    changeLayout: function(layout) {
        this.setState({layout: layout});
    },

    changeOption: function(name, value) {
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

        var sharedProps = {
            layout: this.state.layout,
            validatePristine: this.state.validatePristine,
            disabled: this.state.disabled
        };

        return (
            <div className="row">
                <div className="page-header">
                    <h1>Form Playground</h1>
                </div>
                <h3>Options…</h3>
                <PlaygroundOptions
                    layoutChoice={this.state.layout}
                    validatePristineChoice={this.state.validatePristine}
                    disabledChoice={this.state.disabled}
                    changeOption={this.changeOption}
                />
                <div className="page-header">
                    <h2>Layout: <code>{this.state.layout}</code></h2>
                </div>
                <Formsy.Form className={formClassName} onSubmit={this.submitForm} ref="form">
                    <fieldset>
                        <legend>Input types</legend>
                        <Input
                            {...sharedProps}
                            name="text1"
                            id="artisanCraftedBespokeId"
                            value=""
                            label="Text"
                            type="text"
                            placeholder="Here is a text input."
                            help="This is a required text input."
                            required
                        />
                        <Input
                            {...sharedProps}
                            name="date[0]"
                            value=""
                            label="Date"
                            type="date"
                            placeholder="This is a date input."
                            required
                        />
                        <Input
                            {...sharedProps}
                            name="email"
                            value=""
                            label="Email"
                            type="email"
                            autoComplete="off"
                            placeholder="This is an email input."
                            help="This email field should not autocomplete."
                            required="isEmail"
                        />
                        <Input
                            {...sharedProps}
                            name="password1"
                            value=""
                            label="Password"
                            type="password"
                            validations="minLength:8"
                            validationError="Your password must be at least 8 characters long."
                            placeholder="Choose a password"
                        />
                        <Input
                            {...sharedProps}
                            name="password2"
                            value=""
                            label="Confirm password"
                            type="password"
                            validations="equalsField:password1"
                            validationErrors={{
                                equalsField: 'Passwords must match.'
                            }}
                            placeholder="Retype password"
                        />
                        <Input
                            {...sharedProps}
                            type="color"
                            name="colour1"
                            label="Colour input"
                            value="#000000"
                            validations="equals:#000000"
                            validationError="You can have any color, as long as it's black."
                        />
                        <Input
                            {...sharedProps}
                            type="range"
                            name="range1"
                            label="Range input"
                            min={0}
                            max={10}
                            step={2}
                        />
                        <File
                            {...sharedProps}
                            name="file1"
                            label="File picker"
                            help="Warning: this returns a FileList that will need custom coding to be useful."
                            multiple
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Textarea</legend>
                        <Textarea
                            {...sharedProps}
                            rows={3}
                            cols={40}
                            name="txtArea1"
                            label="Textarea"
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
                            {...sharedProps}
                            name="select1"
                            label="Select"
                            help="This is a required select element."
                            options={selectOptions}
                            required
                        />
                        <Select
                            {...sharedProps}
                            name="select2"
                            value={['a', 'c']}
                            label="Select (multiple)"
                            help="Here, “Option A” and “Option C” are initially selected."
                            options={radioOptions}
                            multiple
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Checkboxes</legend>
                        <Checkbox
                            {...sharedProps}
                            name="checkbox1"
                            value={true}
                            label="Check me out"
                            rowLabel="Checkbox (single)"
                        />
                        <CheckboxGroup
                            {...sharedProps}
                            name="checkboxGrp1"
                            value={['a', 'c']}
                            label="Checkbox group (stacked)"
                            help="Here, “Option A” and “Option C” are initially selected."
                            options={radioOptions}
                            multiple
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Radio group</legend>
                        <RadioGroup
                            {...sharedProps}
                            name="radioGrp1"
                            value="b"
                            label="Radio group (stacked)"
                            help="Here, “Option B” is initially selected."
                            options={radioOptions}
                        />
                        <RadioGroup
                            {...sharedProps}
                            name="radioGrp2"
                            type="inline"
                            label="Radio group (inline)"
                            help="This is a required radio group."
                            options={radioOptions}
                            required
                        />
                        <RadioGroup
                            {...sharedProps}
                            name="radioGrp3"
                            type="inline"
                            label="Radio group (disabled)"
                            help="Here, “Option B” is disabled."
                            options={radioOptionsDisabled}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Layout tweaks</legend>
                        <Input
                            {...sharedProps}
                            name="cssTweaks"
                            value=""
                            label="This row is yellow"
                            type="text"
                            placeholder="Label is col-sm-5, element-wrapper is col-sm-7"
                            rowClassName="yellow"
                            labelClassName={[{'col-sm-3': false}, 'col-sm-5']}
                            elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']}
                            help="You can set the row, label, and element-wrapper CSS classes."
                        />
                    </fieldset>
                    <Row layout={this.state.layout}>
                        <input className="btn btn-default" onClick={this.resetForm} type="reset" defaultValue="Reset" />
                        {' '}
                        <input className="btn btn-primary" formNoValidate={true} type="submit" defaultValue="Submit" />
                    </Row>
                </Formsy.Form>
            </div>
        );
    }
});

ReactDOM.render(
    <Playground />,
    document.getElementById('playground')
);
