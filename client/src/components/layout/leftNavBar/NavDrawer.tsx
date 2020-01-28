import React from 'react';
import clsx from 'clsx';
import {createStyles, makeStyles, useTheme, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MemberModel from "../../../store/members/MemberModel";
import LoadingSpinner from "../../data/LoadingSpinner";
import {Box, Button, TextField} from "@material-ui/core";
import FeedbackIcon from '@material-ui/icons/Feedback';
import {green} from "@material-ui/core/colors";
import {connect} from "react-redux";
import {ConnectedEditMemberTable} from "../../table/MaterialTable";
import FeedbackModel from "../../../store/members/FeedbackModel";
import {postFeedback} from "../../../store/members/sagas";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            height: '100%',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            display: 'block',
            Height: '100%',
            padding: theme.spacing(3),
        },
        loadingSpinner: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
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
        }
    }),
);

interface PropsFromState {
    members: MemberModel[];
    loading: boolean
    className?: string;
}

interface PropsFromDispatch {
    postFeedback: typeof postFeedback;
}

type AllProps = PropsFromDispatch & PropsFromState;

const NavDrawer: React.FC<AllProps> = props => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [btnText, setbtnText] = React.useState("SUBMIT");
    const [feedBackMsg, setfeedBackMsg] = React.useState("");
    const timer = React.useRef<number>();

    const buttonClassname = clsx({
        [classes.buttonIdle]: !success,
        [classes.buttonSuccess]: success,
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = setTimeout(() => {
                setSuccess(true);
                setbtnText("THANK YOU!");
                setLoading(false);
                postFeedback(new FeedbackModel(feedBackMsg));
                console.log("FeedBack Submitted: " + feedBackMsg);
                setfeedBackMsg("")
            }, 2000);
        }
    };

    const handleChange = (e: any) => {
        if (!loading) {
            setfeedBackMsg(e.target.value);
        }
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Turbine
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>

                <h1>Welcome to the Turbine Demo! Don't forget to leave feedback!</h1>
                {props.loading ? (
                    <Box component={'div'} className={classes.loadingSpinner}>
                        <LoadingSpinner/>
                    </Box>
                ) : (props.members!.length > 0 && (<ConnectedEditMemberTable
                    members={props.members}
                />))}
                <Box width={1} display={'block'} position={'relative'} top={30} bottom={30}>

                    <TextField
                        id="outlined-textarea"
                        className={classes.feedBackInput}
                        label="Send Feedback"
                        placeholder="Enter Feedback here and then click SUBMIT"
                        multiline
                        variant="outlined"
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

            </main>
        </div>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  postFeedback,
};
export const ConnectedNavDrawer = connect(mapStateToProps, mapDispatchToProps)(NavDrawer);





