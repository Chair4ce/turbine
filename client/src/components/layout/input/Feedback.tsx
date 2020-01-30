import * as React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Box, Button, TextField} from "@material-ui/core";
import FeedbackIcon from "@material-ui/icons/Feedback";
import {postFeedback} from "../../../store/members/sagas";
import {connect} from "react-redux";
import clsx from "clsx";
import FeedbackModel from "../../../store/members/FeedbackModel";
import {green} from "@material-ui/core/colors";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            position: 'fixed',
            padding: 40,
            bottom: 0,
            justifyContent: 'center',
            left: 40,
        },
        section: {
            backgroundColor: 'inherit',
        },
        feedBackInput: {
            width: '80%',
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
    postFeedback: typeof postFeedback;
}

const FeedbackInput: React.FC<Props> = props => {
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

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = setTimeout(() => {
                setSuccess(true);
                setbtnText("THANK YOU!");
                setLoading(false);
                postFeedback(new FeedbackModel(feedBackMsg));

                setfeedBackMsg("")
            }, 500);
        }
    };

    const handleChange = (e: any) => {
        if (!loading) {
            setSuccess(false);
            setbtnText("SUBMIT");
            setfeedBackMsg(e.target.value);
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
                    InputProps={{
                        startAdornment: <FeedbackIcon/>
                    }}
                    onChange={handleChange}
                    value={feedBackMsg}
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
            <div className={classes.section}>
            </div>
        </div>
    );
};


const mapStateToProps = () => ({});

const mapDispatchToProps = {
    postFeedback,
};
export const ConnectedFeedbackInput = connect(mapStateToProps, mapDispatchToProps)(FeedbackInput);