import * as React from 'react';
import {shallow, ShallowWrapper} from "enzyme";
import MainDashboard from "./MainDashboard";

describe('MainDashboard test', () => {
    let subject: ShallowWrapper;
    beforeEach(() => {
        subject = shallow(
            <MainDashboard/>
        );
    });

    test('renders', () => {
        expect(subject.exists()).toBe(true);
    });

    // Covered in Acceptance test
    test('displays Hello World', () => {
        expect(subject.find('.hello').text()).toBe("Hello World");
    })


})