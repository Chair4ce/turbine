import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {AccountCircle} from "@material-ui/icons";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {useAppContext} from "../libs/contextLib";
import {History} from 'history';
import InputFieldModel from "../store/users/InputFieldModel";
import {validateEmail} from "./FormValidationRules";
import {Controller, useForm} from "react-hook-form";
import MaterialUIInput from "@material-ui/core/Input";
import {watch} from "fsevents";
import Input from "@material-ui/core/Input";
import theme from "@amcharts/amcharts4/.internal/themes/dark";
import Button from '@material-ui/core/Button';
import {OutlinedInput} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TurbineBanner from "../component/icon/TurbineBanner";
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
            height: '30rem',
            // boxShadow: '0 0 2rem 0 rgba(0, 0, 0, .8)',
            borderRadius: '100%',
            zIndex: 1,
            background: '#212121',
            overflow: 'hidden',
            position: 'absolute',
            '&:before': {
                content: '',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                // boxShadow: 'inset 0 0 2000px rgba(255, 255, 255, .5)',
                filter: 'blur(10px)',
                background: 'inherit',
            },
        },
        loginForm: {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '298px'
        },
        loginBtnGrp: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 170
        },
        margin: {
            margin: 3,
        },
        loadingMsg: {
            fontSize: '22px'
        },
        InputGrp: {
            // display: 'flex',
            // flexDirection: 'row',
            // alignItems: 'center',
            // justifyContent: 'space-around',
            // border: '1px solid #67deea',
            // borderRadius: 3,
            // height: '45px',
            // width: '217px'
        },
        textField: {
            width: '25ch',
        },
        reactBtn: {
            border: '1px solid #66bae0',
            borderRadius: 3,
            height: '56px',
            width: '251px',
            background: 'transparent',
            outline: 'none',
            cursor: 'pointer',
            color: '#ffffff',
            transition: 'background 200ms',
            '&:hover': {
                background: '#66BAE0'
            }
        },
        errorMsg: {
            height: '20px',
            textAlign: 'left',
            width: '251px',
            color: '#66BAE0'
        }
    }),
);

interface IFormInput {
    email: string;
    password: string;
};

const LoginDashboard: React.FC<Props> = props => {
    const classes = useStyles();
    // const [values, setValues] = useState({} as InputFieldModel[]);
    const [isSigningUp, setIsSigningUp] = useState(true);
    //
    //
    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     if (event) event.preventDefault();
    //     setIsSubmitting(true);
    //
    //     return values
    // };
    //
    // // useEffect(() => {
    // //     if (Object.keys(errors).length === 0 && isSubmitting) {
    // //         callback();
    // //     }
    // // }, [errors]);
    //
    // const { userHasAuthenticated } = useAppContext();
    // const [isLoggingIn, setIsLoggingIn] = useState(true);
    // const [isSigningUp, setIsSigningUp] = useState(false);
    //
    //
    // function showSignUpForm() {
    //     setIsLoggingIn(false);
    //     setIsSigningUp(true)
    // }
    //
    // function handleClickCancel() {
    //     setIsSigningUp(false);
    //     setIsLoggingIn(true);
    // }
    //
    // function handleInputChange(event: React.ChangeEvent<HTMLInputElement>, validateFun: (input: string) => { validateStatus: string, errorMsg: string }): void {
    //     event.persist();
    //     let target = event.currentTarget;
    //     let inputName = target.name;
    //     let inputValue = target.value;
    //     let result = validateFun(inputValue);
    //     setValues(state => ({...state, [inputName]: inputValue, ...result}));
    // }

    const {handleSubmit, register, errors, control} = useForm<IFormInput>();
    const onSubmit = (data: IFormInput) => {
        setIsSigningUp(false);
    };


    return (
        <div className={classes.root}>
          <TurbineBanner duration={!isSigningUp ? "40s" : null}/>
            <div className={classes.container}>
                {isSigningUp ?
                <>
                    <form
                        className={classes.loginForm}
                        onSubmit={handleSubmit(onSubmit)}>

                        <div className={classes.InputGrp}>
                            <FormControl className={classNames(classes.margin, classes.textField)} variant="outlined">

                                <OutlinedInput id="outlined-adornment-email" inputRef={register({required: true, pattern: /\S+@\S+\.\S+/})} name="email"  startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle style={{ color: '#66BAE0'}}/>
                                    </InputAdornment>
                                }
                                />
                            </FormControl>
                        </div>
                        <span className={classes.errorMsg}>
                        {errors.email && "* Email is required"}
                        </span>
                        <div className={classes.InputGrp}>
                            <FormControl className={classNames(classes.margin, classes.textField)} variant="outlined">

                            <OutlinedInput id="outlined-adornment-password" inputRef={register({ required: true, minLength: 6, maxLength: 20 })} name="password" type="password" startAdornment={
                                <InputAdornment position="start">
                                    <VpnKeyIcon style={{ color: '#66bae0'}}/>
                                </InputAdornment>
                            }
                            />
                            </FormControl>
                        </div>
                        <span className={classes.errorMsg}>
                        {errors.password && "* Password is required"}
                        </span>
                        <div className={classes.InputGrp}>
                            <FormControl className={classNames(classes.margin, classes.textField)} variant="outlined">

                                <OutlinedInput id="outlined-adornment-confirmPassword" inputRef={register({ required: true, minLength: 6, maxLength: 20 })} name="confirmPassword" type="password" startAdornment={
                                    <InputAdornment position="start">
                                        <VpnKeyIcon style={{ color: '#66bae0'}}/>
                                    </InputAdornment>
                                }
                                />
                            </FormControl>
                        </div>
                        <span className={classes.errorMsg}>
                            {errors.password ? errors.password.type : null
                            // &&
                            // "* Retyping password is required"
                            }
                        </span>
                       <input className={classNames(classes.reactBtn,classes.margin)} type="submit"/>
                    </form>
                </> : null
                }
            </div>
        </div>
    );
}

export default LoginDashboard;
