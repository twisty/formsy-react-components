/* globals jest, describe */

jest.disableAutomock();
jest.unmock('../textarea');

import Textarea from '../textarea';
import componentTest from './component';

describe('The <Textarea /> component', () => {

    componentTest(Textarea);

});
