import React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import  {StyledAlphaPanel} from "./AlphaPanel";

describe('Current Roster Panel Test', () => {
    let subject: ShallowWrapper;
    beforeEach(() => {
        subject = shallow(
            <StyledAlphaPanel />
        )
    });

    test('renders', () => {
        expect(subject.exists()).toBe(true);
    });

})