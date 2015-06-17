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

},{"codemirror":"codemirror","codemirror/mode/xml/xml":"codemirror/mode/xml/xml","formsy-react":"formsy-react","formsy-react-components":"formsy-react-components","js-beautify":"js-beautify","react":"react","react-tools":"react-tools"}]},{},[1]);
