import * as React from 'react'
import styled from "styled-components";
import {ConnectedNavDrawer} from "../components/layout/leftNavBar/NavDrawer";

function Main() {
    return (
        <Page>
            <ConnectedNavDrawer loading={false} members={[]}/>
        </Page>
    )
}

export default Main;


const Page = styled('div')`
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
`;

