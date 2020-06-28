import React from 'react';
import {mount, ReactWrapper, ShallowWrapper} from "enzyme";
import {StyledMainHeader} from "./AppHeader";


describe('App Header test', () => {
    let subject: ReactWrapper;
    beforeEach(() => {
        subject = mount(
            <StyledMainHeader/>
        );
    });

    test('renders', () => {
        expect(subject.exists()).toBe(true);
    });

    // Covered in Acceptance test
    test('displays Turbine', () => {
        expect(subject.find('.app_title').text()).toBe("Turbine");
    });
});
