import React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import {StyledCurrentRosterPanel} from "./CurrentRosterPanel";


describe('Current Roster Panel Test', () => {
    let subject: ShallowWrapper;
    beforeEach(() => {
        subject = shallow(
            <StyledCurrentRosterPanel/>
        )
    });

    test('renders', () => {
        expect(subject.exists()).toBe(true);
    });

})