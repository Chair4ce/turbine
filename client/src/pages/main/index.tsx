import * as React from 'react'
import styled from "styled-components";

function Main() {
    return (
        <Page>
            {/*<ConnectedNavDrawer/>*/}
            {/*<ConnectedFeedbackInput/>*/}
            {/*<SpeedDialBtn/>*/}
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

