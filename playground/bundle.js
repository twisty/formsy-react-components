(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRC = require('formsy-react-components');

var Row = FRC.Row;
var Input = FRC.Input;
var Select = FRC.Select;
var Textarea = FRC.Textarea;
var RadioGroup = FRC.RadioGroup;

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
                            value: "", 
                            label: "Text", 
                            type: "text", 
                            placeholder: "Here is a text input.", 
                            help: "This is a required text input.", 
                            required: true})
                        ), 
                        React.createElement(Input, React.__spread({}, 
                            sharedProps, 
                            {name: "date1", 
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
                            {type: "file", 
                            name: "file1", 
                            label: "File picker"})
                        ), 
                        React.createElement(Input, React.__spread({}, 
                            sharedProps, 
                            {type: "range", 
                            name: "range1", 
                            label: "Range input", 
                            min: 0, 
                            max: 10, 
                            step: 2})
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


},{"formsy-react":"formsy-react","formsy-react-components":4,"react":"react"}],2:[function(require,module,exports){
'use strict';

var React = require('react');

var Icon = React.createClass({displayName: "Icon",

    requiredProps: {
        symbol: React.PropTypes.string.isRequired,
        className: React.PropTypes.string
    },

    defaultProps: {
        className: ''
    },

    render: function() {
        var className = 'glyphicon glyphicon-' + this.props.symbol + ' ' + this.props.className;
        return (
            React.createElement("span", {className: className, "aria-hidden": "true"})
        );
    }

});

module.exports = Icon;

},{"react":"react"}],3:[function(require,module,exports){
/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRCMixin = require('./mixin');
var Row = require('./row');
var Icon = require('./icon.js');

var Input = React.createClass({displayName: "Input",

    mixins: [Formsy.Mixin, FRCMixin],

    propTypes: {
        type: React.PropTypes.oneOf([
            'color',
            'date',
            'datetime',
            'datetime-local',
            'email',
            'file',
            'hidden',
            'month',
            'number',
            'password',
            'range',
            'search',
            'tel',
            'text',
            'time',
            'url',
            'week'
        ])
    },

    changeValue: function(event) {
        this.setValue(event.currentTarget.value);
    },

    getDefaultProps: function() {
        return {
            type: 'text'
        };
    },

    render: function() {

        var element = this.renderElement();

        if (this.props.layout === 'elementOnly' || this.props.type === 'hidden') {
            return element;
        }

        var warningIcon = '';
        if (this.showErrors()) {
            warningIcon = (
                React.createElement(Icon, {symbol: "remove", className: "form-control-feedback"})
            );
        }

        return (
            React.createElement(Row, {
                label: this.props.label, 
                required: this.isRequired(), 
                hasErrors: this.showErrors(), 
                layout: this.props.layout
            }, 
                element, 
                warningIcon, 
                this.renderHelp(), 
                this.renderErrorMessage()
            )
        );
    },

    renderElement: function() {
        var className = 'form-control';
        if (['file', 'range'].indexOf(this.props.type) !== -1) {
            className = null;
        }
        return (
            React.createElement("input", React.__spread({
                className: className}, 
                this.props, 
                {label: null, 
                value: this.getValue(), 
                onChange: this.changeValue, 
                disabled: this.isFormDisabled() || this.props.disabled})
            )
        );
    }

});

module.exports = Input;

},{"./icon.js":2,"./mixin":5,"./row":7,"formsy-react":"formsy-react","react":"react"}],4:[function(require,module,exports){
'use strict';

module.exports = {
    Input: require('./input'),
    Textarea: require('./textarea'),
    Select: require('./select'),
    RadioGroup: require('./radio-group'),
    Row: require('./row'),
    Icon: require('./icon')
};

},{"./icon":2,"./input":3,"./radio-group":6,"./row":7,"./select":8,"./textarea":9}],5:[function(require,module,exports){
'use strict';

var React = require('react');

module.exports = {
    getDefaultProps: function() {
        return {
            disabled: false,
            validatePristine: false,
            layout: 'horizontal',
            onChange: function() {},
            onFocus: function() {},
            onBlur: function() {}
        };
    },

    renderHelp: function() {
        if (!this.props.help) {
            return '';
        }
        return (
            React.createElement("span", {className: "help-block"}, this.props.help)
        );
    },

    renderErrorMessage: function() {
        if (!this.showErrors()) {
            return '';
        }
        var errorMessage = this.getErrorMessage();
        if (!errorMessage) {
            return '';
        }
        return (
            React.createElement("span", {className: "help-block validation-message"}, errorMessage)
        );
    },

    showErrors: function() {
        if (this.isPristine() === true) {
            if (this.props.validatePristine === false) {
                return false;
            }
        }
        return (this.isValid() === false);
    }
};

},{"react":"react"}],6:[function(require,module,exports){
/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRCMixin = require('./mixin');
var Row = require('./row');

var RadioGroup = React.createClass({displayName: "RadioGroup",

    mixins: [Formsy.Mixin, FRCMixin],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.oneOf(['inline', 'stacked']),
        options: React.PropTypes.array.isRequired
    },

    getDefaultProps: function() {
        return {
            type: 'stacked',
            label: '',
            help: null
        };
    },

    changeRadio: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function() {
        var _this = this;
        var controls = this.props.options.map(function(radio, key) {
            var checked = (_this.getValue() === radio.value);
            var disabled = _this.isFormDisabled() || radio.disabled || _this.props.disabled;
            var className = 'radio' + (disabled ? ' disabled' : '');
            if (_this.props.type === 'inline') {
                return (
                    React.createElement("label", {className: "radio-inline", key: key}, 
                        React.createElement("input", {
                            checked: checked, 
                            type: "radio", 
                            value: radio.value, 
                            onChange: _this.changeRadio, 
                            disabled: disabled}
                        ), " ", radio.label
                    )
                );
            }
            return (
                React.createElement("div", {className: className, key: key}, 
                    React.createElement("label", null, 
                        React.createElement("input", {
                            checked: checked, 
                            type: "radio", 
                            value: radio.value, 
                            onChange: _this.changeRadio, 
                            disabled: disabled}
                        ), " ", radio.label
                    )
                )
            );
        });
        return controls;
    },

    render: function() {

        if (this.props.layout === 'elementOnly') {
            return (
                React.createElement("div", null, this.renderElement())
            );
        }

        return (
            React.createElement(Row, {
                label: this.props.label, 
                required: this.isRequired(), 
                hasErrors: this.showErrors(), 
                layout: this.props.layout, 
                fakeLabel: true
            }, 
                this.renderElement(), 
                this.renderHelp(), 
                this.renderErrorMessage()
            )
        );
    }
});

module.exports = RadioGroup;

},{"./mixin":5,"./row":7,"formsy-react":"formsy-react","react":"react"}],7:[function(require,module,exports){
/*jshint node:true */

'use strict';

var React = require('react');

var Row = React.createClass({displayName: "Row",

    propTypes: {
        label: React.PropTypes.string,
        required: React.PropTypes.bool,
        hasErrors: React.PropTypes.bool,
        fakeLabel: React.PropTypes.bool,
        layout: React.PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
        htmlFor: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            label: '',
            required: false,
            hasErrors: false,
            fakeLabel: false
        };
    },

    renderLabel: function() {

        if (this.props.layout === 'elementOnly') {
            return '';
        }

        var labelWrapper = [];
        labelWrapper.push('control-label');

        if (this.props.layout === 'horizontal') {
            labelWrapper.push('col-sm-3');
        }

        if (this.props.fakeLabel) {
            return (
                React.createElement("div", {className: labelWrapper.join(' ')}, 
                    React.createElement("strong", null, 
                        this.props.label, 
                        this.props.required ? ' *' : null
                    )
                )
            );
        }
        return (
            React.createElement("label", {className: labelWrapper.join(' '), htmlFor: this.props.htmlFor}, 
                this.props.label, 
                this.props.required ? ' *' : null
            )
        );
    },

    render: function() {

        if (this.props.layout === 'elementOnly') {
            return (
                React.createElement("span", null, 
                this.props.children
                )
            );
        }

        var classNames = {
            formGroup: ['form-group'],
            elementWrapper: []
        };

        if (this.props.layout === 'horizontal') {
            classNames.elementWrapper.push('col-sm-9');
        }

        if (this.props.hasErrors) {
            classNames.formGroup.push('has-error');
            classNames.formGroup.push('has-warning');
            classNames.formGroup.push('has-feedback');
        }

        var element = this.props.children;
        if (this.props.layout === 'horizontal') {
            element = (
                React.createElement("div", {className: classNames.elementWrapper.join(' ')}, 
                    this.props.children
                )
            );
        }

        return (
            React.createElement("div", {className: classNames.formGroup.join(' ')}, 
                this.renderLabel(), 
                element
            )
        );
    }

});

module.exports = Row;

},{"react":"react"}],8:[function(require,module,exports){
/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRCMixin = require('./mixin');
var Row = require('./row');

var Select = React.createClass({displayName: "Select",

    mixins: [Formsy.Mixin, FRCMixin],

    changeValue: function(event) {
        var target = event.currentTarget;
        var value;
        if (this.props.multiple) {
            value = [];
            for (var i = 0; i < target.length; i++){
                var option = target.options[i];
                if (option.selected) {
                    value.push(option.value);
                }
            }
        } else {
            value = target.value;
        }
        this.setValue(value);
    },

    render: function() {

        if (this.props.layout === 'elementOnly') {
            return this.renderElement();
        }

        return (
            React.createElement(Row, {
                label: this.props.label, 
                required: this.isRequired(), 
                hasErrors: this.showErrors(), 
                layout: this.props.layout
            }, 
                this.renderElement(), 
                this.renderHelp(), 
                this.renderErrorMessage()
            )
        );
    },

    renderElement: function() {
        var optionNodes = this.props.options.map(function(item) {
            return (
                React.createElement("option", {key: item.value, value: item.value}, item.label)
            );
        });
        return (
            React.createElement("select", React.__spread({
                className: "form-control"}, 
                this.props, 
                {value: this.getValue(), 
                onChange: this.changeValue, 
                disabled: this.isFormDisabled() || this.props.disabled
            }), 
                optionNodes
            )
        );
    }
});

module.exports = Select;

},{"./mixin":5,"./row":7,"formsy-react":"formsy-react","react":"react"}],9:[function(require,module,exports){
/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var Row = require('./row');
var FRCMixin = require('./mixin');

var Textarea = React.createClass({displayName: "Textarea",

    mixins: [Formsy.Mixin, FRCMixin],

    propTypes: {
        rows: React.PropTypes.number,
        cols: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            rows: 3,
            cols: 0 // React doesn't render the cols attribute if it is zero
        };
    },

    changeValue: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function() {
        return (
            React.createElement("textarea", React.__spread({
                className: "form-control"}, 
                this.props, 
                {value: this.getValue(), 
                onChange: this.changeValue, 
                disabled: this.isFormDisabled() || this.props.disabled
            }))
        );
    },

    render: function() {

        if (this.props.layout === 'elementOnly') {
            return this.renderElement();
        }

        return (
            React.createElement(Row, {
                label: this.props.label, 
                required: this.isRequired(), 
                hasErrors: this.showErrors(), 
                layout: this.props.layout, 
                htmlFor: this.props.name
            }, 
                this.renderElement(), 
                this.renderHelp(), 
                this.renderErrorMessage()
            )
        );
    }
});

module.exports = Textarea;

},{"./mixin":5,"./row":7,"formsy-react":"formsy-react","react":"react"}]},{},[1]);
