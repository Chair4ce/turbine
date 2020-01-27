import * as React from 'react'
import styled from "styled-components";
import NavDrawer from "../components/layout/leftNavBar/NavDrawer";

function Main() {
    return (
        <Page>
            <NavDrawer loading={true}/>

        </Page>
    )
}

export default Main;


const Page = styled('div')`
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
`;

