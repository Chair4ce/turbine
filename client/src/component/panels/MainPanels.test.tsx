import React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import {StyledMainPanels} from "./MainPanels";

describe('Main Panel Test', () => {
    let subject: ShallowWrapper;
    beforeEach(() => {
        subject = shallow(
            <StyledMainPanels />
        )
    });
    test('renders', () => {
        expect(subject.exists()).toBe(true);
    });

})