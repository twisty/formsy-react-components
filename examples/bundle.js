(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');

var Example = require('./example');

var Docs = React.createClass({displayName: "Docs",

    render: function() {

        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "page-header"}, 
                    React.createElement("h1", null, "Examples")
                ), 
                React.createElement(Example, {
                    title: "Text input", 
                    code: `
<Formsy.Form>
    <Input
        name="example"
        label="Text input"
    />
</Formsy.Form>
`}
                ), 
                React.createElement(Example, {
                    title: "Textarea", 
                    code: `
<Formsy.Form>
    <Textarea name="example" />
</Formsy.Form>
`}
                )
            )
        );
    }
});

React.render(
    React.createElement(Docs, null),
    document.getElementById('docs')
);


},{"./example":2,"react":"react"}],2:[function(require,module,exports){
'use strict';

var React = React || require('react');
var beautify = require('js-beautify');
var transform = require('react-tools').transform;
var codemirror = require('codemirror');
require('codemirror/mode/xml/xml');

/* eslint-disable no-unused-vars */
var Formsy = require('formsy-react');
var FRC = require('formsy-react-components');
var Textarea = FRC.Textarea;
var Input = FRC.Input;
/* eslint-enable no-unused-vars */

var Example = React.createClass({displayName: "Example",

    markup: 'FOO',

    getDefaultProps: function() {
        return {
            title: 'Example',
            code: '<div>Example</div>'
        };
    },

    getInitialState: function() {
        return {
            reactElement: React.createElement("div", null),
            markup: '<div></div>',
            error: null
        };
    },

    componentDidMount: function() {
        this.editor = codemirror(React.findDOMNode(this.refs.editor), {
            value: this.props.code.trim(),
            viewportMargin: Infinity,
            mode: 'xml',
            lineNumbers: true,
            lineWrapping: true,
            smartIndent: false,
            matchBrackets: true
        });
    },

    componentWillMount: function() {
        this.refreshMarkup(this.props.code);
    },

    refreshMarkupClick: function() {
        var code = this.editor.getValue();
        this.refreshMarkup(code);
    },

    // renderToStaticMarkup here.
    // https://github.com/facebook/react/issues/3344#issuecomment-77972846
    refreshMarkup: function(jsxString) {
        /*
        var result = function(str) {
          return eval(str);
        }.call(this, compiledCode);
        */
        try {
            var jsString = transform(jsxString);
            var reactElement = eval(jsString); // eslint-disable-line no-eval
            var markup = React.renderToStaticMarkup(reactElement);
            this.setState({
                reactElement: reactElement,
                markup: markup,
                error: null
            });
        }
        catch (e) {
            this.setState({
                error: e.message
            });
        }
    },

    renderError: function() {
        if (!this.state.error) {
            return '';
        }
        return (
            React.createElement("div", {className: "text-danger"}, 
                this.state.error
            )
        );
    },

    render: function() {
        return (
            React.createElement("div", {className: "example"}, 
                React.createElement("h3", null, this.props.title), 
                React.createElement("h4", null, "JSX"), 
                React.createElement("div", {ref: "editor", defaultValue: this.props.code.trim()}), 
                /*this.renderError()*/
                React.createElement("h4", null, "Markup"), 
                React.createElement("pre", null, 
                    beautify.html(this.state.markup)
                ), 
                this.state.reactElement, 
                React.createElement("button", {
                    className: "btn btn-default btn-xs", 
                    onClick: this.refreshMarkupClick
                }, "Refresh markup")
            )
        );
    }
});

module.exports = Example;


},{"codemirror":"codemirror","codemirror/mode/xml/xml":"codemirror/mode/xml/xml","formsy-react":"formsy-react","formsy-react-components":6,"js-beautify":"js-beautify","react":"react","react-tools":"react-tools"}],3:[function(require,module,exports){
/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRCMixin = require('./mixin');
var Row = require('./row');

var CheckboxGroup = React.createClass({displayName: "CheckboxGroup",

    mixins: [Formsy.Mixin, FRCMixin],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired
    },

    getDefaultProps: function() {
        return {
            label: '',
            help: null
        };
    },

    changeCheckbox: function() {
        var value = [];
        this.props.options.forEach(function(option, key) {
            if (this.refs[key].getDOMNode().checked) {
                value.push(option.value);
            }

        }.bind(this));
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function() {
        var _this = this;
        var controls = this.props.options.map(function(checkbox, key) {
            var checked = (_this.getValue().indexOf(checkbox.value) !== -1);
            var disabled = _this.isFormDisabled() || checkbox.disabled || _this.props.disabled;
            return (
                React.createElement("div", {className: "checkbox", key: key}, 
                    React.createElement("label", null, 
                        React.createElement("input", {
                            ref: key, 
                            checked: checked, 
                            type: "checkbox", 
                            value: checkbox.value, 
                            onChange: _this.changeCheckbox, 
                            disabled: disabled}
                        ), " ", checkbox.label
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

module.exports = CheckboxGroup;

},{"./mixin":7,"./row":9,"formsy-react":"formsy-react","react":"react"}],4:[function(require,module,exports){
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

},{"react":"react"}],5:[function(require,module,exports){
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

},{"./icon.js":4,"./mixin":7,"./row":9,"formsy-react":"formsy-react","react":"react"}],6:[function(require,module,exports){
'use strict';

module.exports = {
    Input: require('./input'),
    Textarea: require('./textarea'),
    Select: require('./select'),
    CheckboxGroup: require('./checkbox-group'),
    RadioGroup: require('./radio-group'),
    Row: require('./row'),
    Icon: require('./icon')
};

},{"./checkbox-group":3,"./icon":4,"./input":5,"./radio-group":8,"./row":9,"./select":10,"./textarea":11}],7:[function(require,module,exports){
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

},{"react":"react"}],8:[function(require,module,exports){
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

},{"./mixin":7,"./row":9,"formsy-react":"formsy-react","react":"react"}],9:[function(require,module,exports){
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

},{"react":"react"}],10:[function(require,module,exports){
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

},{"./mixin":7,"./row":9,"formsy-react":"formsy-react","react":"react"}],11:[function(require,module,exports){
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

},{"./mixin":7,"./row":9,"formsy-react":"formsy-react","react":"react"}]},{},[1]);
