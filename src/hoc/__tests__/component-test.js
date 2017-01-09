/* globals describe, expect, it */

import React from 'react';
import Formsy from 'formsy-react';
import { mount } from 'enzyme';
import FormsyReactComponent from '../component';

describe('The component HOC', () => {

    describe('css classes', () => {
        /*
        elementWrapperClassName: styleClassName,
        labelClassName: styleClassName,
        rowClassName: styleClassName,
        */
    });

    describe('props passed to the HOC', () => {

        let TestComponent = (props) => {
            const InnerComponent = () => {
                return (
                    <div />
                );
            };
            return (
                <InnerComponent {...props} />
            )
        };
        let FRC = FormsyReactComponent(TestComponent);
        let wrapper = mount(
            <Formsy.Form>
                <FRC
                    name="testComponent"
                />
            </Formsy.Form>
        );
        let componentProps = wrapper.find(TestComponent).props();

        describe('`name`', () => {
            it('is required');
            it('should be a string');
            it('is passed through to the composed component');
        });

        describe('`disabled`', () => {
            it('is a boolean');
            it('is passed through to the composed component', () => {
                expect(typeof componentProps.disabled).toBe('boolean');
            });
        });

        describe('`help`', () => {
            it('should be a string');
            it('is passed through to the composed component');
        });

        describe('`label`', () => {
            it('should be a string');
            it('is passed through to the composed component');
        });

        describe('`id`', () => {
            it('should be a string');
            it('is generated for the composed component when not supplied', () => {
                expect(typeof componentProps.id).toBe('string');
                expect(componentProps.id.startsWith('frc-')).toBe(true);
            });
            it('is passed through to the composed component');
        });

        describe('`layout`', () => {
            it('defaults to `horizontal` if not supplied');
            it('is merged with a master value set in a parent context');
            it('is passed through to the composed component');
        });

        describe('`validatePristine`', () => {
            it('determines whether to show errors on pristine (untouched) values');
            it('is merged with a master value set in a parent context');
            it('is not passed through to the composed component');
        });

        describe('`validateOnSubmit`', () => {
            it('determines whether to hide errors until an attempt to submit the form is made');
            it('is merged with a master value set in a parent context');
            it('is not passed through to the composed component');
        });

        describe('other props', () => {
            it('are passed through to the composed component');
        });

    });

    describe('props set on the composed component', () => {
        // "Describle (v): To create a meaningless description."

        describe('`errorMessages`', () => {
            it('is an array');
            it('is the result of formsy `getErrorMessages`');
            //errorMessages: this.props.getErrorMessages(),
        });

        describe('`id`', () => {
            it('is a string');
            //id: this.getId(),
        });

        describe('`layout`', () => {
            it('is a string');
            //layout: this.mergeLayoutContext(),
        });

        describe('`required`', () => {
            it('is a boolean');
            it('is the result of formsy `isRequired`');
            //required: this.props.isRequired(),
        });

        describe('`showErrors`', () => {
            it('is a boolean');
            //showErrors: this.shouldShowErrors(),
        });

        describe('css class name properties', () => {
            /*
            elementWrapperClassName: this.combineContextWithProp('elementWrapperClassName'),
            labelClassName:          this.combineContextWithProp('labelClassName'),
            rowClassName:            this.combineContextWithProp('rowClassName'),
            */
        });

        describe('`value`', () => {
            it('`value` is the result of formsy getValue()');
        });

        describe('`disabled`', () => {
            it('is a boolean');
            //this.props.isFormDisabled() || this.props.disabled,
            it('is overridden by formsy `isFormDisabled` (if true)');
        });

        describe('`onSetValue`', () => {
            it('is a function');
            it('is just formsy setValue, with name changed to fit with project naming convention');
        });

    });
});
