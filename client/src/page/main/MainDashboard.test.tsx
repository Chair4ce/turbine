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

    it('should render the main dashboard', function () {
        expect(subject.find('.main_dashboard').exists()).toBeTruthy();
    });

    it('should render the header', function () {
        expect(subject.find('.main_header').exists()).toBeTruthy();
    });


})