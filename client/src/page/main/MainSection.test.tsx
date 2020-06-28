import * as React from 'react';
import {mount, ReactWrapper} from "enzyme";
import {StyledMainSection} from "./MainSection";

describe('MainSection test', () => {
    let subject: ReactWrapper;
    beforeEach(() => {
        subject = mount(
            <StyledMainSection/>
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