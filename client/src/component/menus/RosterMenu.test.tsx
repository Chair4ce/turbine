import React from 'react';
import {mount, ReactWrapper} from "enzyme";
import {StyledRosterMenu} from "./RosterMenu";


describe('RosterMenu test', () => {
    let subject: ReactWrapper;
    let Mockfn: jest.Mock;
    beforeEach(() => {
        let  Mockfn = jest.fn();
        subject = mount(
            <StyledRosterMenu
                showCurrentPanel={false}
    showProjectedPanel={false}
    showGainingPanel={false}
    showLosingPanel={false}
    showPositionPanel={false}
    menuSelectHandler={Mockfn}
            expanded={true}
            />
        );
    });

    test('renders', () => {
        expect(subject.exists()).toBe(true);
    });

    // Covered in Acceptance test
    test('displays menu item text while default expanded', () => {
        expect(subject.find('.menu_item_text').text()).toBe('Current');
    });
    test('displays no item text while collapsed', () => {
        let  Mockfn = jest.fn();
        subject = mount(
            <StyledRosterMenu
                showCurrentPanel={false}
                showProjectedPanel={false}
                showGainingPanel={false}
                showLosingPanel={false}
                showPositionPanel={false}
                menuSelectHandler={Mockfn}
                expanded={false}
            />
        );
        expect(subject.find('.menu_item_text').exists()).toBeFalsy();
    });
});