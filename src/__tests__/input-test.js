/* globals require, jest, describe, it, xit, expect, beforeEach */

'use strict';

jest.autoMockOff();

var React = require('react');
var ReactDOM = require('react-dom');
var Formsy = require('formsy-react');
var Input = require('../input.js');
var TestUtils = require('react-addons-test-utils');

describe('Input', function() {

    var changeHandler;
    var component;
    var labelDOMNode;
    var inputDOMNode;

    beforeEach(function() {

        changeHandler = jest.genMockFunction();

        var form = TestUtils.renderIntoDocument(
            <Formsy.Form>
                <Input
                    name="myTestInput"
                    label="My Label"
                    value="Initial value"
                    onChange={changeHandler}
                />
            </Formsy.Form>
        );

        // Get the React Component.
        component = TestUtils.findRenderedComponentWithType(form, Input);

        // Get the label DOM node.
        labelDOMNode = ReactDOM.findDOMNode(component).querySelector('label');

        // Get the input DOM node.
        inputDOMNode = ReactDOM.findDOMNode(component).querySelector('input');

    });

    it('renders a label', function() {
        expect(labelDOMNode.textContent).toEqual('My Label');
    });

    it('displays an initial value', function() {
        expect(inputDOMNode.value).toEqual('Initial value');
    });

    it('sets a value when changed', function() {
        /*
         * The following doesn't work, we have to set the node's value directly:
         *
         * TestUtils.Simulate.change(node, {target: {value: 'Changed value'}});
         *
         * @see https://github.com/facebook/react/issues/3151#issuecomment-74943529
         */
        inputDOMNode.value = 'Changed value';
        TestUtils.Simulate.change(inputDOMNode);
        expect(inputDOMNode.value).toEqual('Changed value');
        expect(component.getValue()).toEqual('Changed value');
    });

    it('executes a props.onChange callback', function() {
        expect(changeHandler).not.toBeCalled();
        inputDOMNode.value = 'Changed value';
        TestUtils.Simulate.change(inputDOMNode);
        expect(changeHandler).toBeCalled();
    });

    it('generates a default id attribute', function() {
        expect(inputDOMNode.getAttribute('id')).toEqual(labelDOMNode.getAttribute('for'));
    });

    xit('displays placeholder text', function() {});
    xit('displays help text', function() {});
    xit('indicates required content', function() {});
    xit('shows validation feedback', function() {});
});
