/* globals require, jest, describe, it, expect */

'use strict';

jest.autoMockOff();

var React = require('react');
var ReactDOM = require('react-dom');
var Formsy = require('formsy-react');
var Select = require('../select.js');
var TestUtils = require('react-addons-test-utils');

describe('Select', function() {

    var component;
    var elementDOMNode;

    it('renders optgroups', function() {
        var options = [
            { label: 'A-1', value: 'a1' },
            { label: 'B-1', value: 'b1', group: 'B-group' },
            { label: 'B-2', value: 'b2', group: 'B-group' },
            { label: 'C-1', value: 'c1' },
            { label: 'B-3', value: 'b3', group: 'B-group' },
            { label: 'D-1', value: 'd1', group: 'D-group' },
            { label: 'E-1', value: 'e1' }
        ];
        var form = TestUtils.renderIntoDocument(
            <Formsy.Form>
                <Select
                    name="myTestInput"
                    label="My Label"
                    value="b1"
                    options={options}
                />
            </Formsy.Form>
        );

        // Get the React Component.
        component = TestUtils.findRenderedComponentWithType(form, Select);

        // Get the input DOM node.
        elementDOMNode = ReactDOM.findDOMNode(component).querySelector('select');

        // There should be 2 <optgroup>s
        expect(elementDOMNode.getElementsByTagName('optgroup').length).toBe(2);

        // There should be 7 <option>s
        expect(elementDOMNode.getElementsByTagName('option').length).toBe(7);
    });
});
