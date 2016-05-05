/* globals jest, describe */

jest.disableAutomock();
jest.unmock('../checkbox-group');

import CheckboxGroup from '../checkbox-group';
import componentTest from './component';

describe('The <CheckboxGroup /> component', () => {

    componentTest(CheckboxGroup);

});
