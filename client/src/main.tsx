import * as React from 'react';
import {Provider} from 'react-redux';

import {Store} from 'redux';
import {ApplicationState} from './store';
import normalize from "./style/normalize";
import {Global} from "@emotion/react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {History} from "history";
import {StyledMainIndexPage} from "./page/main";
import {BrowserRouter, Route} from 'react-router-dom';
import {Switch} from "react-router";

// Any additional component props go here.
interface MainProps {
    store: Store<ApplicationState>;
    history: History;
}

// Create an intersection type of the component props and our Redux props.
const Main: React.FC<MainProps> = ({store, history }) => {

    return (
            <Provider store={store}>
                <Global styles={normalize}/>
                <CssBaseline/>
                        <BrowserRouter>
                            <Switch>
                                <Route path='/' component={StyledMainIndexPage}/>
                            </Switch>
                        </BrowserRouter>
            </Provider>
    );
};

// Normally you wouldn't need any generics here (since types infer from the passed functions).
// But since we pass some props from the `index.js` file, we have to include them.
// For an example of a `connect` function without generics, see `./containers/LayoutContainer`.
export default Main;
