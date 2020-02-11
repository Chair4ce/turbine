import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Global } from '@emotion/core'
import Root from '../layout/Root'
import normalize from '../style/normalize'
import MembersIndexPage from "../page/members";

// If your app is big + you have routes with a lot of components, you should consider
// code-splitting your routes! If you bundle stuff up with Webpack, I recommend `react-loadable`.
//
// $ yarn add react-loadable
// $ yarn add --dev @types/react-loadable
//
// The given `pages/` directory provides an example of a directory structure that's easily
// code-splittable.


const Routes: React.FC = () => (
    <Root>
        <Global styles={normalize} />
        <Switch>
            <Route exact path="/" component={MembersIndexPage} />
            {/*<Route path="/members" component={MembersIndexPage} />*/}
        </Switch>
    </Root>

)

export default Routes