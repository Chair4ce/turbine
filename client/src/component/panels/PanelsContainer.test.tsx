import React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import { StyledPanelsContainer} from "./PanelsContainer";

describe('Panel Container Test', () => {
    let subject: ShallowWrapper;
    beforeEach(() => {
        subject = shallow(
            <StyledPanelsContainer

            />
        )
    });
    test('renders', () => {
        expect(subject.exists()).toBe(true);
    });

})