import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';
import './index.scss';

import Main from './main';
import * as serviceWorker from './serviceWorker';
import configureStore from './configureStore';

import 'typeface-ibm-plex-sans';
import theme, {muiTheme} from "./style/theme";
import {MuiThemeProvider} from "@material-ui/core";
import {ThemeProvider} from "styled-components";

// We use hash history because this example is going to be hosted statically.
// Normally you would use browser history.
const history = createBrowserHistory();

const initialState = window.INITIAL_REDUX_STATE;
export const store = configureStore(history, initialState);

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={muiTheme}>
            <Main store={store} history={history}/>
        </MuiThemeProvider>
    </ThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
