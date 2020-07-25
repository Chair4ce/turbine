import * as React from 'react';
import {mount, ReactWrapper} from "enzyme";
import {StyledMainSection} from "./MainSection";
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
            <StyledMainSection/>
            </Provider>
        );
    });

    test('renders', () => {
        expect(subject.exists()).toBe(true);
    });

    it('should render the main section', function () {
        expect(subject.find('.main_section').exists()).toBeTruthy();
    });

    it('should render the sidebar area', function () {
        expect(subject.find('.sidebar_area').exists()).toBeTruthy();
    });


})