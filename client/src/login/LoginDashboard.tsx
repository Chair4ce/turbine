import * as React from 'react';
import {useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {AccountCircle} from "@material-ui/icons";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {History} from 'history';
import {Control, LiteralUnion, useForm, useWatch, ValidationRules} from "react-hook-form";
import {OutlinedInput} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import classNames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import {PASSWORD_MIN_LENGTH} from "../store/users/constants";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import TurbineBanner from "../component/icon/TurbineBanner";

interface Props {
    history: History;
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        },
        container: {
            transform: 'translate(50%, -50%)',
            top: '50%',
            right: '50%',
            display: 'block',
            width: '23rem',
            height: '30rem',
            borderRadius: '7px',
            zIndex: 1,
            position: 'absolute',
        },
        loginContainer: {
            transform: 'translate(50%, -50%)',
            top: '50%',
            right: '50%',
            display: 'block',
            width: '23rem',
            height: '22rem',
            borderRadius: '7px',
            zIndex: 1,
            position: 'absolute',
        },
        loginForm: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            padding: 10
        },
        padding: {
            padding: 3,
            height: '100%',
            width: '100%'
        },
        formTitle: {
            fontSize: '23px',
            fontWeight: 'bold',
            textAlign: 'center'
        },
        loadingMsg: {
            fontSize: '22px'
        },
        InputGrp: {
            height: '64px',
            width: '100%'
        },
        textField: {
            height: '100%',
            width: '100%',
            paddingRight: 1,
            background: '#212121'
        },
        submitBtn: {
            borderRadius: 3,
            height: '64px',
            width: '100%',
            background: '#212121',
            border: '1px solid #5a5a5a',
            outline: 'none',
            color: '#66BAE0',
            cursor: 'pointer',
            transition: 'background 200ms',
            '&:hover': {
                background: '#343434'
            }
        },
        errorMsg: {
            height: '205px',
            textAlign: 'left',
            width: '100%',
            color: '#66BAE0',
            paddingLeft: 4
        },
        cancelBtn: {
            color: '#ffffff',
            border: 'none',
            textTransform: 'unset',
        },
        signUpBtn: {
            color: '#ffffff',
            border: 'none',
            textTransform: 'unset',
        },
        btnDisabled: {
            '&:hover': {
                background: '#5d3e3e',
            }
        }
    }),
);

interface IFormInput {
    email: string;
    password: string;
    confirmPassword: string;
};

const LoginDashboard: React.FC<Props> = props => {
    const classes = useStyles();
    // const [values, setValues] = useState({} as InputFieldModel[]);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

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

    const {handleSubmit, register, errors, control, reset, clearErrors} = useForm<IFormInput>();
    const email = useWatch({
        control,
        name: "email", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
        defaultValue: "default" // default value before the render
    });
    const password = useWatch({
        control,
        name: "password", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
        defaultValue: "default" // default value before the render
    });
    const onSubmit = (data: IFormInput) => {

        if (isSigningUp) {
            setIsSigningUp(false);
            setIsLogin(false);
        }
        if (isLogin) {
            setIsSigningUp(false);
            setIsLogin(false);
        }

        console.log(data);
    };

    function handleClickSignUp() {
        clearErrors();
        reset();
        setIsSigningUp(true);
        setIsLogin(false);
    }

    function handleCancel() {
        clearErrors();
        reset();
        setIsSigningUp(false);
        setIsLogin(true);

    }


    function renderError(type: LiteralUnion<keyof ValidationRules, string>) {
        if (type == "required") {
            return "* This field is required"
        } else if (type == "minLength") {
            return `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
        }
        return type
    }

    // function FirstNameWatched({ control }: { control: Control<IFormInput> }) {
    //     const email = useWatch({
    //         control,
    //         name: "email", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    //         defaultValue: "default" // default value before the render
    //     });
    //
    //     return <p>Watch: {email}</p>; // only re-render at the component level, when firstName changes
    // }

    return (
        <div className={classes.root}>
            <TurbineBanner duration={(!isSigningUp && !isLogin) ? "10s" : "200s"}/>
            {isLogin &&
            <div className={classes.loginContainer}>
                <Typography className={classes.formTitle}> Log in
                </Typography>
                <Fade in={isLogin}>
                    <form
                        className={classes.loginForm}
                        onSubmit={handleSubmit(onSubmit)}>

                        <div className={classes.InputGrp}>
                            <FormControl className={classNames(classes.padding)} variant="outlined">

                                <OutlinedInput className={classes.textField} id="outlined-adornment-email"
                                               inputRef={register({required: true, pattern: /\S+@\S+\.\S+/})}
                                               name="email" startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle style={{color: '#66BAE0'}}/>
                                    </InputAdornment>
                                }
                                />

                            </FormControl>
                        </div>

                        <span className={classes.errorMsg}>
                        {errors.email && "* Email is required"}
                        </span>

                        <div className={classes.InputGrp}>
                            <FormControl className={classNames(classes.padding)}
                                         variant="outlined">
                                <OutlinedInput className={classes.textField} id="outlined-adornment-password"
                                               inputRef={register({required: true, minLength: 6, maxLength: 20})}
                                               name="password" type="password" startAdornment={
                                    <InputAdornment position="start">
                                        <VpnKeyIcon style={{color: '#66bae0'}}/>
                                    </InputAdornment>
                                }
                                />
                            </FormControl>
                        </div>
                        <span className={classes.errorMsg}>
                        {errors.password && "* Password is required"}
                        </span>
                        <div className={classes.InputGrp}>
                            <FormControl className={classNames(classes.padding)}
                                         variant="outlined">
                                <input
                                    className={classNames(classes.submitBtn, classes.padding, (!errors.email && !errors.password) && (email.length > 0) ? null : classes.btnDisabled)}
                                    type="submit" disabled={!!errors.email}/>
                            </FormControl>
                        </div>
                        <div className={classes.InputGrp}>
                            <FormControl className={classNames(classes.padding)}
                                         variant="outlined">
                                <Button variant="outlined" className={classNames(classes.signUpBtn)}
                                        onClick={handleClickSignUp}>Sign Up</Button>
                            </FormControl>
                        </div>
                    </form>
                </Fade>
            </div>
            }

            {isSigningUp &&
            <div className={classes.container}>
                <Typography className={classes.formTitle}> Sign Up
                </Typography>
                <Fade in={isSigningUp}>
                    <form
                        className={classes.loginForm}
                        onSubmit={handleSubmit(onSubmit)}>

                        <div className={classes.InputGrp}>
                            <FormControl className={classNames(classes.padding)} variant="outlined">

                                <OutlinedInput className={classes.textField} id="outlined-adornment-email"
                                               inputRef={register({required: true, pattern: /\S+@\S+\.\S+/})}
                                               name="email" startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle style={{color: '#66BAE0'}}/>
                                    </InputAdornment>
                                }
                                />
                            </FormControl>
                        </div>
                        <span className={classes.errorMsg}>
                        {errors.email && "* Email is required"}
                        </span>

                        <div className={classes.InputGrp}>
                            <FormControl className={classNames(classes.padding)} variant="outlined">

                                <OutlinedInput className={classes.textField} id="outlined-adornment-password"
                                               inputRef={register({required: true, minLength: 6, maxLength: 20})}
                                               name="password" type="password" startAdornment={
                                    <InputAdornment position="start">
                                        <VpnKeyIcon style={{color: '#66bae0'}}/>
                                    </InputAdornment>
                                }
                                />
                            </FormControl>
                        </div>
                        <span className={classes.errorMsg}>
                                  {errors.password ? renderError(errors.password.type) : null}
                        </span>

                        <div className={classes.InputGrp}>
                            <FormControl className={classNames(classes.padding)} variant="outlined">

                                <OutlinedInput className={classes.textField} id="outlined-adornment-confirmPassword"
                                               inputRef={register({required: true, minLength: 6, maxLength: 20})}
                                               name="confirmPassword" type="password" startAdornment={
                                    <InputAdornment position="start">
                                        <VpnKeyIcon style={{color: '#66bae0'}}/>
                                    </InputAdornment>
                                }
                                />
                            </FormControl>
                        </div>
                        <span className={classes.errorMsg}>
                            {errors.confirmPassword ? renderError(errors.confirmPassword.type) : null}
                        </span>
                        <div className={classes.InputGrp}>
                            <FormControl className={classNames(classes.padding)} variant="outlined">
                                <input
                                    className={classNames(classes.submitBtn, classes.padding, (!errors.email && !errors.password) && email.length > 0 ? null : classes.btnDisabled)}
                                    type="submit"/>
                            </FormControl>
                        </div>
                        <div className={classes.InputGrp}>
                            <FormControl className={classNames(classes.padding)} variant="outlined">
                                <Button variant="outlined" className={classes.cancelBtn}
                                        onClick={handleCancel}>Cancel</Button>
                            </FormControl>
                        </div>
                    </form>
                </Fade>
            </div>
            }

        </div>
    );
}

export default LoginDashboard;
