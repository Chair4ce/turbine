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
import {connect} from "react-redux";
import {postFeedback} from "../../store/members/sagas";
import {Box, Container, ListItem, ListItemIcon, ListItemText, Zoom} from "@material-ui/core";
import MemberModel from "../../store/members/MemberModel";
import EditTable from "../table/EditTable";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GroupIcon from '@material-ui/icons/Group';
import CloseIcon from '@material-ui/icons/Close';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PowerIcon from '@material-ui/icons/Power';
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
            justifyContent: 'space around',
            Height: '100%',
            padding: theme.spacing(3),
            top: 80,
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        gainTableOff: {
            display: 'none'
        },
        alphaTableOff: {
            display: 'none'
        },
        lossTableOff: {
            display: 'none'
        },
    }),
);

interface PropsFromState {
    members: MemberModel[];
    loading: boolean;
    className?: string;
}

interface PropsFromDispatch {
    postFeedback: typeof postFeedback;
}


type AllProps = PropsFromDispatch & PropsFromState;

// const tableOrder: TableOrder = TableOrder[{gain: 1},{alpha: 2},{loss: 3}];

const NavDrawer: React.FC<AllProps> = props => {
    const classes = useStyles();
    const theme = useTheme();



    const [open, setOpen] = React.useState(false);
    const [alphaTable, showAlphaTable] = React.useState(false);
    const [gainTable, showGainTable] = React.useState(false);
    const [lossTable, showLossTable] = React.useState(false);
    const [alphaTableOrder, setAlphaTableOrder] = React.useState(2);
    const [gainTableOrder, setGainTableOrder] = React.useState(1);
    const [lossTableOrder, setLossTableOrder] = React.useState(3);

    const gainTableClassname = clsx({
        [classes.gainTableOff]: !gainTable,
    });
    const alphaTableClassname = clsx({
        [classes.alphaTableOff]: !alphaTable,
    });
    const lossTableClassname = clsx({
        [classes.lossTableOff]: !lossTable,
    });


    const handleAlphaBtnClick = () => {
        handleTableOrder("alpha");
        showAlphaTable(true)
    };
    const handleGainBtnClick = () => {
        handleTableOrder("gain");
        showGainTable(true)
    };

    const handleLossBtnClick = () => {
        handleTableOrder("loss");
        showLossTable(true)
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
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
                    {/*<ListItem button>*/}
                    {/*    <ListItemIcon>{<FiberNewIcon/>}</ListItemIcon>*/}
                    {/*    <ListItemText primary="Members"/>*/}
                    {/*</ListItem>*/}
                    <ListItem button onClick={handleGainBtnClick}>
                        <ListItemIcon>{<GroupAddIcon/>}</ListItemIcon>
                        <ListItemText primary="In Processing"/>
                    </ListItem>
                    <ListItem button onClick={handleAlphaBtnClick}>
                        <ListItemIcon>{<GroupIcon/>}</ListItemIcon>
                        <ListItemText primary="Alpha Roster"/>
                    </ListItem>
                    <ListItem button onClick={handleLossBtnClick}>
                        <ListItemIcon>{<PeopleOutlineIcon/>}</ListItemIcon>
                        <ListItemText primary="Loss Roster"/>
                    </ListItem>
                    {/*{['Members', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
                    {/*    <ListItem button key={text}>*/}
                    {/*        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>*/}
                    {/*        <ListItemText primary={text}/>*/}
                    {/*    </ListItem>*/}
                    {/*))}*/}
                </List>
                <Divider/>
                <ListItem button onClick={handleLossBtnClick}>
                    <ListItemIcon>{<PowerIcon/>}</ListItemIcon>
                    <ListItemText primary="Man Power Positions"/>
                </ListItem>
                {/*<List>*/}
                {/*    {['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
                {/*        <ListItem button key={text}>*/}
                {/*            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>*/}
                {/*            <ListItemText primary={text}/>*/}
                {/*        </ListItem>*/}
                {/*    ))}*/}
                {/*</List>*/}
            </Drawer>
            <Container className={classes.content}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'space-around'}>
                    {!props.loading &&  <Zoom in={gainTable} style={{transitionDelay: gainTable ? '100ms' : '0ms'}}>
                        <Box component={'div'} paddingBottom={10} order={gainTableOrder} className={gainTableClassname}>
                        <CloseIcon onClick={() => {showGainTable(false)}} cursor={'pointer'}/>
                        <EditTable members={props.members} loading={props.loading} title={"In Processing"}/>
                        </Box>
                        </Zoom> }

                    {!props.loading &&
                    <Zoom in={alphaTable} style={{transitionDelay: alphaTable ? '100ms' : '0ms'}}>
                        <Box component={'div'} paddingBottom={10} order={alphaTableOrder}
                             className={alphaTableClassname}>
                            <CloseIcon onClick={() => {
                                showAlphaTable(false)
                            }} cursor={'pointer'}/>
                            <EditTable members={props.members} loading={props.loading} title={"Alpha Roster"}/>
                        </Box>
                    </Zoom>
                    }
                    {!props.loading &&
                    <Zoom in={lossTable} style={{transitionDelay: alphaTable ? '100ms' : '0ms'}}>
                        <Box component={'div'} paddingBottom={10} order={lossTableOrder}
                             className={lossTableClassname}>
                            <CloseIcon onClick={() => {
                                showLossTable(false)
                            }} cursor={'pointer'}/>
                            <EditTable members={props.members} loading={props.loading} title={"Loss Roster"}/>
                        </Box>
                    </Zoom>
                    }
                </Box>
            </Container>
        </div>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    postFeedback,
};
export const ConnectedNavDrawer = connect(mapStateToProps, mapDispatchToProps)(NavDrawer);





