import React from 'react';
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
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {connect} from "react-redux";
import {postFeedback} from "../dispatchAndState/members/sagas";
import {Box, Container, Grow, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,} from "@material-ui/core";
import MemberModel from "../dispatchAndState/members/MemberModel";
import EditTable from "../memberTable/EditTable";
// import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GroupIcon from '@material-ui/icons/Group';
// import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PowerIcon from '@material-ui/icons/Power';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import EmojiEventsOutlinedIcon from '@material-ui/icons/EmojiEventsOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import {ApplicationState} from "../dispatchAndState";
import {ConnectedFeedbackInput} from "../feedBack/Feedback";
import {squadronsFetchRequest} from "../dispatchAndState/squadrons";
import SpeedDialBtn from "../speedDialMenu/SpeedDialBtn";
import {ConnectedVerticalLinearStepper} from "../speedDialMenu/actions/VerticalLinearStepper";
import SquadronModel from "../dispatchAndState/squadrons/SquadronModel";
import {setCSVModalDisplay} from "../dispatchAndState/modals";

interface PropsFromState {
    members: MemberModel[];
    squadrons: SquadronModel[];
    loading: boolean;
    csvInputModal: boolean;
    className?: string;
}

interface PropsFromDispatch {
    postFeedback: typeof postFeedback;
    squadronsFetchRequest: typeof squadronsFetchRequest;
    setCSVModalDisplay: typeof setCSVModalDisplay;
}

function renderUploadStepper(handleFetch: any, toggleCSVInputModal: any ) {
    return (
        <ConnectedVerticalLinearStepper
            toggleCSVInputModal={toggleCSVInputModal}
            fetchSquadrons={handleFetch}
        />
    )
}


type AllProps = PropsFromDispatch & PropsFromState;

const MemberTableContainer: React.FC<AllProps> = props => {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [gainTable, showGainTable] = React.useState(false);
    const [alphaTable, showAlphaTable] = React.useState(false);
    // const [lossTable, showLossTable] = React.useState(false);
    const [alphaTableOrder, setAlphaTableOrder] = React.useState(2);
    const [gainTableOrder, setGainTableOrder] = React.useState(1);
    const [lossTableOrder, setLossTableOrder] = React.useState(3);
    const [showCSVInputModal, setShowCSVInputModal] = React.useState(false);

    const handleAlphaBtnClick = () => {
        handleTableOrder("alpha");
        showAlphaTable(prev => !prev)
    };
    const handleGainBtnClick = () => {
        handleTableOrder("gain");
        showGainTable(prev => !prev)
    };

    // const handleLossBtnClick = () => {
    //     handleTableOrder("loss");
    //     showLossTable(prev => !prev)
    // };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const toggleCSVInputModal = () => {
        props.setCSVModalDisplay(!props.csvInputModal);
        console.log("triggered");
    };

    const handleTableOrder = (table: string) => {
        switch (table) {
            case "alpha": {
                setAlphaTableOrder(1);
                setGainTableOrder(gainTableOrder + 1);
                setLossTableOrder(lossTableOrder + 1);
                break;
            }
            case "gain": {
                setGainTableOrder(1);
                setAlphaTableOrder(alphaTableOrder + 1);
                setLossTableOrder(lossTableOrder + 1);
                break;
            }
            case "loss": {
                setLossTableOrder(1);
                setAlphaTableOrder(alphaTableOrder + 1);
                setGainTableOrder(gainTableOrder + 1);
                break;
            }
            default: {
                break;
            }
        }
    };

    function handleFetch() {
        squadronsFetchRequest();
    }

    // onRowAdd: newData =>
    //     new Promise(resolve => {
    //         setTimeout(() => {
    //             resolve();
    //             setState(prevState => {
    //                 const data = [...prevState.data];
    //                 data.push(newData);
    //                 return { ...prevState, data };
    //             });
    //         }, 300);
    //     })

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
                    {/*<ListItem button onClick={handleGainBtnClick} className={clsx( {*/}
                    {/*    [classes.selected]: gainTable,*/}
                    {/*    [classes.unselected]: !gainTable,*/}
                    {/*})}>*/}
                    {/*    <ListItemIcon>{<GroupAddIcon/>}</ListItemIcon>*/}
                    {/*    <ListItemText primary="In Processing"/>*/}
                    {/*</ListItem>*/}
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
                <ListItem button>
                    <ListItemIcon>{<PowerIcon/>}</ListItemIcon>
                    <ListItemText primary="Positions"/>
                </ListItem>

                <ListItem button>
                    <ListItemIcon>{<DirectionsRunIcon/>}</ListItemIcon>
                    <ListItemText primary="Fitness"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>{<DescriptionOutlinedIcon/>}</ListItemIcon>
                    <ListItemText primary="Evaluations"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>{<EmojiEventsOutlinedIcon/>}</ListItemIcon>
                    <ListItemText primary="Awards & Decs"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>{<SupervisorAccountOutlinedIcon/>}</ListItemIcon>
                    <ListItemText primary="Supervisors"/>
                </ListItem>
                <SpeedDialBtn
                    toggleCSVInputModal={toggleCSVInputModal}
                />
            </Drawer>
            <Container className={classes.content}>
                {props.csvInputModal &&
                   renderUploadStepper(handleFetch, toggleCSVInputModal)
                // <ConnectedCsvInput
                //     toggleCSVInputModal={toggleCSVInputModal}/>
                }
                <Box display={'flex'} flexDirection={'column'} height={'100%'}
                     position={'relative'}>
                    {/*{gainTable &&*/}
                    {/*<Grow in={gainTable}>*/}
                    {/*    <Box order={gainTableOrder} className={classes.table}>*/}
                    {/*        <EditTable*/}
                    {/*            members={props.members}*/}
                    {/*            loading={props.loading}*/}
                    {/*            title={"In Processing"}*/}
                    {/*            filtering={true}*/}
                    {/*            grouping={true}*/}
                    {/*            search={true}*/}
                    {/*            selection={true}*/}
                    {/*            exportButton={true}*/}
                    {/*        />*/}
                    {/*    </Box>*/}
                    {/*</Grow>*/}
                    {/*}*/}
                    {alphaTable &&
                    <Grow in={alphaTable}>
                        <Box order={alphaTableOrder} className={classes.table}>
                    <EditTable
                        members={props.members}
                        loading={props.loading}
                        title={"Alpha Roster"}
                        filtering={true}
                        grouping={true}
                        search={true}
                        selection={true}
                        exportButton={true}
                        // className={alphaTableClassname}
                    />
                        </Box>
                    </Grow>
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
                <ConnectedFeedbackInput/>

            </Container>
        </div>
    );
};

const mapStateToProps = ({showModal, squadrons, members}: ApplicationState) => ({
    csvInputModal: showModal.csvInput,
    squadrons: squadrons.squadrons,
    members: members.data,
    loading: members.loading
});

const mapDispatchToProps = {
    postFeedback, squadronsFetchRequest, setCSVModalDisplay
};
export const ConnectedMemberTableContainer = connect(mapStateToProps, mapDispatchToProps)(MemberTableContainer);

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
            // opacity: '.8',
        },
        unselected: {

        },
        table: {
            width: '100%',
            minWidth: 200,
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
        csvInput: {
            background: 'black',
            width: 700,
            height: 700,
            top: 200,
            left: 400,
        },
    }),
);






