/* globals console, jest, expect, describe, it */

import React from 'react';
import { shallow, mount } from 'enzyme';

const componentTest = (Component) => {

    return describe('acts like a formsy-react-component', () => {

        it('warns when no `id` prop is provided', () => {
            /* eslint-disable no-console */
            const error = console.error;
            console.error = jest.fn();
            /* eslint-disable no-unused-vars */
            let wrapper = shallow(
                <Component
                    name="myName"
                />
            );
            /* eslint-enable no-unused-vars */
            const errorMessages = console.error.mock.calls.map((args) => {
                return args[0];
            }).join('\n');
            expect(console.error).toBeCalled();
            expect(errorMessages).toContain('Warning: Failed prop type: The prop `id` is marked as required in');
            console.error = error;
            /* eslint-enable no-console */
        });

        it('renders a row label (when label prop is provided)', () => {
            let wrapper = mount(
                <Component
                    name="myTestInput"
                    label="My Label"
                />
            );
            expect(wrapper.find('.control-label').length).toBe(1);
            expect(wrapper.find('.control-label').text()).toEqual('My Label');
        });

        it('renders help text', () => {
            let wrapper = mount(
                <Component
                    name="myTestInput"
                    help="My help text."
                />
            );
            expect(wrapper.find('.help-block').length).toEqual(1);
        });

        it('indicates required content with a symbol', () => {
            let wrapper = mount(
                <Component
                    name="myTestInput"
                    required
                />
            );
            expect(wrapper.find('.required-symbol').length).toEqual(1);
        });

        it('displays error messages', () => {
            let wrapper = mount(
                <Component
                    name="myTestInput"
                    showErrors={true}
                    errorMessages={[
                        'An error message.'
                    ]}
                />
            );
            expect(wrapper.find('.help-block.validation-message').length).toEqual(1);
            expect(wrapper.find('div.has-error.has-feedback').length).toEqual(1);
        });

    })
};

export default componentTest;
