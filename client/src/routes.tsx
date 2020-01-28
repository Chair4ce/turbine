import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Global } from '@emotion/core'
import Root from './components/layout/Root'
import Main from './pages/index'
import normalize from './styles/normalize'
import MembersIndexPage from "./pages/members/index";
import {darktheme} from "./styles/theme/dark";
import {ThemeProvider} from "@material-ui/styles";


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
            <Route exact path="/" component={Main} />
            <Route path="/members" component={MembersIndexPage} />
            {/*<Route component={() => <div>Not Found</div>} />*/}
        </Switch>
    </Root>

)

export default Routes