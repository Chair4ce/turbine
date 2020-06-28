import React from 'react';
import {mount, ReactWrapper, ShallowWrapper} from "enzyme";
import {StyledMainDashboard} from "./MainDashboard";

describe('MainDashboard test', () => {
    let subject: ReactWrapper;
    beforeEach(() => {
        subject = mount(
            <StyledMainDashboard/>
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