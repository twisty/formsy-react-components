/* globals jest, describe */

jest.disableAutomock();
jest.unmock('../checkbox');

import Checkbox from '../checkbox';
import componentTest from './component';

describe('The <Checkbox /> component', () => {

    componentTest(Checkbox);

});
