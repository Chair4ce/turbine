import * as React from 'react'
import styled from "styled-components";
import {ConnectedNavDrawer} from "../components/layout/leftNavBar/NavDrawer";
import SpeedDialBtn from "../components/layout/button/SpeedDialBtn";
import {ConnectedFeedbackInput} from "../components/layout/input/Feedback";

function Main() {
    return (
        <Page>
            <ConnectedNavDrawer loading={false} members={[]}/>
            <h1>Welcome to the Turbine Demo! Don't forget to leave feedback!</h1>
            <ConnectedFeedbackInput/>
            <SpeedDialBtn/>
        </Page>
    )
}

export default Main;


const Page = styled('div')`
.h1 {
padding: 80px;
}
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
`;

