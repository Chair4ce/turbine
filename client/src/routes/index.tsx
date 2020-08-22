import * as React from 'react'
import {Route, Switch} from 'react-router-dom'

import {StyledMainIndexPage} from "../page/main";


const Routes: React.FC = () => (
            <Switch>
                <Route exact path="/" component={StyledMainIndexPage}/>
            </Switch>
);

export default Routes