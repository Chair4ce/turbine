import React, {useEffect} from 'react';
import clsx from 'clsx';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
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
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {useDispatch, useSelector} from "react-redux";
import {Box, Container, Fade, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,} from "@material-ui/core";
import AlphaRosterTable from "../../component/materialTable/AlphaRosterTable";
import GroupIcon from '@material-ui/icons/Group';
import EmojiEventsOutlinedIcon from '@material-ui/icons/EmojiEventsOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import {ApplicationState} from "../../store";
import SpeedDialBtn, {CALLBACK_ENUMS} from "../../component/speedDialMenu/SpeedDialBtn";
import VerticalLinearStepper from "../../component/speedDialMenu/actions/VerticalLinearStepper";
import {toggleUploadModal} from "../../store/modals";
import FeedbackInput, {FEEDBACK_CALLBACK_ENUMS} from "../../component/feedBack/Feedback";
import GainingTable from "../../component/materialTable/GainingTable";
import {getMembers, postFeedback} from "../../store/members/thunks";
import SquadronTaskTable from "../../component/materialTable/SquadronTaskTable";
import {getSquadronTaskDetails} from "../../store/squadronTasks/thunks";
import {getSquadrons} from "../../store/squadrons/thunks";
import {getGainingMembers} from "../../store/gaining/thunks";




const MemberDashboard: React.FC = () => {

    const showUploadModal = useSelector(({showModal}: ApplicationState) => showModal.uploadModal);
    const members = useSelector(({members}: ApplicationState) => members.data);
    const gaining = useSelector(({gaining}: ApplicationState) => gaining.data);
    const memberLoading = useSelector(({members}: ApplicationState) => members.loading);
    const gainingLoading = useSelector(({gaining}: ApplicationState) => gaining.loading);
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [gainTable, showGainTable] = React.useState(false);
    const [alphaTable, showAlphaTable] = React.useState(false);
    const [taskTable, showTaskTable] = React.useState(false);

    useEffect(() => {
        dispatch(getSquadronTaskDetails());
        dispatch(getMembers());
        dispatch(getSquadrons());
        dispatch(getGainingMembers());
    }, [dispatch]);


    const handleAlphaBtnClick = () => {
        showAlphaTable(prev => !prev);
        showGainTable(false);
        showTaskTable(false);
    };
    const handleGainBtnClick = () => {
        showGainTable(prev => !prev);
        showAlphaTable(false);
        showTaskTable(false);
    };
    const handleTaskBtnClick = () => {
        showTaskTable(prev => !prev);
        showGainTable(false);
        showAlphaTable(false);
    };

    const handleDrawerOpen = () => {
        setOpen(prev => !prev);
    };

    const handleDrawerClose = () => {
        setOpen(prev => !prev);
    };

   const callbackHandler = (type: string, data?: any) => {
        switch(type) {
            case CALLBACK_ENUMS.CHILD_TOGGLE_UPLOAD:
                dispatch(toggleUploadModal(data));
                break;
            case CALLBACK_ENUMS.CHILD_TOGGLE_TASK:
                break;
            case FEEDBACK_CALLBACK_ENUMS.CHILD_FEEDBACK_TASK:
                dispatch(postFeedback(data));
                break;
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
                    <ListItemSecondaryAction>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            // onClick={handleDrawerOpen}
                            edge="end">
                            <AccountCircleOutlinedIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
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
                    <ListItem button onClick={handleGainBtnClick} className={clsx( {
                        [classes.selected]: gainTable,
                        [classes.unselected]: !gainTable,
                    })}>
                        <ListItemIcon>{<GroupAddIcon/>}</ListItemIcon>
                        <ListItemText primary="In Processing"/>
                    </ListItem>
                    <ListItem button onClick={handleAlphaBtnClick} className={clsx( {
                        [classes.selected]: alphaTable,
                        [classes.unselected]: !alphaTable,
                    })}>
                        <ListItemIcon>{<GroupIcon/>}</ListItemIcon>
                        <ListItemText primary="Alpha Roster"/>
                    </ListItem>
                    {/*<ListItem button onClick={handleLossBtnClick} className={clsx( {*/}
                    {/*    [classes.selected]: lossTable,*/}
                    {/*    [classes.unselected]: !lossTable,*/}
                    {/*})}>*/}
                    {/*    <ListItemIcon>{<PeopleOutlineIcon/>}</ListItemIcon>*/}
                    {/*    <ListItemText primary="Loss Roster"/>*/}
                    {/*</ListItem>*/}
                </List>
                <Divider/>
                {/*<ListItem button>*/}
                {/*    <ListItemIcon>{<PowerIcon/>}</ListItemIcon>*/}
                {/*    <ListItemText primary="Positions"/>*/}
                {/*</ListItem>*/}

                {/*<ListItem button>*/}
                {/*    <ListItemIcon>{<DirectionsRunIcon/>}</ListItemIcon>*/}
                {/*    <ListItemText primary="Fitness"/>*/}
                {/*</ListItem>*/}
                {/*<ListItem button>*/}
                {/*    <ListItemIcon>{<DescriptionOutlinedIcon/>}</ListItemIcon>*/}
                {/*    <ListItemText primary="Evaluations"/>*/}
                {/*</ListItem>*/}
                <ListItem button onClick={handleTaskBtnClick} className={clsx( {
                        [classes.selected]: taskTable,
                        [classes.unselected]: !taskTable,})}>
                    <ListItemIcon>{<EmojiEventsOutlinedIcon/>}</ListItemIcon>
                    <ListItemText primary="Awards & Decs"/>
                </ListItem>
                {/*<ListItem button>*/}
                {/*    <ListItemIcon>{<SupervisorAccountOutlinedIcon/>}</ListItemIcon>*/}
                {/*    <ListItemText primary="Supervisors"/>*/}
                {/*</ListItem>*/}
            </Drawer>
                <SpeedDialBtn
                    callbackHandler={callbackHandler}
                />
            <Container className={classes.content}>
                {showUploadModal &&
                <VerticalLinearStepper/>
                }
                <Box display={'flex'} flexDirection={'column'} height={'100%'}
                     position={'relative'}>
                    {gainTable &&
                    <Fade in={gainTable} >
                        <Box className={classes.table}>
                            <GainingTable
                                gaining={gaining}
                                loading={gainingLoading}
                                title={"Gaining"}
                                filtering={true}
                                edit={true}
                                grouping={true}
                                search={true}
                                selection={true}
                                exportButton={true}
                            />
                        </Box>
                    </Fade>
                    }
                    {alphaTable &&
                    <Fade in={alphaTable}>
                        <Box className={classes.table}>
                    <AlphaRosterTable
                        members={members}
                        loading={memberLoading}
                        title={"Alpha Roster"}
                        edit={false}
                        filtering={true}
                        grouping={true}
                        search={true}
                        selection={false}
                        exportButton={false}
                        // className={alphaTableClassname}
                    />
                        </Box>
                    </Fade>
                    }
                    {taskTable &&
                    <Fade in={taskTable}>
                        <Box className={classes.table}>
                            <SquadronTaskTable
                                title={"Awards And Decorations"}
                                edit={true}
                                filtering={true}
                                grouping={true}
                                search={true}
                                selection={false}
                                exportButton={true}
                                // className={alphaTableClassname}
                            />
                        </Box>
                    </Fade>
                    }
                    {/*{lossTable &&*/}
                    {/*<Grow in={lossTable}>*/}
                    {/*    <Box order={lossTableOrder} className={classes.table}>*/}
                    {/*<EditTable*/}
                    {/*    members={props.members}*/}
                    {/*    loading={props.loading}*/}
                    {/*    title={"Loss Roster"}*/}
                    {/*/>*/}
                    {/*    </Box>*/}
                    {/*</Grow>*/}
                    {/*}*/}
                </Box>
                <FeedbackInput postFeedback={callbackHandler}/>
            </Container>
        </div>
    );
};

export default MemberDashboard;

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            height: '100%',
            top: 120,
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
        content: {
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'space-around',
            Height: '100%',
            maxWidth: 'none',
            minWidth: 200,
            paddingLeft: 8,
            paddingRight: 8,
            top: 73,
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        selected: {
            backgroundColor: '#DD7373',
            '&:hover': {
                background: "#ff8585",
            },
            // opacity: '.8',
        },
        unselected: {

        },
        table: {
            width: '100%',
            minWidth: 300,
            marginBottom: 20,
        },
        gainTableDisplay: {
            display: 'none'
        },
        lossTableDisplay: {
            display: 'none'
        },
        alphaTableDisplay: {
            display: 'none'
        },
        taskTableDisplay: {
            display: 'none'
        },
        csvInput: {
            background: 'black',
            width: 700,
            height: 700,
            top: 200,
            left: 400,
        },
    }),
);






