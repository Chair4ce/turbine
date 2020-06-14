import * as React from 'react';
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MainDashboard from "./MainDashboard";

Enzyme.configure({adapter: new Adapter()});

describe('MainDashboard test', () => {
    test('renders', () => {
        const wrapper = shallow(<MainDashboard/>);
        expect(wrapper.exists()).toBe(true);

    });

    test('displays Hello World', () => {
        const wrapper = shallow(<MainDashboard/>);
        expect(wrapper.find('.hello').text()).toBe("Hello World");
    })
})