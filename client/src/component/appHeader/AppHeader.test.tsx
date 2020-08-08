import React from 'react';
import {mount, ReactWrapper} from "enzyme";
import MainHeader from "./AppHeader";


describe('App Header test', () => {
    let subject: ReactWrapper;
    beforeEach(() => {
        subject = mount(
            <MainHeader/>
        );
    });

    test('renders', () => {
        expect(subject.exists()).toBe(true);
    });

    // Covered in Acceptance test
});
