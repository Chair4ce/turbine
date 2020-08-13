import React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import SideBar from "./SideBar";


describe('SideBar Test', () => {
    let subject: ShallowWrapper;
    beforeEach(() => {
        let  Mockfn = jest.fn();
        subject = shallow(
            <SideBar
                drawerExpanded={false}
                showPositionPanel={false}
            showLosingPanel={false}
                showGainingPanel={false}
                showProjectedPanel={false}
                showCurrentPanel={false}
                menu_item_select_callback={Mockfn}
            />
        )
    });

    it('should display a sidebar', function () {
        expect(subject.exists()).toBe(true);
    });

})