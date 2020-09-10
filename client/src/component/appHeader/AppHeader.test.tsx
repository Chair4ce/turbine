import React, {useState} from 'react';
import {mount, ReactWrapper} from "enzyme";
import MainHeader from "./AppHeader";
import {Provider} from "react-redux";
import {History} from 'history';
import {initStore} from "../../setupTests";
import configureStore from "../../configureStore";
import {AppContext, useAppContext} from "../../libs/contextLib";
import {ConnectedRouter} from "connected-react-router";

const initState = {
    ...initStore,
};
//@ts-ignore
const mockStore = configureStore(history, initState);
describe('App Header test', () => {

    const contextValues = {isAuthenticated: false}
    const contextFunction = {userHasAuthenticated: jest.fn()}

    let subject: ReactWrapper;
    let history: History
    beforeEach(() => {
        let  Mockfn = jest.fn();
        subject = mount(
            <Provider store={mockStore}>
                <AppContext.Provider value={{contextValues, contextFunction}}>
            <MainHeader
                history={history}
            menuSelectHandler={Mockfn}
            />
                </AppContext.Provider>
            </Provider>
        );
    });

    test('renders', () => {
        expect(subject.exists()).toBe(true);
    });

    // Covered in Acceptance test
});
