import * as React from 'react'
import styled from "styled-components";
import {ConnectedNavDrawer} from "../../components/layout/leftNavBar/NavDrawer";
import SpeedDialBtn from "../../components/layout/button/SpeedDialBtn";
import {ConnectedFeedbackInput} from "../../components/layout/input/Feedback";

function Main() {
    return (
        <Page>
            <ConnectedNavDrawer loading={false} members={[]}/>

            <ConnectedFeedbackInput/>
            <SpeedDialBtn/>
        </Page>
    )
}

export default Main;


const Page = styled('div')`
.h1 {
position: relative;
top: 80px;
left: 60px;
}
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
`;

