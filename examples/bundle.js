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
            markup: 'NONE',
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
    refreshMarkup: function(code) {
        /*
        var result = function(str) {
          return eval(str);
        }.call(this, compiledCode);
        */
        try {
            var compiledCode = transform(code);
            var result = eval(compiledCode); // eslint-disable-line no-eval
            var markup = React.renderToStaticMarkup(result);
            this.setState({
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
                React.createElement("button", {
                    className: "btn btn-default btn-xs", 
                    onClick: this.refreshMarkupClick
                }, "Refresh markup")
            )
        );
    }
});

module.exports = Example;


},{"codemirror":"codemirror","codemirror/mode/xml/xml":"codemirror/mode/xml/xml","formsy-react":"formsy-react","formsy-react-components":5,"js-beautify":"js-beautify","react":"react","react-tools":"react-tools"}],3:[function(require,module,exports){
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

},{"react":"react"}],4:[function(require,module,exports){
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

},{"./icon.js":3,"./mixin":6,"./row":8,"formsy-react":"formsy-react","react":"react"}],5:[function(require,module,exports){
'use strict';

module.exports = {
    Input: require('./input'),
    Textarea: require('./textarea'),
    Select: require('./select'),
    RadioGroup: require('./radio-group'),
    Row: require('./row'),
    Icon: require('./icon')
};

},{"./icon":3,"./input":4,"./radio-group":7,"./row":8,"./select":9,"./textarea":10}],6:[function(require,module,exports){
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

},{"react":"react"}],7:[function(require,module,exports){
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

},{"./mixin":6,"./row":8,"formsy-react":"formsy-react","react":"react"}],8:[function(require,module,exports){
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

},{"react":"react"}],9:[function(require,module,exports){
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

},{"./mixin":6,"./row":8,"formsy-react":"formsy-react","react":"react"}],10:[function(require,module,exports){
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

},{"./mixin":6,"./row":8,"formsy-react":"formsy-react","react":"react"}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS90aW0vc291cmNlL2Zvcm1zeS1yZWFjdC1jb21wb25lbnRzLXBhZ2VzL2V4YW1wbGVzL2FwcC5qcyIsIi9ob21lL3RpbS9zb3VyY2UvZm9ybXN5LXJlYWN0LWNvbXBvbmVudHMtcGFnZXMvZXhhbXBsZXMvZXhhbXBsZS5qcyIsIm5vZGVfbW9kdWxlcy9mb3Jtc3ktcmVhY3QtY29tcG9uZW50cy9yZWxlYXNlL2ljb24uanMiLCJub2RlX21vZHVsZXMvZm9ybXN5LXJlYWN0LWNvbXBvbmVudHMvcmVsZWFzZS9pbnB1dC5qcyIsIm5vZGVfbW9kdWxlcy9mb3Jtc3ktcmVhY3QtY29tcG9uZW50cy9yZWxlYXNlL21haW4uanMiLCJub2RlX21vZHVsZXMvZm9ybXN5LXJlYWN0LWNvbXBvbmVudHMvcmVsZWFzZS9taXhpbi5qcyIsIm5vZGVfbW9kdWxlcy9mb3Jtc3ktcmVhY3QtY29tcG9uZW50cy9yZWxlYXNlL3JhZGlvLWdyb3VwLmpzIiwibm9kZV9tb2R1bGVzL2Zvcm1zeS1yZWFjdC1jb21wb25lbnRzL3JlbGVhc2Uvcm93LmpzIiwibm9kZV9tb2R1bGVzL2Zvcm1zeS1yZWFjdC1jb21wb25lbnRzL3JlbGVhc2Uvc2VsZWN0LmpzIiwibm9kZV9tb2R1bGVzL2Zvcm1zeS1yZWFjdC1jb21wb25lbnRzL3JlbGVhc2UvdGV4dGFyZWEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUU3QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRW5DLElBQUksMEJBQTBCLG9CQUFBOztBQUU5QixJQUFJLE1BQU0sRUFBRSxXQUFXOztRQUVmO1lBQ0ksb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIEV4YW1wbGUgPSByZXF1aXJlKCcuL2V4YW1wbGUnKTtcblxudmFyIERvY3MgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnZS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgxPkV4YW1wbGVzPC9oMT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8RXhhbXBsZVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlRleHQgaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICBjb2RlPXtgXG48Rm9ybXN5LkZvcm0+XG4gICAgPElucHV0XG4gICAgICAgIG5hbWU9XCJleGFtcGxlXCJcbiAgICAgICAgbGFiZWw9XCJUZXh0IGlucHV0XCJcbiAgICAvPlxuPC9Gb3Jtc3kuRm9ybT5cbmB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8RXhhbXBsZVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlRleHRhcmVhXCJcbiAgICAgICAgICAgICAgICAgICAgY29kZT17YFxuPEZvcm1zeS5Gb3JtPlxuICAgIDxUZXh0YXJlYSBuYW1lPVwiZXhhbXBsZVwiIC8+XG48L0Zvcm1zeS5Gb3JtPlxuYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cblJlYWN0LnJlbmRlcihcbiAgICA8RG9jcyAvPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG9jcycpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSBSZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGJlYXV0aWZ5ID0gcmVxdWlyZSgnanMtYmVhdXRpZnknKTtcbnZhciB0cmFuc2Zvcm0gPSByZXF1aXJlKCdyZWFjdC10b29scycpLnRyYW5zZm9ybTtcbnZhciBjb2RlbWlycm9yID0gcmVxdWlyZSgnY29kZW1pcnJvcicpO1xucmVxdWlyZSgnY29kZW1pcnJvci9tb2RlL3htbC94bWwnKTtcblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBGb3Jtc3kgPSByZXF1aXJlKCdmb3Jtc3ktcmVhY3QnKTtcbnZhciBGUkMgPSByZXF1aXJlKCdmb3Jtc3ktcmVhY3QtY29tcG9uZW50cycpO1xudmFyIFRleHRhcmVhID0gRlJDLlRleHRhcmVhO1xudmFyIElucHV0ID0gRlJDLklucHV0O1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG52YXIgRXhhbXBsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAgIG1hcmt1cDogJ0ZPTycsXG5cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGl0bGU6ICdFeGFtcGxlJyxcbiAgICAgICAgICAgIGNvZGU6ICc8ZGl2PkV4YW1wbGU8L2Rpdj4nXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYXJrdXA6ICdOT05FJyxcbiAgICAgICAgICAgIGVycm9yOiBudWxsXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBjb2RlbWlycm9yKFJlYWN0LmZpbmRET01Ob2RlKHRoaXMucmVmcy5lZGl0b3IpLCB7XG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy5jb2RlLnRyaW0oKSxcbiAgICAgICAgICAgIHZpZXdwb3J0TWFyZ2luOiBJbmZpbml0eSxcbiAgICAgICAgICAgIG1vZGU6ICd4bWwnLFxuICAgICAgICAgICAgbGluZU51bWJlcnM6IHRydWUsXG4gICAgICAgICAgICBsaW5lV3JhcHBpbmc6IHRydWUsXG4gICAgICAgICAgICBzbWFydEluZGVudDogZmFsc2UsXG4gICAgICAgICAgICBtYXRjaEJyYWNrZXRzOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlZnJlc2hNYXJrdXAodGhpcy5wcm9wcy5jb2RlKTtcbiAgICB9LFxuXG4gICAgcmVmcmVzaE1hcmt1cENsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNvZGUgPSB0aGlzLmVkaXRvci5nZXRWYWx1ZSgpO1xuICAgICAgICB0aGlzLnJlZnJlc2hNYXJrdXAoY29kZSk7XG4gICAgfSxcblxuICAgIC8vIHJlbmRlclRvU3RhdGljTWFya3VwIGhlcmUuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zMzQ0I2lzc3VlY29tbWVudC03Nzk3Mjg0NlxuICAgIHJlZnJlc2hNYXJrdXA6IGZ1bmN0aW9uKGNvZGUpIHtcbiAgICAgICAgLypcbiAgICAgICAgdmFyIHJlc3VsdCA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgIHJldHVybiBldmFsKHN0cik7XG4gICAgICAgIH0uY2FsbCh0aGlzLCBjb21waWxlZENvZGUpO1xuICAgICAgICAqL1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNvbXBpbGVkQ29kZSA9IHRyYW5zZm9ybShjb2RlKTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBldmFsKGNvbXBpbGVkQ29kZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXZhbFxuICAgICAgICAgICAgdmFyIG1hcmt1cCA9IFJlYWN0LnJlbmRlclRvU3RhdGljTWFya3VwKHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBtYXJrdXA6IG1hcmt1cCxcbiAgICAgICAgICAgICAgICBlcnJvcjogbnVsbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGVycm9yOiBlLm1lc3NhZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlckVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lcnJvcn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleGFtcGxlXCIgPlxuICAgICAgICAgICAgICAgIDxoMz57dGhpcy5wcm9wcy50aXRsZX08L2gzPlxuICAgICAgICAgICAgICAgIDxoND5KU1g8L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPVwiZWRpdG9yXCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmNvZGUudHJpbSgpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICB7Lyp0aGlzLnJlbmRlckVycm9yKCkqL31cbiAgICAgICAgICAgICAgICA8aDQ+TWFya3VwPC9oND5cbiAgICAgICAgICAgICAgICA8cHJlPlxuICAgICAgICAgICAgICAgICAgICB7YmVhdXRpZnkuaHRtbCh0aGlzLnN0YXRlLm1hcmt1cCl9XG4gICAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5yZWZyZXNoTWFya3VwQ2xpY2t9XG4gICAgICAgICAgICAgICAgPlJlZnJlc2ggbWFya3VwPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeGFtcGxlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgSWNvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJJY29uXCIsXG5cbiAgICByZXF1aXJlZFByb3BzOiB7XG4gICAgICAgIHN5bWJvbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuXG4gICAgZGVmYXVsdFByb3BzOiB7XG4gICAgICAgIGNsYXNzTmFtZTogJydcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdnbHlwaGljb24gZ2x5cGhpY29uLScgKyB0aGlzLnByb3BzLnN5bWJvbCArICcgJyArIHRoaXMucHJvcHMuY2xhc3NOYW1lO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogY2xhc3NOYW1lLCBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwifSlcbiAgICAgICAgKTtcbiAgICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEljb247XG4iLCIvKmpzaGludCBub2RlOnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEZvcm1zeSA9IHJlcXVpcmUoJ2Zvcm1zeS1yZWFjdCcpO1xudmFyIEZSQ01peGluID0gcmVxdWlyZSgnLi9taXhpbicpO1xudmFyIFJvdyA9IHJlcXVpcmUoJy4vcm93Jyk7XG52YXIgSWNvbiA9IHJlcXVpcmUoJy4vaWNvbi5qcycpO1xuXG52YXIgSW5wdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiSW5wdXRcIixcblxuICAgIG1peGluczogW0Zvcm1zeS5NaXhpbiwgRlJDTWl4aW5dLFxuXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3RleHQnLCAnZGF0ZScsICdlbWFpbCcsICdwYXNzd29yZCcsICdoaWRkZW4nXSlcbiAgICB9LFxuXG4gICAgY2hhbmdlVmFsdWU6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSk7XG4gICAgfSxcblxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgd2FybmluZ0ljb24gPSAnJztcblxuICAgICAgICBpZiAodGhpcy5zaG93RXJyb3JzKCkpIHtcbiAgICAgICAgICAgIHdhcm5pbmdJY29uID0gKFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbiwge3N5bWJvbDogXCJyZW1vdmVcIiwgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbC1mZWVkYmFja1wifSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYXlvdXQgPT09ICdlbGVtZW50T25seScgfHwgdGhpcy5wcm9wcy50eXBlID09PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRWxlbWVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm93LCB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMucHJvcHMubGFiZWwsIFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0aGlzLmlzUmVxdWlyZWQoKSwgXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzOiB0aGlzLnNob3dFcnJvcnMoKSwgXG4gICAgICAgICAgICAgICAgbGF5b3V0OiB0aGlzLnByb3BzLmxheW91dFxuICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJFbGVtZW50KCksIFxuICAgICAgICAgICAgICAgIHdhcm5pbmdJY29uLCBcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckhlbHAoKSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJFcnJvck1lc3NhZ2UoKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICByZW5kZXJFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCBSZWFjdC5fX3NwcmVhZCh7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbFwifSwgXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcywgXG4gICAgICAgICAgICAgICAge2xhYmVsOiBudWxsLCBcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5nZXRWYWx1ZSgpLCBcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5jaGFuZ2VWYWx1ZSwgXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaXNGb3JtRGlzYWJsZWQoKSB8fCB0aGlzLnByb3BzLmRpc2FibGVkfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBJbnB1dDogcmVxdWlyZSgnLi9pbnB1dCcpLFxuICAgIFRleHRhcmVhOiByZXF1aXJlKCcuL3RleHRhcmVhJyksXG4gICAgU2VsZWN0OiByZXF1aXJlKCcuL3NlbGVjdCcpLFxuICAgIFJhZGlvR3JvdXA6IHJlcXVpcmUoJy4vcmFkaW8tZ3JvdXAnKSxcbiAgICBSb3c6IHJlcXVpcmUoJy4vcm93JyksXG4gICAgSWNvbjogcmVxdWlyZSgnLi9pY29uJylcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgICB2YWxpZGF0ZVByaXN0aW5lOiBmYWxzZSxcbiAgICAgICAgICAgIGxheW91dDogJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgICAgICBvbkZvY3VzOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICAgICAgb25CbHVyOiBmdW5jdGlvbigpIHt9XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIHJlbmRlckhlbHA6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaGVscCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcImhlbHAtYmxvY2tcIn0sIHRoaXMucHJvcHMuaGVscClcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyRXJyb3JNZXNzYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNob3dFcnJvcnMoKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSB0aGlzLmdldEVycm9yTWVzc2FnZSgpO1xuICAgICAgICBpZiAoIWVycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcImhlbHAtYmxvY2tcIn0sIGVycm9yTWVzc2FnZSlcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgc2hvd0Vycm9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUHJpc3RpbmUoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudmFsaWRhdGVQcmlzdGluZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLmlzVmFsaWQoKSA9PT0gZmFsc2UpO1xuICAgIH1cbn07XG4iLCIvKmpzaGludCBub2RlOnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEZvcm1zeSA9IHJlcXVpcmUoJ2Zvcm1zeS1yZWFjdCcpO1xudmFyIEZSQ01peGluID0gcmVxdWlyZSgnLi9taXhpbicpO1xudmFyIFJvdyA9IHJlcXVpcmUoJy4vcm93Jyk7XG5cbnZhciBSYWRpb0dyb3VwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlJhZGlvR3JvdXBcIixcblxuICAgIG1peGluczogW0Zvcm1zeS5NaXhpbiwgRlJDTWl4aW5dLFxuXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgdHlwZTogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnaW5saW5lJywgJ3N0YWNrZWQnXSksXG4gICAgICAgIG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG4gICAgfSxcblxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RhY2tlZCcsXG4gICAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgICAgICBoZWxwOiBudWxsXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGNoYW5nZVJhZGlvOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLm5hbWUsIHZhbHVlKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyRWxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBjb250cm9scyA9IHRoaXMucHJvcHMub3B0aW9ucy5tYXAoZnVuY3Rpb24ocmFkaW8sIGtleSkge1xuICAgICAgICAgICAgdmFyIGNoZWNrZWQgPSAoX3RoaXMuZ2V0VmFsdWUoKSA9PT0gcmFkaW8udmFsdWUpO1xuICAgICAgICAgICAgdmFyIGRpc2FibGVkID0gX3RoaXMuaXNGb3JtRGlzYWJsZWQoKSB8fCByYWRpby5kaXNhYmxlZCB8fCBfdGhpcy5wcm9wcy5kaXNhYmxlZDtcbiAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSAncmFkaW8nICsgKGRpc2FibGVkID8gJyBkaXNhYmxlZCcgOiAnJyk7XG4gICAgICAgICAgICBpZiAoX3RoaXMucHJvcHMudHlwZSA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge2NsYXNzTmFtZTogXCJyYWRpby1pbmxpbmVcIiwga2V5OiBrZXl9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogY2hlY2tlZCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyYWRpb1wiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmFkaW8udmFsdWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBfdGhpcy5jaGFuZ2VSYWRpbywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXCIgXCIsIHJhZGlvLmxhYmVsXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IGNsYXNzTmFtZSwga2V5OiBrZXl9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBjaGVja2VkLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJhZGlvXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByYWRpby52YWx1ZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IF90aGlzLmNoYW5nZVJhZGlvLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcIiBcIiwgcmFkaW8ubGFiZWxcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29udHJvbHM7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGF5b3V0ID09PSAnZWxlbWVudE9ubHknKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgdGhpcy5yZW5kZXJFbGVtZW50KCkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm93LCB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMucHJvcHMubGFiZWwsIFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0aGlzLmlzUmVxdWlyZWQoKSwgXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzOiB0aGlzLnNob3dFcnJvcnMoKSwgXG4gICAgICAgICAgICAgICAgbGF5b3V0OiB0aGlzLnByb3BzLmxheW91dCwgXG4gICAgICAgICAgICAgICAgZmFrZUxhYmVsOiB0cnVlXG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckVsZW1lbnQoKSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJIZWxwKCksIFxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyRXJyb3JNZXNzYWdlKClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSYWRpb0dyb3VwO1xuIiwiLypqc2hpbnQgbm9kZTp0cnVlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJSb3dcIixcblxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBoYXNFcnJvcnM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBmYWtlTGFiZWw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBsYXlvdXQ6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ2hvcml6b250YWwnLCAndmVydGljYWwnLCAnZWxlbWVudE9ubHknXSksXG4gICAgICAgIGh0bWxGb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIGhhc0Vycm9yczogZmFsc2UsXG4gICAgICAgICAgICBmYWtlTGFiZWw6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIHJlbmRlckxhYmVsOiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYXlvdXQgPT09ICdlbGVtZW50T25seScpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsYWJlbFdyYXBwZXIgPSBbXTtcbiAgICAgICAgbGFiZWxXcmFwcGVyLnB1c2goJ2NvbnRyb2wtbGFiZWwnKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYXlvdXQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgbGFiZWxXcmFwcGVyLnB1c2goJ2NvbC1zbS0zJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5mYWtlTGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBsYWJlbFdyYXBwZXIuam9pbignICcpfSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdHJvbmdcIiwgbnVsbCwgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmxhYmVsLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucmVxdWlyZWQgPyAnIConIDogbnVsbFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtjbGFzc05hbWU6IGxhYmVsV3JhcHBlci5qb2luKCcgJyksIGh0bWxGb3I6IHRoaXMucHJvcHMuaHRtbEZvcn0sIFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMubGFiZWwsIFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucmVxdWlyZWQgPyAnIConIDogbnVsbFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxheW91dCA9PT0gJ2VsZW1lbnRPbmx5Jykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjbGFzc05hbWVzID0ge1xuICAgICAgICAgICAgZm9ybUdyb3VwOiBbJ2Zvcm0tZ3JvdXAnXSxcbiAgICAgICAgICAgIGVsZW1lbnRXcmFwcGVyOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxheW91dCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBjbGFzc05hbWVzLmVsZW1lbnRXcmFwcGVyLnB1c2goJ2NvbC1zbS05Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5oYXNFcnJvcnMpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXMuZm9ybUdyb3VwLnB1c2goJ2hhcy1lcnJvcicpO1xuICAgICAgICAgICAgY2xhc3NOYW1lcy5mb3JtR3JvdXAucHVzaCgnaGFzLXdhcm5pbmcnKTtcbiAgICAgICAgICAgIGNsYXNzTmFtZXMuZm9ybUdyb3VwLnB1c2goJ2hhcy1mZWVkYmFjaycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5sYXlvdXQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgZWxlbWVudCA9IChcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IGNsYXNzTmFtZXMuZWxlbWVudFdyYXBwZXIuam9pbignICcpfSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogY2xhc3NOYW1lcy5mb3JtR3JvdXAuam9pbignICcpfSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJMYWJlbCgpLCBcbiAgICAgICAgICAgICAgICBlbGVtZW50XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSb3c7XG4iLCIvKmpzaGludCBub2RlOnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEZvcm1zeSA9IHJlcXVpcmUoJ2Zvcm1zeS1yZWFjdCcpO1xudmFyIEZSQ01peGluID0gcmVxdWlyZSgnLi9taXhpbicpO1xudmFyIFJvdyA9IHJlcXVpcmUoJy4vcm93Jyk7XG5cbnZhciBTZWxlY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiU2VsZWN0XCIsXG5cbiAgICBtaXhpbnM6IFtGb3Jtc3kuTWl4aW4sIEZSQ01peGluXSxcblxuICAgIGNoYW5nZVZhbHVlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB0aGlzLnNldFZhbHVlKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxheW91dCA9PT0gJ2VsZW1lbnRPbmx5Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRWxlbWVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm93LCB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMucHJvcHMubGFiZWwsIFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0aGlzLmlzUmVxdWlyZWQoKSwgXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzOiB0aGlzLnNob3dFcnJvcnMoKSwgXG4gICAgICAgICAgICAgICAgbGF5b3V0OiB0aGlzLnByb3BzLmxheW91dFxuICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJFbGVtZW50KCksIFxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySGVscCgpLCBcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckVycm9yTWVzc2FnZSgpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIHJlbmRlckVsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9uTm9kZXMgPSB0aGlzLnByb3BzLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7a2V5OiBpdGVtLnZhbHVlLCB2YWx1ZTogaXRlbS52YWx1ZX0sIGl0ZW0ubGFiZWwpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwgUmVhY3QuX19zcHJlYWQoe1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2xcIn0sIFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMsIFxuICAgICAgICAgICAgICAgIHt2YWx1ZTogdGhpcy5nZXRWYWx1ZSgpLCBcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5jaGFuZ2VWYWx1ZSwgXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaXNGb3JtRGlzYWJsZWQoKSB8fCB0aGlzLnByb3BzLmRpc2FibGVkXG4gICAgICAgICAgICB9KSwgXG4gICAgICAgICAgICAgICAgb3B0aW9uTm9kZXNcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3Q7XG4iLCIvKmpzaGludCBub2RlOnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEZvcm1zeSA9IHJlcXVpcmUoJ2Zvcm1zeS1yZWFjdCcpO1xudmFyIFJvdyA9IHJlcXVpcmUoJy4vcm93Jyk7XG52YXIgRlJDTWl4aW4gPSByZXF1aXJlKCcuL21peGluJyk7XG5cbnZhciBUZXh0YXJlYSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJUZXh0YXJlYVwiLFxuXG4gICAgbWl4aW5zOiBbRm9ybXN5Lk1peGluLCBGUkNNaXhpbl0sXG5cbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgcm93czogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgY29sczogUmVhY3QuUHJvcFR5cGVzLm51bWJlclxuICAgIH0sXG5cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93czogMyxcbiAgICAgICAgICAgIGNvbHM6IDAgLy8gUmVhY3QgZG9lc24ndCByZW5kZXIgdGhlIGNvbHMgYXR0cmlidXRlIGlmIGl0IGlzIHplcm9cbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY2hhbmdlVmFsdWU6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMubmFtZSwgdmFsdWUpO1xuICAgIH0sXG5cbiAgICByZW5kZXJFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCBSZWFjdC5fX3NwcmVhZCh7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbFwifSwgXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcywgXG4gICAgICAgICAgICAgICAge3ZhbHVlOiB0aGlzLmdldFZhbHVlKCksIFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmNoYW5nZVZhbHVlLCBcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5pc0Zvcm1EaXNhYmxlZCgpIHx8IHRoaXMucHJvcHMuZGlzYWJsZWRcbiAgICAgICAgICAgIH0pKVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxheW91dCA9PT0gJ2VsZW1lbnRPbmx5Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRWxlbWVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm93LCB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMucHJvcHMubGFiZWwsIFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0aGlzLmlzUmVxdWlyZWQoKSwgXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzOiB0aGlzLnNob3dFcnJvcnMoKSwgXG4gICAgICAgICAgICAgICAgbGF5b3V0OiB0aGlzLnByb3BzLmxheW91dCwgXG4gICAgICAgICAgICAgICAgaHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lXG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckVsZW1lbnQoKSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJIZWxwKCksIFxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyRXJyb3JNZXNzYWdlKClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0YXJlYTtcbiJdfQ==
