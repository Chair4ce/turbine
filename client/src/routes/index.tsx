import * as React from 'react'
import {lazy, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'
import LoadingSpinner from "../component/displayLoading/LoadingSpinner";

const mainPage = lazy(() => import('../page/main'));

const Routes: React.FC = () => (
        <Suspense fallback={<LoadingSpinner/>}>
            <Switch>
                <Route exact path="/" component={mainPage}/>
            </Switch>
        </Suspense>
);

export default Routes