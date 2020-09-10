import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import TurbineBanner from "../icon/TurbineBanner";
import {ButtonGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {AccountCircle} from "@material-ui/icons";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {useAppContext} from "../../libs/contextLib";
import {History} from 'history';
import {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";

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
    useEffect(() => {

        if(isLoading) {
        const timer = setTimeout(() => {
            userHasAuthenticated(true);
            props.history.push("/")
        }, 3000);
        return () => clearTimeout(timer);
        }
    }, [isLoading]);
    function handleLogin() {
        setIsLoading(true);
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
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="Username" />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <VpnKeyIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="password" />
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