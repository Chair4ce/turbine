import React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import AlphaTable from "./AlphaTable";

describe('AlphaTable Test', () => {
    let subject: ShallowWrapper;
    beforeEach(() => {
        subject = shallow(
            <AlphaTable />
        )
    });
    
    it('should render a table', function () {
    expect(subject.find('.alphaTable').exists()).toBeTruthy();
    });

    it('should display the empty banner if no members exists', function () {
        expect(subject.find('.emptyTableBanner').exists()).toBeTruthy();
    });

    it('should display rows if members exist', function () {
        expect(subject.find('.memberRow').exists([3])).toBeTruthy();
    });
})