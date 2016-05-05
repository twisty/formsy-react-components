/* globals jest, describe */

jest.disableAutomock();
jest.unmock('../input-file');

import File from '../input-file';
import componentTest from './component';

describe('The <File /> component', () => {

    componentTest(File);

});
