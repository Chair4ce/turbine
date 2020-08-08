import * as React from 'react';
import {mount, ReactWrapper} from "enzyme";
import MainSection from "./MainSection";
import {Provider} from "react-redux";
import {initStore} from "../../setupTests";
import configureStore from "../../configureStore";

const initState = {
    ...initStore,
};
//@ts-ignore
const mockStore = configureStore(history, initState);
describe('MainSection test', () => {
    let subject: ReactWrapper;
    beforeEach(() => {
        subject = mount(
            <Provider store={mockStore}>
            <MainSection/>
            </Provider>
        );
    });

    test('renders', () => {
        expect(subject.exists()).toBe(true);
    });



})