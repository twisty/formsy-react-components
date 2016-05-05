/* globals jest, describe */

jest.disableAutomock();
jest.unmock('../radio-group');

import RadioGroup from '../radio-group';
import componentTest from './component';

describe('The <RadioGroup /> component', () => {

    componentTest(RadioGroup);

});
