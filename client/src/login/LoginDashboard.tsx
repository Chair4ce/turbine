import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import TurbineBanner from "../component/icon/TurbineBanner";
import {ButtonGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {AccountCircle} from "@material-ui/icons";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {useAppContext} from "../libs/contextLib";
import {History} from 'history';
import {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {PositionSerializer} from "../util/PositionSerializer";
import AuthenticationService from "../util/AuthenticationService";

interface Props {
    history: History;
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            display: 'grid',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        },
        container: {
            transform: 'translate(50%, -50%)',
            top: '50%',
            right: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '30rem',
            height: '20rem',
            boxShadow: '0 0 2rem 0 rgba(0, 0, 0, .2)',
            borderRadius: '5px',
            zIndex: 1,
            background: 'inherit',
            overflow: 'hidden',
            position: 'absolute',
            '&:before': {
                content: '',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                boxShadow: 'inset 0 0 2000px rgba(255, 255, 255, .5)',
                filter: 'blur(10px)',
                background: 'inherit',
            },
        },
        loginForm: {
            position: 'absolute',

        },
        loginBtnGrp: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 170
        },
        margin: {
            margin: theme.spacing(1),
        },
        loadingMsg: {
            fontSize: '22px'
        }
    }),
);

const LoginDashboard: React.FC<Props> = props => {
    const classes = useStyles();
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    function loginClicked() {
        //in28minutes,dummy
        // if(this.state.username==='in28minutes' && this.state.password==='dummy'){
        //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //     this.props.history.push(`/courses`)
        //     //this.setState({showSuccessMessage:true})
        //     //this.setState({hasLoginFailed:false})
        // }
        // else {
        //     this.setState({showSuccessMessage:false})
        //     this.setState({hasLoginFailed:true})
        // }

        // AuthenticationService
        //     .executeBasicAuthenticationService(email, password)
        //     .then(() => {
        //         AuthenticationService.registerSuccessfulLogin(email, password)
        //         props.history.push(`/`)
        //     }).catch(() => {
        //         console.log("Login failed")
        //     // this.setState({ showSuccessMessage: false })
        //     // this.setState({ hasLoginFailed: true })
        // })

        AuthenticationService
            .executeJwtAuthenticationService(email, password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(email, response.data.token)
                console.log("Login Successful")
                props.history.push(`/courses`)
            }).catch(() => {
            console.log("Login failed")
        });



    }

    useEffect(() => {

        if(isLoading) {
            fetch(`/api/signin`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'grant_type=password&email=' + email + '&password=' + password
                }
        )
                .then(response => console.log(response))
                .catch(reason => console.log(`Fetch failed: ${reason}`));
        return () => {}
        }
    }, [isLoading]);

    function handleLogin() {
        if(email == null || email == "") setEmailError(true);
        if (password == null || password == "") setPasswordError(true);
            if(!(email == null || email == "") && !(password == null || password == "")) {
                setIsLoading(true);
            }
    }

    function handleEmailChange(event: { target: { value: string; }; }) {
        if(event.target.value != "" || event.target.value != null) {
            setEmail(event.target.value);
            if(emailError) {setEmailError(false)}
        }
    }
    function handlePasswordChange(event: { target: { value: string; }; }) {
        if(event.target.value != "" || event.target.value != null) {
            setPassword(event.target.value);
            if(passwordError){setPasswordError(false)}
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
            <TurbineBanner duration={isLoading && "20s"}/>
            <div className={classes.loginForm}>
                {!isLoading ?  <form className={classes.loginBtnGrp}>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AccountCircle style={{height: '100%'}}/>
                            </Grid>
                            <Grid item>
                                {!emailError ? <TextField id="input-with-icon-grid" label="Email" required={true} onChange={handleEmailChange}/> : <TextField error id="input-with-icon-grid-error" label="Email" required={true} onChange={handleEmailChange}  />  }
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <VpnKeyIcon style={{height: '100%'}} />
                            </Grid>
                            <Grid item>
                                {!passwordError ? <TextField id="input-with-icon-grid-password" type="password" label="Password" required={true} onChange={handlePasswordChange}/> : <TextField error id="input-with-icon-grid-password-error" type="password" label="Password" required={true} onChange={handlePasswordChange}  /> }
                            </Grid>
                        </Grid>
                    </div>
                    <Button onClick={handleLogin}>
                        Submit
                    </Button>
                </form> :
                <>
                   <Typography className={classes.loadingMsg}>Logging in...</Typography>
                </>}


            </div>
            </div>
        </div>
    );
};

export default LoginDashboard;
