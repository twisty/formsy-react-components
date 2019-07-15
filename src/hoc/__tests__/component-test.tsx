/* globals describe, expect, it */

import React from 'react';
import Formsy, {withFormsy} from 'formsy-react';
import {mount} from 'enzyme';
import withFRC from '../component';

describe('The component HOC', () => {
  describe('css classes', () => {
    // elementWrapperClassName
    // labelClassName
    // rowClassNam
  });

  describe('props passed to the HOC', () => {
    interface Props {
      name: string;
    }
    class TestComponent extends React.Component<Props> {
      public constructor(props) {
        super(props);
      }
      public render(): JSX.Element {
        const InnerComponent = (): JSX.Element => <div />;
        return <InnerComponent />;
      }
    }
    const FRC = withFormsy(withFRC(TestComponent));
    const wrapper = mount(
      <Formsy>
        <FRC name="testComponent" />
      </Formsy>,
    );
    const componentProps = wrapper.find(TestComponent).props();

    describe('`name`', () => {
      it('is required', () => {});
      it('should be a string', () => {});
      it('is passed through to the composed component', () => {});
    });

    describe('`disabled`', () => {
      const disabledProp = componentProps.disabled;
      it('is passed through to the composed component', () => {
        expect(typeof disabledProp).not.toBe(undefined);
      });
      it('is a boolean', () => {
        expect(typeof disabledProp).toBe('boolean');
      });
    });

    describe('`help`', () => {
      it('should be a string', () => {});
      it('is passed through to the composed component', () => {});
    });

    describe('`label`', () => {
      it('should be a string', () => {});
      it('is passed through to the composed component', () => {});
    });

    describe('`id`', () => {
      it('should be a string', () => {});
      it('is generated for the composed component when not supplied', () => {
        //expect(typeof componentProps.id).toBe('string');
        //expect(componentProps.id.startsWith('frc-')).toBe(true);
      });
      it('is passed through to the composed component', () => {});
    });

    describe('`layout`', () => {
      it('defaults to `horizontal` if not supplied', () => {});
      it('is merged with a master value set in a parent context', () => {});
      it('is passed through to the composed component', () => {});
    });

    describe('`validatePristine`', () => {
      it('determines whether to show errors on pristine (untouched) values', () => {});
      it('is merged with a master value set in a parent context', () => {});
      it('is not passed through to the composed component', () => {});
    });

    describe('`validateBeforeSubmit`', () => {
      it('determines whether to hide errors until an attempt to submit the form is made', () => {});
      it('is merged with a master value set in a parent context', () => {});
      it('is not passed through to the composed component', () => {});
    });

    describe('other props', () => {
      it('are passed through to the composed component', () => {});
    });
  });

  describe('props set on the composed component', () => {
    // "Describle (v): To create a meaningless description."

    describe('`errorMessages`', () => {
      it('is an array', () => {});
      it('is the result of formsy `getErrorMessages`', () => {});
      // errorMessages: this.props.getErrorMessages(),
    });

    describe('`id`', () => {
      it('is a string', () => {});
      // id: this.getId(),
    });

    describe('`layout`', () => {
      it('is a string', () => {});
    });

    describe('`required`', () => {
      it('is a boolean', () => {});
      it('is the result of formsy `isRequired`', () => {});
      // required: this.props.isRequired(),
    });

    describe('`showErrors`', () => {
      it('is a boolean', () => {});
      // showErrors: this.shouldShowErrors(),
    });

    describe('css class name properties', () => {
      // elementWrapperClassName
      // labelClassName
      // rowClassName
    });

    describe('`value`', () => {
      it('`value` is the result of formsy getValue()', () => {});
    });

    describe('`disabled`', () => {
      it('is a boolean', () => {});
      // this.props.isFormDisabled() || this.props.disabled,
      it('is overridden by formsy `isFormDisabled` (if true)', () => {});
    });

    describe('`onSetValue`', () => {
      it('is a function', () => {});
      it('is just formsy setValue, with name changed to fit with project naming convention', () => {});
    });
  });
});
