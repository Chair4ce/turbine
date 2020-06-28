import React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import {StyledSideBar} from "./SideBar";


describe('SideBar Test', () => {
    let subject: ShallowWrapper;
    beforeEach(() => {
        subject = shallow(
            <StyledSideBar/>
        )
    });

    it('should display a sidebar', function () {
        expect(subject.exists()).toBe(true);
    });

})