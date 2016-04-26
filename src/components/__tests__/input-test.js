/* globals require, jest, describe, it, xit, expect, beforeEach */

jest.autoMockOff();
jest.unmock('../../main');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Formsy from 'formsy-react';

// Imports are hoisted, so using require to prevent this from getting mocked.
// should try npm install babel-plugin-jest-unmock
// https://github.com/facebook/jest/issues/796

//import Input from '../input';
const { Input } = require('../../main').default;

describe('Input', function() {

    let changeHandler;
    let component;
    let labelDOMNode;
    let inputDOMNode;

    beforeEach(() => {

        changeHandler = jest.genMockFunction();

        const form = TestUtils.renderIntoDocument(
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

    it('renders a label', () => {
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
    xit('displays help text');
    xit('indicates required content');
    xit('shows validation feedback');
});
