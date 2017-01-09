/* globals describe, it, expect */

import React from 'react';
import { mount } from 'enzyme';
import Select from '../select';
import componentTest from './component';

describe('The <Select /> component', () => {

    componentTest(Select);

    it('renders optgroups', () => {

        const options = [
            { label: 'A-1', value: 'a1' },
            { label: 'B-1', value: 'b1', group: 'B-group' },
            { label: 'B-2', value: 'b2', group: 'B-group' },
            { label: 'C-1', value: 'c1' },
            { label: 'B-3', value: 'b3', group: 'B-group' },
            { label: 'D-1', value: 'd1', group: 'D-group' },
            { label: 'E-1', value: 'e1' }
        ];

        let wrapper = mount(
            <Select
                name="myTestInput"
                label="My Label"
                value="b1"
                options={options}
            />
        );

        // There should be 2 <optgroup>s
        expect(wrapper.find('optgroup').length).toBe(2);

        // There should be 7 <option>s
        expect(wrapper.find('option').length).toBe(7);
    });

});
