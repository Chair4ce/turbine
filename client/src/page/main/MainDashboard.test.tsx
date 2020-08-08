import React from 'react';
import {mount, ReactWrapper} from "enzyme";
import MainDashboard from "./MainDashboard";
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
            <MainDashboard/>
            </Provider>
        );
    });

    test('renders', () => {
        expect(subject.exists()).toBe(true);
    });
})