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

var Example = React.createClass({

    markup: 'FOO',

    getDefaultProps: function() {
        return {
            title: 'Example',
            code: '<div>Example</div>'
        };
    },

    getInitialState: function() {
        return {
            reactElement: <div></div>,
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
            <div className="text-danger">
                {this.state.error}
            </div>
        );
    },

    render: function() {
        return (
            <div className="example" >
                <h3>{this.props.title}</h3>
                <h4>JSX</h4>
                <div ref="editor" defaultValue={this.props.code.trim()}></div>
                {/*this.renderError()*/}
                <h4>Markup</h4>
                <pre>
                    {beautify.html(this.state.markup)}
                </pre>
                {this.state.reactElement}
                <button
                    className="btn btn-default btn-xs"
                    onClick={this.refreshMarkupClick}
                >Refresh markup</button>
            </div>
        );
    }
});

module.exports = Example;
