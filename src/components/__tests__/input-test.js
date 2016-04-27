/* globals jest, describe, it, xit, expect, beforeEach */

jest.disableAutomock();
jest.unmock('../input');

import React from 'react';
import { mount } from 'enzyme';
import Input from '../input';

describe('Input', function() {

    let handleChange;
    let handleSetValue;
    let wrapper;
    let inputNode;
    let labelNode;

    beforeEach(() => {

        handleChange = jest.genMockFunction();
        handleSetValue = jest.genMockFunction();

        wrapper = mount(
            <Input
                name="myTestInput"
                id="myId"
                label="My Label"
                value="Initial value"
                onChange={handleChange}
                onSetValue={handleSetValue}
            />
        );

        inputNode = wrapper.find('input');
        labelNode = wrapper.find('label');

    });

    it('renders a label', () => {
        expect(wrapper.find('label').length).toBe(1);
        expect(wrapper.find('label').text()).toEqual('My Label');
    });

    it('displays an initial value', () => {
        expect(wrapper.find('input').prop('value')).toEqual('Initial value');
    });

    // Test that this is a controlled component.
    it('updates the input value from props', () => {
        wrapper.setProps({value: 'Changed value'});
        expect(inputNode.prop('value')).toEqual('Changed value');
    });

    it('executes a props.onChange callback', () => {
        /*
         * The following doesn't work, we have to set the node's value directly:
         *
         * TestUtils.Simulate.change(node, {currentTarget: {value: 'Changed value'}});
         *
         * @see https://github.com/facebook/react/issues/3151#issuecomment-74943529
         */
        expect(handleChange).not.toBeCalled();
        let event = {currentTarget: {value: 'Changed value'}};
        inputNode.simulate('change', event);
        expect(handleChange).toBeCalled();
        //expect(inputNode.prop('value')).toEqual('Changed value');
    });

    it('executes a props.onSetValue callback', () => {
        expect(handleSetValue).not.toBeCalled();
        inputNode.simulate('change');
        expect(handleSetValue).toBeCalled();
    });

    it('renders a htmlFor attribute on the label', () => {
        let id = inputNode.prop('id');
        let htmlFor = labelNode.prop('htmlFor');
        expect(htmlFor).toEqual(id);
    });

    xit('displays placeholder text', function() {});
    xit('displays help text');
    xit('indicates required content');
    xit('shows validation feedback');
});
