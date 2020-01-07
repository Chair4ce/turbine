import * as enzyme from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({adapter: new Adapter()});
