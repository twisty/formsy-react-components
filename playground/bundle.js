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
                React.createElement(Formsy.Form, {className: formClassName, ref: "form"}, 
                    React.createElement("fieldset", null, 
                        React.createElement("legend", null, "Input types"), 
                        React.createElement(Input, {
                            name: "text1", 
                            value: "", 
                            label: "Text", 
                            type: "text", 
                            layout: this.state.layout, 
                            validatePristine: this.state.validatePristine, 
                            disabled: this.state.disabled, 
                            placeholder: "Here is a text input.", 
                            help: "This is a required text input.", 
                            required: true}
                        ), 
                        React.createElement(Input, {
                            name: "date1", 
                            value: "", 
                            label: "Date", 
                            type: "date", 
                            layout: this.state.layout, 
                            validatePristine: this.state.validatePristine, 
                            disabled: this.state.disabled, 
                            placeholder: "This is a date input.", 
                            required: true}
                        ), 
                        React.createElement(Input, {
                            name: "email1", 
                            value: "", 
                            label: "Email", 
                            type: "email", 
                            layout: this.state.layout, 
                            validatePristine: this.state.validatePristine, 
                            disabled: this.state.disabled, 
                            placeholder: "This is an email input."}
                        ), 
                        React.createElement(Input, {
                            name: "password1", 
                            value: "", 
                            label: "Password", 
                            type: "password", 
                            layout: this.state.layout, 
                            validatePristine: this.state.validatePristine, 
                            validations: "minLength:8", 
                            validationError: "Your password must be at least 8 characters long.", 
                            disabled: this.state.disabled, 
                            placeholder: "Choose a password"}
                        ), 
                        React.createElement(Input, {
                            name: "password2", 
                            value: "", 
                            label: "Confirm password", 
                            type: "password", 
                            layout: this.state.layout, 
                            validatePristine: this.state.validatePristine, 
                            disabled: this.state.disabled, 
                            validations: "equalsField:password1", 
                            validationErrors: {
                                equalsField: 'Passwords must match.'
                            }, 
                            placeholder: "Retype password"}
                        )
                    ), 
                    React.createElement("fieldset", null, 
                        React.createElement("legend", null, "Textarea"), 
                        React.createElement(Textarea, {
                            rows: 3, 
                            cols: 40, 
                            name: "txtArea1", 
                            label: "Textarea", 
                            layout: this.state.layout, 
                            validatePristine: this.state.validatePristine, 
                            disabled: this.state.disabled, 
                            placeholder: "This field requires 10 characters.", 
                            help: "This is some help text for the textarea.", 
                            validations: "minLength:10", 
                            validationErrors: {
                                minLength: 'Please provide at least 10 characters.'
                            }}
                        )
                    ), 
                    React.createElement("fieldset", null, 
                        React.createElement("legend", null, "Select"), 
                        React.createElement(Select, {
                            name: "select1", 
                            label: "Select", 
                            layout: this.state.layout, 
                            validatePristine: this.state.validatePristine, 
                            disabled: this.state.disabled, 
                            help: "This is a required select element.", 
                            options: selectOptions, 
                            required: true}
                        )
                    ), 
                    React.createElement("fieldset", null, 
                        React.createElement("legend", null, "Radio group"), 
                        React.createElement(RadioGroup, {
                            name: "radioGrp1", 
                            value: "b", 
                            label: "Radio group (stacked)", 
                            layout: this.state.layout, 
                            validatePristine: this.state.validatePristine, 
                            disabled: this.state.disabled, 
                            help: "Here, “Option B” is initially selected.", 
                            options: radioOptions}
                        ), 
                        React.createElement(RadioGroup, {
                            name: "radioGrp2", 
                            type: "inline", 
                            label: "Radio group (inline)", 
                            layout: this.state.layout, 
                            validatePristine: this.state.validatePristine, 
                            disabled: this.state.disabled, 
                            help: "This is a required radio group.", 
                            options: radioOptions, 
                            required: true}
                        ), 
                        React.createElement(RadioGroup, {
                            name: "radioGrp3", 
                            type: "inline", 
                            label: "Radio group (disabled)", 
                            layout: this.state.layout, 
                            validatePristine: this.state.validatePristine, 
                            disabled: this.state.disabled, 
                            help: "Here, “Option B” is disabled.", 
                            options: radioOptionsDisabled}
                        )
                    ), 
                    React.createElement(Row, {layout: this.state.layout}, 
                        React.createElement("input", {className: "btn btn-default", onClick: this.resetForm, type: "reset", defaultValue: "Reset"}), 
                        ' ', 
                        React.createElement("input", {className: "btn btn-primary", type: "submit", defaultValue: "Submit"})
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
        type: React.PropTypes.oneOf(['text', 'date', 'email', 'password', 'hidden'])
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

        var warningIcon = '';

        if (this.showErrors()) {
            warningIcon = (
                React.createElement(Icon, {symbol: "remove", className: "form-control-feedback"})
            );
        }

        if (this.props.layout === 'elementOnly' || this.props.type === 'hidden') {
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
                warningIcon, 
                this.renderHelp(), 
                this.renderErrorMessage()
            )
        );
    },

    renderElement: function() {
        return (
            React.createElement("input", React.__spread({
                className: "form-control"}, 
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
            React.createElement("span", {className: "help-block"}, errorMessage)
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
        this.setValue(event.currentTarget.value);
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

},{"./mixin":5,"./row":7,"formsy-react":"formsy-react","react":"react"}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS90aW0vc291cmNlL2Zvcm1zeS1yZWFjdC1jb21wb25lbnRzLXBhZ2VzL3BsYXlncm91bmQvYXBwLmpzIiwibm9kZV9tb2R1bGVzL2Zvcm1zeS1yZWFjdC1jb21wb25lbnRzL3JlbGVhc2UvaWNvbi5qcyIsIm5vZGVfbW9kdWxlcy9mb3Jtc3ktcmVhY3QtY29tcG9uZW50cy9yZWxlYXNlL2lucHV0LmpzIiwibm9kZV9tb2R1bGVzL2Zvcm1zeS1yZWFjdC1jb21wb25lbnRzL3JlbGVhc2UvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy9mb3Jtc3ktcmVhY3QtY29tcG9uZW50cy9yZWxlYXNlL21peGluLmpzIiwibm9kZV9tb2R1bGVzL2Zvcm1zeS1yZWFjdC1jb21wb25lbnRzL3JlbGVhc2UvcmFkaW8tZ3JvdXAuanMiLCJub2RlX21vZHVsZXMvZm9ybXN5LXJlYWN0LWNvbXBvbmVudHMvcmVsZWFzZS9yb3cuanMiLCJub2RlX21vZHVsZXMvZm9ybXN5LXJlYWN0LWNvbXBvbmVudHMvcmVsZWFzZS9zZWxlY3QuanMiLCJub2RlX21vZHVsZXMvZm9ybXN5LXJlYWN0LWNvbXBvbmVudHMvcmVsZWFzZS90ZXh0YXJlYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7QUFFYixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3JDLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOztBQUU3QyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO0FBQ2xCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDdEIsSUFBSSxNQUFNLEdBQUcsR0FB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QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRm9ybXN5ID0gcmVxdWlyZSgnZm9ybXN5LXJlYWN0Jyk7XG52YXIgRlJDID0gcmVxdWlyZSgnZm9ybXN5LXJlYWN0LWNvbXBvbmVudHMnKTtcblxudmFyIFJvdyA9IEZSQy5Sb3c7XG52YXIgSW5wdXQgPSBGUkMuSW5wdXQ7XG52YXIgU2VsZWN0ID0gRlJDLlNlbGVjdDtcbnZhciBUZXh0YXJlYSA9IEZSQy5UZXh0YXJlYTtcbnZhciBSYWRpb0dyb3VwID0gRlJDLlJhZGlvR3JvdXA7XG5cbnZhciBQbGF5Z3JvdW5kID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxheW91dDogJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgdmFsaWRhdGVQcmlzdGluZTogZmFsc2UsXG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgcmVzZXRGb3JtOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVmcy5mb3JtLnJlc2V0KCk7XG4gICAgfSxcblxuICAgIGNoYW5nZUxheW91dDogZnVuY3Rpb24obGF5b3V0KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2xheW91dDogbGF5b3V0fSk7XG4gICAgfSxcblxuICAgIGNoYW5nZVNlbGVjdFByb3A6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICB0aGlzLmNoYW5nZVByb3AodGFyZ2V0Lm5hbWUsIHRhcmdldC5jaGVja2VkKTtcbiAgICB9LFxuXG4gICAgY2hhbmdlUHJvcDogZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIG5ld1N0YXRlID0ge307XG4gICAgICAgIG5ld1N0YXRlW25hbWVdID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciByYWRpb09wdGlvbnMgPSBbXG4gICAgICAgICAgICB7dmFsdWU6ICdhJywgbGFiZWw6ICdPcHRpb24gQSd9LFxuICAgICAgICAgICAge3ZhbHVlOiAnYicsIGxhYmVsOiAnT3B0aW9uIEInfSxcbiAgICAgICAgICAgIHt2YWx1ZTogJ2MnLCBsYWJlbDogJ09wdGlvbiBDJ31cbiAgICAgICAgXTtcblxuICAgICAgICB2YXIgcmFkaW9PcHRpb25zRGlzYWJsZWQgPSBbXG4gICAgICAgICAgICB7dmFsdWU6ICdhJywgbGFiZWw6ICdPcHRpb24gQSd9LFxuICAgICAgICAgICAge3ZhbHVlOiAnYicsIGxhYmVsOiAnT3B0aW9uIEInLCBkaXNhYmxlZDogdHJ1ZX0sXG4gICAgICAgICAgICB7dmFsdWU6ICdjJywgbGFiZWw6ICdPcHRpb24gQyd9XG4gICAgICAgIF07XG5cbiAgICAgICAgdmFyIHNlbGVjdE9wdGlvbnMgPSByYWRpb09wdGlvbnMuc2xpY2UoMCk7XG4gICAgICAgIHNlbGVjdE9wdGlvbnMudW5zaGlmdCh7dmFsdWU6ICcnLCBsYWJlbDogJ1BsZWFzZSBzZWxlY3TigKYnfSk7XG5cbiAgICAgICAgdmFyIGZvcm1DbGFzc05hbWUgPSAnJztcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUubGF5b3V0ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGZvcm1DbGFzc05hbWUgPSAnZm9ybS1ob3Jpem9udGFsJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnZS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgxPkZvcm0gUGxheWdyb3VuZDwvaDE+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGgzPk9wdGlvbnPigKY8L2gzPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybXN5LkZvcm0gY2xhc3NOYW1lPVwiZm9ybS1ob3Jpem9udGFsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJsYXlvdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJpbmxpbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwibGF5b3V0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5sYXlvdXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWU6ICdob3Jpem9udGFsJywgbGFiZWw6IDxjb2RlPmhvcml6b250YWw8L2NvZGU+fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ZhbHVlOiAndmVydGljYWwnLCBsYWJlbDogPGNvZGU+dmVydGljYWw8L2NvZGU+fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ZhbHVlOiAnZWxlbWVudE9ubHknLCBsYWJlbDogPGNvZGU+ZWxlbWVudE9ubHk8L2NvZGU+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlUHJvcH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Um93IGxheW91dD1cImhvcml6b250YWxcIiBsYWJlbD1cInZhbGlkYXRlUHJpc3RpbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdENoZWNrZWQ9e3RoaXMuc3RhdGUudmFsaWRhdGVQcmlzdGluZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwidmFsaWRhdGVQcmlzdGluZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlU2VsZWN0UHJvcH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+IFllc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Um93IGxheW91dD1cImhvcml6b250YWxcIiBsYWJlbD1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRDaGVja2VkPXt0aGlzLnN0YXRlLmRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlU2VsZWN0UHJvcH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+IFllc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgICAgICAgICAgIDwvRm9ybXN5LkZvcm0+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8aDI+TGF5b3V0OiA8Y29kZT57dGhpcy5zdGF0ZS5sYXlvdXR9PC9jb2RlPjwvaDI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPEZvcm1zeS5Gb3JtIGNsYXNzTmFtZT17Zm9ybUNsYXNzTmFtZX0gcmVmPVwiZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGVnZW5kPklucHV0IHR5cGVzPC9sZWdlbmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwidGV4dDFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ9e3RoaXMuc3RhdGUubGF5b3V0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlUHJpc3RpbmU9e3RoaXMuc3RhdGUudmFsaWRhdGVQcmlzdGluZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkhlcmUgaXMgYSB0ZXh0IGlucHV0LlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscD1cIlRoaXMgaXMgYSByZXF1aXJlZCB0ZXh0IGlucHV0LlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZGF0ZTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkRhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ9e3RoaXMuc3RhdGUubGF5b3V0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlUHJpc3RpbmU9e3RoaXMuc3RhdGUudmFsaWRhdGVQcmlzdGluZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlRoaXMgaXMgYSBkYXRlIGlucHV0LlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZW1haWwxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJFbWFpbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ9e3RoaXMuc3RhdGUubGF5b3V0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlUHJpc3RpbmU9e3RoaXMuc3RhdGUudmFsaWRhdGVQcmlzdGluZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlRoaXMgaXMgYW4gZW1haWwgaW5wdXQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmQxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJQYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ9e3RoaXMuc3RhdGUubGF5b3V0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlUHJpc3RpbmU9e3RoaXMuc3RhdGUudmFsaWRhdGVQcmlzdGluZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9ucz1cIm1pbkxlbmd0aDo4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3I9XCJZb3VyIHBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzIGxvbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkNob29zZSBhIHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmQyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJDb25maXJtIHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dD17dGhpcy5zdGF0ZS5sYXlvdXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVQcmlzdGluZT17dGhpcy5zdGF0ZS52YWxpZGF0ZVByaXN0aW5lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnN0YXRlLmRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25zPVwiZXF1YWxzRmllbGQ6cGFzc3dvcmQxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVxdWFsc0ZpZWxkOiAnUGFzc3dvcmRzIG11c3QgbWF0Y2guJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJSZXR5cGUgcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZD5UZXh0YXJlYTwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz17M31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXs0MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwidHh0QXJlYTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiVGV4dGFyZWFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dD17dGhpcy5zdGF0ZS5sYXlvdXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVQcmlzdGluZT17dGhpcy5zdGF0ZS52YWxpZGF0ZVByaXN0aW5lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnN0YXRlLmRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVGhpcyBmaWVsZCByZXF1aXJlcyAxMCBjaGFyYWN0ZXJzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscD1cIlRoaXMgaXMgc29tZSBoZWxwIHRleHQgZm9yIHRoZSB0ZXh0YXJlYS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25zPVwibWluTGVuZ3RoOjEwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkxlbmd0aDogJ1BsZWFzZSBwcm92aWRlIGF0IGxlYXN0IDEwIGNoYXJhY3RlcnMuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGVnZW5kPlNlbGVjdDwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJzZWxlY3QxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlNlbGVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0PXt0aGlzLnN0YXRlLmxheW91dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVByaXN0aW5lPXt0aGlzLnN0YXRlLnZhbGlkYXRlUHJpc3RpbmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscD1cIlRoaXMgaXMgYSByZXF1aXJlZCBzZWxlY3QgZWxlbWVudC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsZWdlbmQ+UmFkaW8gZ3JvdXA8L2xlZ2VuZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxSYWRpb0dyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInJhZGlvR3JwMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCJiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlJhZGlvIGdyb3VwIChzdGFja2VkKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0PXt0aGlzLnN0YXRlLmxheW91dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVByaXN0aW5lPXt0aGlzLnN0YXRlLnZhbGlkYXRlUHJpc3RpbmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscD1cIkhlcmUsIOKAnE9wdGlvbiBC4oCdIGlzIGluaXRpYWxseSBzZWxlY3RlZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3JhZGlvT3B0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJyYWRpb0dycDJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJpbmxpbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiUmFkaW8gZ3JvdXAgKGlubGluZSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dD17dGhpcy5zdGF0ZS5sYXlvdXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVQcmlzdGluZT17dGhpcy5zdGF0ZS52YWxpZGF0ZVByaXN0aW5lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnN0YXRlLmRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHA9XCJUaGlzIGlzIGEgcmVxdWlyZWQgcmFkaW8gZ3JvdXAuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtyYWRpb09wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJyYWRpb0dycDNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJpbmxpbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiUmFkaW8gZ3JvdXAgKGRpc2FibGVkKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0PXt0aGlzLnN0YXRlLmxheW91dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVByaXN0aW5lPXt0aGlzLnN0YXRlLnZhbGlkYXRlUHJpc3RpbmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscD1cIkhlcmUsIOKAnE9wdGlvbiBC4oCdIGlzIGRpc2FibGVkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17cmFkaW9PcHRpb25zRGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICA8Um93IGxheW91dD17dGhpcy5zdGF0ZS5sYXlvdXR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMucmVzZXRGb3JtfSB0eXBlPVwicmVzZXRcIiBkZWZhdWx0VmFsdWU9XCJSZXNldFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICB7JyAnfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBkZWZhdWx0VmFsdWU9XCJTdWJtaXRcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1Jvdz5cbiAgICAgICAgICAgICAgICA8L0Zvcm1zeS5Gb3JtPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cblJlYWN0LnJlbmRlcihcbiAgICA8UGxheWdyb3VuZCAvPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWdyb3VuZCcpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgSWNvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJJY29uXCIsXG5cbiAgICByZXF1aXJlZFByb3BzOiB7XG4gICAgICAgIHN5bWJvbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuXG4gICAgZGVmYXVsdFByb3BzOiB7XG4gICAgICAgIGNsYXNzTmFtZTogJydcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdnbHlwaGljb24gZ2x5cGhpY29uLScgKyB0aGlzLnByb3BzLnN5bWJvbCArICcgJyArIHRoaXMucHJvcHMuY2xhc3NOYW1lO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogY2xhc3NOYW1lLCBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwifSlcbiAgICAgICAgKTtcbiAgICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEljb247XG4iLCIvKmpzaGludCBub2RlOnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEZvcm1zeSA9IHJlcXVpcmUoJ2Zvcm1zeS1yZWFjdCcpO1xudmFyIEZSQ01peGluID0gcmVxdWlyZSgnLi9taXhpbicpO1xudmFyIFJvdyA9IHJlcXVpcmUoJy4vcm93Jyk7XG52YXIgSWNvbiA9IHJlcXVpcmUoJy4vaWNvbi5qcycpO1xuXG52YXIgSW5wdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiSW5wdXRcIixcblxuICAgIG1peGluczogW0Zvcm1zeS5NaXhpbiwgRlJDTWl4aW5dLFxuXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3RleHQnLCAnZGF0ZScsICdlbWFpbCcsICdwYXNzd29yZCcsICdoaWRkZW4nXSlcbiAgICB9LFxuXG4gICAgY2hhbmdlVmFsdWU6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSk7XG4gICAgfSxcblxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgd2FybmluZ0ljb24gPSAnJztcblxuICAgICAgICBpZiAodGhpcy5zaG93RXJyb3JzKCkpIHtcbiAgICAgICAgICAgIHdhcm5pbmdJY29uID0gKFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbiwge3N5bWJvbDogXCJyZW1vdmVcIiwgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbC1mZWVkYmFja1wifSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYXlvdXQgPT09ICdlbGVtZW50T25seScgfHwgdGhpcy5wcm9wcy50eXBlID09PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRWxlbWVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm93LCB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMucHJvcHMubGFiZWwsIFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0aGlzLmlzUmVxdWlyZWQoKSwgXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzOiB0aGlzLnNob3dFcnJvcnMoKSwgXG4gICAgICAgICAgICAgICAgbGF5b3V0OiB0aGlzLnByb3BzLmxheW91dFxuICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJFbGVtZW50KCksIFxuICAgICAgICAgICAgICAgIHdhcm5pbmdJY29uLCBcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckhlbHAoKSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJFcnJvck1lc3NhZ2UoKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICByZW5kZXJFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCBSZWFjdC5fX3NwcmVhZCh7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbFwifSwgXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcywgXG4gICAgICAgICAgICAgICAge2xhYmVsOiBudWxsLCBcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5nZXRWYWx1ZSgpLCBcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5jaGFuZ2VWYWx1ZSwgXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaXNGb3JtRGlzYWJsZWQoKSB8fCB0aGlzLnByb3BzLmRpc2FibGVkfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBJbnB1dDogcmVxdWlyZSgnLi9pbnB1dCcpLFxuICAgIFRleHRhcmVhOiByZXF1aXJlKCcuL3RleHRhcmVhJyksXG4gICAgU2VsZWN0OiByZXF1aXJlKCcuL3NlbGVjdCcpLFxuICAgIFJhZGlvR3JvdXA6IHJlcXVpcmUoJy4vcmFkaW8tZ3JvdXAnKSxcbiAgICBSb3c6IHJlcXVpcmUoJy4vcm93JyksXG4gICAgSWNvbjogcmVxdWlyZSgnLi9pY29uJylcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgICB2YWxpZGF0ZVByaXN0aW5lOiBmYWxzZSxcbiAgICAgICAgICAgIGxheW91dDogJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgICAgICBvbkZvY3VzOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICAgICAgb25CbHVyOiBmdW5jdGlvbigpIHt9XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIHJlbmRlckhlbHA6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaGVscCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcImhlbHAtYmxvY2tcIn0sIHRoaXMucHJvcHMuaGVscClcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyRXJyb3JNZXNzYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNob3dFcnJvcnMoKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSB0aGlzLmdldEVycm9yTWVzc2FnZSgpO1xuICAgICAgICBpZiAoIWVycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcImhlbHAtYmxvY2tcIn0sIGVycm9yTWVzc2FnZSlcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgc2hvd0Vycm9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUHJpc3RpbmUoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudmFsaWRhdGVQcmlzdGluZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLmlzVmFsaWQoKSA9PT0gZmFsc2UpO1xuICAgIH1cbn07XG4iLCIvKmpzaGludCBub2RlOnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEZvcm1zeSA9IHJlcXVpcmUoJ2Zvcm1zeS1yZWFjdCcpO1xudmFyIEZSQ01peGluID0gcmVxdWlyZSgnLi9taXhpbicpO1xudmFyIFJvdyA9IHJlcXVpcmUoJy4vcm93Jyk7XG5cbnZhciBSYWRpb0dyb3VwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlJhZGlvR3JvdXBcIixcblxuICAgIG1peGluczogW0Zvcm1zeS5NaXhpbiwgRlJDTWl4aW5dLFxuXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnaW5saW5lJywgJ3N0YWNrZWQnXSksXG4gICAgICAgIG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG4gICAgfSxcblxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RhY2tlZCcsXG4gICAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgICAgICBoZWxwOiBudWxsXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGNoYW5nZVJhZGlvOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLm5hbWUsIHZhbHVlKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyRWxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBjb250cm9scyA9IHRoaXMucHJvcHMub3B0aW9ucy5tYXAoZnVuY3Rpb24ocmFkaW8sIGtleSkge1xuICAgICAgICAgICAgdmFyIGNoZWNrZWQgPSAoX3RoaXMuZ2V0VmFsdWUoKSA9PT0gcmFkaW8udmFsdWUpO1xuICAgICAgICAgICAgdmFyIGRpc2FibGVkID0gX3RoaXMuaXNGb3JtRGlzYWJsZWQoKSB8fCByYWRpby5kaXNhYmxlZCB8fCBfdGhpcy5wcm9wcy5kaXNhYmxlZDtcbiAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSAncmFkaW8nICsgKGRpc2FibGVkID8gJyBkaXNhYmxlZCcgOiAnJyk7XG4gICAgICAgICAgICBpZiAoX3RoaXMucHJvcHMudHlwZSA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge2NsYXNzTmFtZTogXCJyYWRpby1pbmxpbmVcIiwga2V5OiBrZXl9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogY2hlY2tlZCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyYWRpb1wiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmFkaW8udmFsdWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBfdGhpcy5jaGFuZ2VSYWRpbywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXCIgXCIsIHJhZGlvLmxhYmVsXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IGNsYXNzTmFtZSwga2V5OiBrZXl9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBjaGVja2VkLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJhZGlvXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByYWRpby52YWx1ZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IF90aGlzLmNoYW5nZVJhZGlvLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcIiBcIiwgcmFkaW8ubGFiZWxcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29udHJvbHM7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGF5b3V0ID09PSAnZWxlbWVudE9ubHknKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgdGhpcy5yZW5kZXJFbGVtZW50KCkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm93LCB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMucHJvcHMubGFiZWwsIFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0aGlzLmlzUmVxdWlyZWQoKSwgXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzOiB0aGlzLnNob3dFcnJvcnMoKSwgXG4gICAgICAgICAgICAgICAgbGF5b3V0OiB0aGlzLnByb3BzLmxheW91dCwgXG4gICAgICAgICAgICAgICAgZmFrZUxhYmVsOiB0cnVlXG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckVsZW1lbnQoKSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJIZWxwKCksIFxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyRXJyb3JNZXNzYWdlKClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSYWRpb0dyb3VwO1xuIiwiLypqc2hpbnQgbm9kZTp0cnVlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJSb3dcIixcblxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBoYXNFcnJvcnM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBmYWtlTGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBsYXlvdXQ6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ2hvcml6b250YWwnLCAndmVydGljYWwnLCAnZWxlbWVudE9ubHknXSksXG4gICAgICAgIGh0bWxGb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIGhhc0Vycm9yczogZmFsc2UsXG4gICAgICAgICAgICBmYWtlTGFiZWw6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIHJlbmRlckxhYmVsOiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYXlvdXQgPT09ICdlbGVtZW50T25seScpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsYWJlbFdyYXBwZXIgPSBbXTtcbiAgICAgICAgbGFiZWxXcmFwcGVyLnB1c2goJ2NvbnRyb2wtbGFiZWwnKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYXlvdXQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgbGFiZWxXcmFwcGVyLnB1c2goJ2NvbC1zbS0zJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5mYWtlTGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBsYWJlbFdyYXBwZXIuam9pbignICcpfSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdHJvbmdcIiwgbnVsbCwgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmxhYmVsLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucmVxdWlyZWQgPyAnIConIDogbnVsbFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtjbGFzc05hbWU6IGxhYmVsV3JhcHBlci5qb2luKCcgJyksIGh0bWxGb3I6IHRoaXMucHJvcHMuaHRtbEZvcn0sIFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMubGFiZWwsIFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucmVxdWlyZWQgPyAnIConIDogbnVsbFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxheW91dCA9PT0gJ2VsZW1lbnRPbmx5Jykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjbGFzc05hbWVzID0ge1xuICAgICAgICAgICAgZm9ybUdyb3VwOiBbJ2Zvcm0tZ3JvdXAnXSxcbiAgICAgICAgICAgIGVsZW1lbnRXcmFwcGVyOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxheW91dCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBjbGFzc05hbWVzLmVsZW1lbnRXcmFwcGVyLnB1c2goJ2NvbC1zbS05Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5oYXNFcnJvcnMpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXMuZm9ybUdyb3VwLnB1c2goJ2hhcy1lcnJvcicpO1xuICAgICAgICAgICAgY2xhc3NOYW1lcy5mb3JtR3JvdXAucHVzaCgnaGFzLXdhcm5pbmcnKTtcbiAgICAgICAgICAgIGNsYXNzTmFtZXMuZm9ybUdyb3VwLnB1c2goJ2hhcy1mZWVkYmFjaycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYXlvdXQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgZWxlbWVudCA9IChcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IGNsYXNzTmFtZXMuZWxlbWVudFdyYXBwZXIuam9pbignICcpfSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogY2xhc3NOYW1lcy5mb3JtR3JvdXAuam9pbignICcpfSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJMYWJlbCgpLCBcbiAgICAgICAgICAgICAgICBlbGVtZW50XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSb3c7XG4iLCIvKmpzaGludCBub2RlOnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEZvcm1zeSA9IHJlcXVpcmUoJ2Zvcm1zeS1yZWFjdCcpO1xudmFyIEZSQ01peGluID0gcmVxdWlyZSgnLi9taXhpbicpO1xudmFyIFJvdyA9IHJlcXVpcmUoJy4vcm93Jyk7XG5cbnZhciBTZWxlY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiU2VsZWN0XCIsXG5cbiAgICBtaXhpbnM6IFtGb3Jtc3kuTWl4aW4sIEZSQ01peGluXSxcblxuICAgIGNoYW5nZVZhbHVlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB0aGlzLnNldFZhbHVlKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxheW91dCA9PT0gJ2VsZW1lbnRPbmx5Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRWxlbWVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm93LCB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMucHJvcHMubGFiZWwsIFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0aGlzLmlzUmVxdWlyZWQoKSwgXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzOiB0aGlzLnNob3dFcnJvcnMoKSwgXG4gICAgICAgICAgICAgICAgbGF5b3V0OiB0aGlzLnByb3BzLmxheW91dFxuICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJFbGVtZW50KCksIFxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySGVscCgpLCBcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckVycm9yTWVzc2FnZSgpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIHJlbmRlckVsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9uTm9kZXMgPSB0aGlzLnByb3BzLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7a2V5OiBpdGVtLnZhbHVlLCB2YWx1ZTogaXRlbS52YWx1ZX0sIGl0ZW0ubGFiZWwpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwgUmVhY3QuX19zcHJlYWQoe1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2xcIn0sIFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMsIFxuICAgICAgICAgICAgICAgIHt2YWx1ZTogdGhpcy5nZXRWYWx1ZSgpLCBcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5jaGFuZ2VWYWx1ZSwgXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaXNGb3JtRGlzYWJsZWQoKSB8fCB0aGlzLnByb3BzLmRpc2FibGVkXG4gICAgICAgICAgICB9KSwgXG4gICAgICAgICAgICAgICAgb3B0aW9uTm9kZXNcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3Q7XG4iLCIvKmpzaGludCBub2RlOnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEZvcm1zeSA9IHJlcXVpcmUoJ2Zvcm1zeS1yZWFjdCcpO1xudmFyIFJvdyA9IHJlcXVpcmUoJy4vcm93Jyk7XG52YXIgRlJDTWl4aW4gPSByZXF1aXJlKCcuL21peGluJyk7XG5cbnZhciBUZXh0YXJlYSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJUZXh0YXJlYVwiLFxuXG4gICAgbWl4aW5zOiBbRm9ybXN5Lk1peGluLCBGUkNNaXhpbl0sXG5cbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgcm93czogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgY29sczogUmVhY3QuUHJvcFR5cGVzLm51bWJlclxuICAgIH0sXG5cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93czogMyxcbiAgICAgICAgICAgIGNvbHM6IDAgLy8gUmVhY3QgZG9lc24ndCByZW5kZXIgdGhlIGNvbHMgYXR0cmlidXRlIGlmIGl0IGlzIHplcm9cbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY2hhbmdlVmFsdWU6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMubmFtZSwgdmFsdWUpO1xuICAgIH0sXG5cbiAgICByZW5kZXJFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCBSZWFjdC5fX3NwcmVhZCh7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbFwifSwgXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcywgXG4gICAgICAgICAgICAgICAge3ZhbHVlOiB0aGlzLmdldFZhbHVlKCksIFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmNoYW5nZVZhbHVlLCBcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5pc0Zvcm1EaXNhYmxlZCgpIHx8IHRoaXMucHJvcHMuZGlzYWJsZWRcbiAgICAgICAgICAgIH0pKVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxheW91dCA9PT0gJ2VsZW1lbnRPbmx5Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRWxlbWVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm93LCB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMucHJvcHMubGFiZWwsIFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0aGlzLmlzUmVxdWlyZWQoKSwgXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzOiB0aGlzLnNob3dFcnJvcnMoKSwgXG4gICAgICAgICAgICAgICAgbGF5b3V0OiB0aGlzLnByb3BzLmxheW91dCwgXG4gICAgICAgICAgICAgICAgaHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lXG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckVsZW1lbnQoKSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJIZWxwKCksIFxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyRXJyb3JNZXNzYWdlKClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0YXJlYTtcbiJdfQ==
