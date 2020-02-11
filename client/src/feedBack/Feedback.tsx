import * as React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Box, Button, TextField} from "@material-ui/core";
import {postFeedback} from "../dispatchAndState/members/sagas";
import {connect} from "react-redux";
import clsx from "clsx";
import FeedbackModel from "../dispatchAndState/members/FeedbackModel";
import {green} from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 800,
            position: 'relative',
            padding: 40,
            bottom: 0,
            justifyContent: 'center',
            left: 55,


        },
        feedBackInput: {
            width: '80%',
            backgroundColor: 'black',
        },
        buttonSuccess: {
            width: 120,
            position: 'relative',
            top: 12,
            left: 10,
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        buttonIdle: {
            position: 'relative',
            top: 12,
            left: 10,
            width: 120,
        },
        content: {
            display: 'block',
            Height: '100%',
            padding: theme.spacing(3),
        },
    }),
);

interface PropsFromDispatch {
    postFeedback: typeof postFeedback;
}

type AllProps = PropsFromDispatch;

const FeedbackInput: React.FC<AllProps> = props => {
    const classes = useStyles();
    const [success, setSuccess] = React.useState(false);
    const [btnText, setbtnText] = React.useState("SUBMIT");
    const [feedBackMsg, setfeedBackMsg] = React.useState("");

    const [loading, setLoading] = React.useState(false);
    const timer = React.useRef<number>();

    const buttonClassname = clsx({
        [classes.buttonIdle]: !success,
        [classes.buttonSuccess]: success,
    });

    const handleButtonClick = async() => {
        if (!loading && feedBackMsg.length > 0) {
            setSuccess(false);
            setLoading(true);
           await submitFeedback();
        }
    };

    const submitFeedback = () => {
        timer.current = setTimeout(() => {
            setLoading(false);
            postFeedback(new FeedbackModel(feedBackMsg));
            setSuccess(true);
            setbtnText("THANK YOU!");
            setfeedBackMsg("");
        }, 500);
    };

    const handleChange = (e: any) => {
        if (!loading) {
            setfeedBackMsg(e.target.value);
            if (btnText === "THANK YOU!") {
                setbtnText("SUBMIT");
                setSuccess(false);
                setLoading(false);
            }
        }
    };
    return (
        <div className={classes.root}>
            <Box width={1} display={'block'} position={'relative'} top={30} bottom={30}>
                <TextField
                    id="outlined-textarea"
                    className={classes.feedBackInput}
                    label="Send Feedback"
                    placeholder="Enter Feedback here and then click SUBMIT"
                    multiline
                    variant="filled"
                    onChange={handleChange}
                    value={feedBackMsg.length === 0 ? "" : feedBackMsg}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={buttonClassname}
                    disabled={loading}
                    onClick={handleButtonClick}
                >
                    {btnText}
                </Button>
            </Box>
        </div>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    postFeedback,
};
export const ConnectedFeedbackInput = connect(mapStateToProps, mapDispatchToProps)(FeedbackInput);