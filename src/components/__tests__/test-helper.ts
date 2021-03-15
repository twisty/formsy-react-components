import {configure} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'; // eslint-disable-line import/default

configure({adapter: new EnzymeAdapter()});
