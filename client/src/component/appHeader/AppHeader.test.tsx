import React from 'react';
import {mount, ReactWrapper} from "enzyme";
import MainHeader from "./AppHeader";
import {Provider} from "react-redux";

import {initStore} from "../../setupTests";
import configureStore from "../../configureStore";

const initState = {
    ...initStore,
};
//@ts-ignore
const mockStore = configureStore(history, initState);
describe('App Header test', () => {
    let subject: ReactWrapper;
    beforeEach(() => {
        let  Mockfn = jest.fn();
        subject = mount(
            <Provider store={mockStore}>
            <MainHeader
            menuSelectHandler={Mockfn}/>

            </Provider>
        );
    });

    test('renders', () => {
        expect(subject.exists()).toBe(true);
    });

    // Covered in Acceptance test
});
