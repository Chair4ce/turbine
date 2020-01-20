import * as React from 'react'
import Page from '../components/layout/Page'

import PageContainer from "../components/layout/PageContainer";
import TopNavBar from "../components/layout/topNavBar/TopNavBar";
import LeftNavBar from "../components/layout/leftNavBar/LeftNavBar";

function Main() {
    return (
        <Page>
            <LeftNavBar/>
            <TopNavBar/>
                    <PageContainer>
                        <h1>Welcome to Turbine!</h1>
                    </PageContainer>
        </Page>
    )
}

export default Main

