(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRC = require('formsy-react-components');

var Checkbox = FRC.Checkbox;
var CheckboxGroup = FRC.CheckboxGroup;
var Input = FRC.Input;
var RadioGroup = FRC.RadioGroup;
var Row = FRC.Row;
var Select = FRC.Select;
var File = FRC.File;
var Textarea = FRC.Textarea;

var Playground = React.createClass({displayName: "Playground",

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

        var sharedProps = {
            layout: this.state.layout,
            validatePristine: this.state.validatePristine,
            disabled: this.state.disabled
        };

        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "page-header"}, 
                    React.createElement("h1", null, "Form Playground")
                ), 
                React.createElement("h3", null, "Options…"), 
                React.createElement("div", {className: "well"}, 
                    React.createElement(Formsy.Form, {className: "form-horizontal"}, 
                        React.createElement(RadioGroup, {
                            name: "layout", 
                            type: "inline", 
                            label: "layout", 
                            value: this.state.layout, 
                            options: [
                                {value: 'horizontal', label: React.createElement("code", null, "horizontal")},
                                {value: 'vertical', label: React.createElement("code", null, "vertical")},
                                {value: 'elementOnly', label: React.createElement("code", null, "elementOnly")}
                            ], 
                            onChange: this.changeProp}
                        ), 
                        React.createElement(Row, {layout: "horizontal", label: "validatePristine"}, 
                            React.createElement("div", {className: "checkbox"}, 
                                React.createElement("label", null, 
                                    React.createElement("input", {
                                        type: "checkbox", 
                                        defaultChecked: this.state.validatePristine, 
                                        name: "validatePristine", 
                                        onChange: this.changeSelectProp}
                                    ), " Yes"
                                )
                            )
                        ), 
                        React.createElement(Row, {layout: "horizontal", label: "disabled"}, 
                            React.createElement("div", {className: "checkbox"}, 
                                React.createElement("label", null, 
                                    React.createElement("input", {
                                        type: "checkbox", 
                                        defaultChecked: this.state.disabled, 
                                        name: "disabled", 
                                        onChange: this.changeSelectProp}
                                    ), " Yes"
                                )
                            )
                        )
                    )
                ), 
                React.createElement("div", {className: "page-header"}, 
                    React.createElement("h2", null, "Layout: ", React.createElement("code", null, this.state.layout))
                ), 
                React.createElement(Formsy.Form, {className: formClassName, onSubmit: this.submitForm, ref: "form"}, 
                    React.createElement("fieldset", null, 
                        React.createElement("legend", null, "Input types"), 
                        React.createElement(Input, React.__spread({}, 
                            sharedProps, 
                            {name: "text1", 
                            id: "artisanCraftedBespokeId", 
                            value: "", 
                            label: "Text", 
                            type: "text", 
                            placeholder: "Here is a text input.", 
                            help: "This is a required text input.", 
                            required: true})
                        ), 
                        React.createElement(Input, React.__spread({}, 
                            sharedProps, 
                            {name: "date[0]", 
                            value: "", 
                            label: "Date", 
                            type: "date", 
                            placeholder: "This is a date input.", 
                            required: true})
                        ), 
                        React.createElement(Input, React.__spread({}, 
                            sharedProps, 
                            {name: "email1", 
                            value: "", 
                            label: "Email", 
                            type: "email", 
                            placeholder: "This is an email input."})
                        ), 
                        React.createElement(Input, React.__spread({}, 
                            sharedProps, 
                            {name: "password1", 
                            value: "", 
                            label: "Password", 
                            type: "password", 
                            validations: "minLength:8", 
                            validationError: "Your password must be at least 8 characters long.", 
                            placeholder: "Choose a password"})
                        ), 
                        React.createElement(Input, React.__spread({}, 
                            sharedProps, 
                            {name: "password2", 
                            value: "", 
                            label: "Confirm password", 
                            type: "password", 
                            validations: "equalsField:password1", 
                            validationErrors: {
                                equalsField: 'Passwords must match.'
                            }, 
                            placeholder: "Retype password"})
                        ), 
                        React.createElement(Input, React.__spread({}, 
                            sharedProps, 
                            {type: "color", 
                            name: "colour1", 
                            label: "Colour input", 
                            value: "#000000", 
                            validations: "equals:#000000", 
                            validationError: "You can have any color, as long as it's black."})
                        ), 
                        React.createElement(Input, React.__spread({}, 
                            sharedProps, 
                            {type: "range", 
                            name: "range1", 
                            label: "Range input", 
                            min: 0, 
                            max: 10, 
                            step: 2})
                        ), 
                        React.createElement(File, React.__spread({}, 
                            sharedProps, 
                            {name: "file1", 
                            label: "File picker", 
                            help: "Warning: this returns a FileList that will need custom coding to be useful.", 
                            multiple: true})
                        )
                    ), 
                    React.createElement("fieldset", null, 
                        React.createElement("legend", null, "Textarea"), 
                        React.createElement(Textarea, React.__spread({}, 
                            sharedProps, 
                            {rows: 3, 
                            cols: 40, 
                            name: "txtArea1", 
                            label: "Textarea", 
                            placeholder: "This field requires 10 characters.", 
                            help: "This is some help text for the textarea.", 
                            validations: "minLength:10", 
                            validationErrors: {
                                minLength: 'Please provide at least 10 characters.'
                            }})
                        )
                    ), 
                    React.createElement("fieldset", null, 
                        React.createElement("legend", null, "Select"), 
                        React.createElement(Select, React.__spread({}, 
                            sharedProps, 
                            {name: "select1", 
                            label: "Select", 
                            help: "This is a required select element.", 
                            options: selectOptions, 
                            required: true})
                        ), 
                        React.createElement(Select, React.__spread({}, 
                            sharedProps, 
                            {name: "select2", 
                            value: ['a', 'c'], 
                            label: "Select (multiple)", 
                            help: "Here, “Option A” and “Option C” are initially selected.", 
                            options: radioOptions, 
                            multiple: true})
                        )
                    ), 
                    React.createElement("fieldset", null, 
                        React.createElement("legend", null, "Checkboxes"), 
                        React.createElement(Checkbox, React.__spread({}, 
                            sharedProps, 
                            {name: "checkbox1", 
                            value: true, 
                            label: "Check me out", 
                            rowLabel: "Checkbox (single)"})
                        ), 
                        React.createElement(CheckboxGroup, React.__spread({}, 
                            sharedProps, 
                            {name: "checkboxGrp1", 
                            value: ['a', 'c'], 
                            label: "Checkbox group (stacked)", 
                            help: "Here, “Option A” and “Option C” are initially selected.", 
                            options: radioOptions, 
                            multiple: true})
                        )
                    ), 
                    React.createElement("fieldset", null, 
                        React.createElement("legend", null, "Radio group"), 
                        React.createElement(RadioGroup, React.__spread({}, 
                            sharedProps, 
                            {name: "radioGrp1", 
                            value: "b", 
                            label: "Radio group (stacked)", 
                            help: "Here, “Option B” is initially selected.", 
                            options: radioOptions})
                        ), 
                        React.createElement(RadioGroup, React.__spread({}, 
                            sharedProps, 
                            {name: "radioGrp2", 
                            type: "inline", 
                            label: "Radio group (inline)", 
                            help: "This is a required radio group.", 
                            options: radioOptions, 
                            required: true})
                        ), 
                        React.createElement(RadioGroup, React.__spread({}, 
                            sharedProps, 
                            {name: "radioGrp3", 
                            type: "inline", 
                            label: "Radio group (disabled)", 
                            help: "Here, “Option B” is disabled.", 
                            options: radioOptionsDisabled})
                        )
                    ), 
                    React.createElement(Row, {layout: this.state.layout}, 
                        React.createElement("input", {className: "btn btn-default", onClick: this.resetForm, type: "reset", defaultValue: "Reset"}), 
                        ' ', 
                        React.createElement("input", {className: "btn btn-primary", formNoValidate: true, type: "submit", defaultValue: "Submit"})
                    )
                )
            )
        );
    }
});

React.render(
    React.createElement(Playground, null),
    document.getElementById('playground')
);

},{"formsy-react":"formsy-react","formsy-react-components":"formsy-react-components","react":"react"}]},{},[1]);
