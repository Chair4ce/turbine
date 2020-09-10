import * as React from 'react';
import {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import {Store} from 'redux';
import {History} from 'history';
import {ApplicationState} from './store';
import normalize from "./style/normalize";
import {Global} from "@emotion/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {AppContext} from "./libs/contextLib";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Route, Switch} from "react-router-dom";
import {StyledMainIndexPage} from "./page/main";
import LoginDashboard from "./component/login/LoginDashboard";

// Any additional component props go here.
interface MainProps {
    store: Store<ApplicationState>;
    history: History;
}

const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appContainer: {
                width: '100%',
                display: 'block'
            },
        }),
    )
;

// Create an intersection type of the component props and our Redux props.
const Main: React.FC<MainProps> = ({store, history}) => {
    const classes = useStyles();
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);


    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            // await Auth.currentSession();
            console.log("logging in")
            userHasAuthenticated(true);
            history.push("/login")
        } catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        setIsAuthenticating(false);
    }

    return (
        !isAuthenticating &&
        <div className={classes.appContainer}>
            <Provider store={store}>
                <Global styles={normalize}/>
                <CssBaseline/>
                <ConnectedRouter history={history}>
                    <AppContext.Provider value={{isAuthenticated, userHasAuthenticated}}>
                        <Switch>
                            <Route exact path="/"  > <StyledMainIndexPage history={history}/></Route>
                            <Route path="/login" > <LoginDashboard history={history}/></Route>
                        </Switch>
                    </AppContext.Provider>
                </ConnectedRouter>
            </Provider>
        </div>
    );
};


export default Main;
