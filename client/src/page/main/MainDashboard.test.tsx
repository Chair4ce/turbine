import React from 'react';
import {mount, ReactWrapper} from "enzyme";
import {StyledMainDashboard} from "./MainDashboard";
import {initStore} from "../../setupTests";
import configureStore from "../../configureStore";
import {Provider} from "react-redux";


const initState = {
    ...initStore,
};
//@ts-ignore
const mockStore = configureStore(history, initState);
describe('MainDashboard test', () => {
    let subject: ReactWrapper;
    beforeEach(() => {
        subject = mount(
            <Provider store={mockStore}>
            <StyledMainDashboard/>
            </Provider>
        );
    });

    test('renders', () => {
        expect(subject.exists()).toBe(true);
    });

    it('should render the main dashboard', function () {
        expect(subject.find('.main_dashboard').exists()).toBeTruthy();
    });

    it('should render the header', function () {
        expect(subject.find('.main_header').exists()).toBeTruthy();
    });


})