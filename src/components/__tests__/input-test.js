/* globals jest, describe, it, expect, beforeEach */

import React from 'react';
import {mount} from 'enzyme';
import Input from '../input';
import componentTest from './component';

const changeValue = (inputNode, value) => {
  const inputDOMNode = inputNode.getDOMNode();
  inputDOMNode.value = value;
  inputNode.simulate('change');
};

describe('The <Input /> component', () => {
  componentTest(Input);

  describe('the initial render of the form control', () => {
    it('is `type="text"` by default', () => {
      const wrapper = mount(<Input name="myTestInput" />);
      expect(wrapper.find('input').prop('type')).toEqual('text');
    });

    it('has an initial value passed by prop', () => {
      const wrapper = mount(<Input name="myTestInput" value="Initial value" />);
      expect(wrapper.find('input').prop('value')).toEqual('Initial value');
    });

    it('has a placeholder value passed by prop', () => {
      const wrapper = mount(
        <Input name="myTestInput" value="" placeholder="My placeholder" />,
      );
      expect(wrapper.find('input').prop('placeholder')).toEqual(
        'My placeholder',
      );
    });
  });

  describe('has basic accessibility features', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Input
          name="myTestInput"
          id="myId"
          label="My Label"
          value="Initial value"
        />,
      );
    });

    it('has an `id` attribute on the form control', () => {
      expect(wrapper.find('input').prop('id')).toEqual('myId');
    });

    it('has a matching `htmlFor` attribute on the label', () => {
      const id = wrapper.find('input').prop('id');
      const htmlFor = wrapper.find('label').prop('htmlFor');
      expect(htmlFor).toEqual(id);
    });

    // http://getbootstrap.com/css/#forms-help-text
    it('has an `aria-describedby` prop on the form control when help text is present', () => {});

    it('has an `aria-invalid="true"` prop on the form control when validation has failed', () => {});

    it('has an `aria-required="true"` prop on the form control when validation is required', () => {});

    /*
     * aria-hidden="true" on status glyphicons
     *
     * add sr-only feedback and aria-describedby in addidition to glyphicons.
     *
     * <div class="form-group has-success has-feedback">
     *   <label class="control-label" for="inputSuccess2">Input with success</label>
     *   <input
     *     type="text"
     *     class="form-control"
     *     id="inputSuccess2"
     *     aria-describedby="inputSuccess2Status"
     *   >
     *   <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
     *   <span id="inputSuccess2Status" class="sr-only">(success)</span>
     * </div>
     */
  });

  describe('Input components do this', () => {
    let onBlurProp;
    let onChangeProp;
    let onSetValueProp;
    let wrapper;

    beforeEach(() => {
      jest.useFakeTimers();

      onBlurProp = jest.fn();
      onChangeProp = jest.fn();
      onSetValueProp = jest.fn();

      wrapper = mount(
        <Input
          name="myTestInput"
          id="myId"
          label="My Label"
          value="Initial value"
          onBlur={onBlurProp}
          onChange={onChangeProp}
          onSetValue={onSetValueProp}
        />,
      );
    });

    // Test that this is a controlled component.
    it('updates the input value from props', () => {
      wrapper.setProps({value: 'Changed value'});
      expect(wrapper.find('input').prop('value')).toEqual('Changed value');
    });

    it('executes `props.onChange` when the <input /> value changes', () => {
      /*
       * The following doesn't work, we have to set the node's value directly:
       *
       * TestUtils.Simulate.change(node, {currentTarget: {value: 'Changed value'}});
       *
       * @see https://github.com/facebook/react/issues/3151#issuecomment-74943529
       */
      expect(onChangeProp).not.toBeCalled();
      const inputNode = wrapper.find('input');
      changeValue(inputNode, 'Changed value');
      expect(onChangeProp).toBeCalled();
      expect(wrapper.find('input').prop('value')).toEqual('Changed value');
    });

    it('debounces `props.onSetValue`', () => {
      expect(onChangeProp).not.toBeCalled();
      expect(onSetValueProp).not.toBeCalled();

      const inputNode = wrapper.find('input');
      changeValue(inputNode, 'a');
      changeValue(inputNode, 'b');
      changeValue(inputNode, 'c');

      expect(onChangeProp).toBeCalled();
      expect(onChangeProp).toHaveBeenCalledTimes(3);

      /*
       * The `onSetValueProp` function should be called after a period of
       * 500ms (it is debounced for change events).
       */
      expect(onSetValueProp).not.toBeCalled();
      jest.runAllTimers();
      expect(onSetValueProp).toBeCalled();
      expect(onSetValueProp).toHaveBeenCalledTimes(1);
    });
  });

  describe('includes an `<InputGroup />` component when', () => {
    it('is triggered by an `addonBefore` prop', () => {});
    it('is triggered by an `addonAfter` prop', () => {});
    it('is triggered by an `buttonBefore` prop', () => {});
    it('is triggered by an `buttonAfter` prop', () => {});
  });

  describe('for "hidden" type', () => {
    it('doesn’t render a label', () => {
      const wrapper = mount(
        <Input name="myTestInput" type="hidden" label="My Label" />,
      );
      expect(wrapper.find('label').length).toBe(0);
    });
  });
});
