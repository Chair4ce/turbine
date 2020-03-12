import * as React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Box, Button, TextField} from "@material-ui/core";
import clsx from "clsx";
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

interface Props {
    postFeedback: (type: string, data: string | null) => void;
}

const VIEW_CALLBACK_ENUMS = {
    CHILD_FEEDBACK_TASK: 'FEEDBACK/POST_FEEDBACK',
};


const FeedbackInput: React.FC<Props> = props => {
    const classes = useStyles();
    const [success, setSuccess] = React.useState(false);
    const [btnText, setbtnText] = React.useState("SUBMIT");
    const [feedBackMsg, setfeedBackMsg] = React.useState(null);

    const [loading, setLoading] = React.useState(false);
    const timer = React.useRef<number>();

    const buttonClassname = clsx({
        [classes.buttonIdle]: !success,
        [classes.buttonSuccess]: success,
    });

    const handleButtonClick = async() => {
        if (!loading && feedBackMsg !== null) {
            setSuccess(false);
            setLoading(true);
           await submitFeedback();
        }
    };

    const submitFeedback = () => {
        timer.current = setTimeout(() => {
            setLoading(false);
            if (feedBackMsg) props.postFeedback(VIEW_CALLBACK_ENUMS.CHILD_FEEDBACK_TASK, feedBackMsg);
            setSuccess(true);
            setbtnText("THANK YOU!");
            setfeedBackMsg(null);
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
                    value={!feedBackMsg ? "" : feedBackMsg}
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


export default FeedbackInput;

export {
    VIEW_CALLBACK_ENUMS as FEEDBACK_CALLBACK_ENUMS,
};