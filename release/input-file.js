/*jshint node:true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');
var propUtilities = require('./prop-utilities');

var File = React.createClass({
    displayName: 'File',


    mixins: [Formsy.Mixin, ComponentMixin],

    getInitialState: function getInitialState() {
        return {
            fileList: []
        };
    },

    changeValue: function changeValue(event) {
        var target = event.currentTarget;
        var value = target.value;
        this.setState({ fileList: target.files });
        this.setValue(target.files);
        this.props.onChange(this.props.name, target.files, value);
    },

    render: function render() {
        var element = this.renderElement();

        if (this.getLayout() === 'elementOnly' || this.props.type === 'hidden') {
            return element;
        }

        return React.createElement(
            Row,
            _extends({}, this.getRowProperties(), {
                htmlFor: this.getId()
            }),
            element,
            this.renderHelp(),
            this.renderErrorMessage()
        );
    },

    renderElement: function renderElement() {
        return React.createElement('input', _extends({
            ref: 'element'
        }, propUtilities.cleanProps(this.props), {
            id: this.getId(),
            type: 'file',
            label: null,
            onChange: this.changeValue,
            disabled: this.isFormDisabled() || this.props.disabled
        }));
    }

});

module.exports = File;