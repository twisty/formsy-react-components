/* globals jest, describe */

jest.disableAutomock();
jest.unmock('../select');

import Select from '../select';
import componentTest from './component';

describe('The <Select /> component', () => {

    componentTest(Select);

});
