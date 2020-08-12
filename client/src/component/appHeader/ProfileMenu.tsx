import * as React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
    Button, CircularProgress,
    ClickAwayListener, Container,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Fab, Fade, FormControl,
    Grow,
    IconButton,
    Input, Menu,
    MenuItem,
    MenuList,
    Paper,
    Popper
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import classNames from "classnames";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PublishIcon from "@material-ui/icons/Publish";
// @ts-ignore
import readXlsxFile from "read-excel-file";
import {saveCurrentRoster} from "../../store/members/thunks";
import {green} from "@material-ui/core/colors";
import clsx from "clsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        paper: {
            marginRight: theme.spacing(2),
        },
        paperMenu: {
            zIndex: 4000
        },
        container: {
            boxSizing: 'border-box',
            position: 'absolute',
            width: '100%',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            height: '100%',
        },
        fileDropArea: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 300,
            height: 200,
            border: '2px dashed white',
        },
        input: {},
        fileDropContents: {
            display: 'flex',
            flexDirection: 'column',
        },


        fileDropDialog: {
            padding: 10
        },
        uploadButtonGrp: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
        button: {
            fontWeight: 'bold',
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
            pointerEvents: 'none',
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,

        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        fileDropSuccess: {
            pointerEvents: 'none',
        },
        missingHeaderMsg: {
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        alertIcon: {
            margin: theme.spacing(1),
        },
        buttonLoading: {
            pointerEvents: 'none',
        },
        morDots: {
            marginRight: 4,
            height: 44,
            borderRadius: 4,
            transition: 'background-color 100ms ease-in',
            '&:hover': {
                backgroundColor: 'rgba(119,119,119,0.27)',
            }
        },
        inputArea: {},
        form: {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: 'fit-content',
        },
        formControl: {
            marginTop: theme.spacing(2),
            minWidth: 120,
            justifyContent: 'center',
            alignItems: 'center',
        },
        formControlLabel: {
            marginTop: theme.spacing(1),
        },
        uploadBtnArea: {
            height: 44,
            borderRadius: 4,
            transition: 'background-color 100ms ease-in',
            '&:hover': {
                backgroundColor: 'rgba(119,119,119,0.27)',
            }
        },
        uploadIcon: {},
    }),
);

const schema = {
    'SSAN': {
        prop: 'ssan',
        type: String,
        required: true
    },
    'FULL_NAME': {
        prop: 'fullName',
        type: String,
        required: true
        // Excel stores dates as integers.
        // E.g. '24/03/2018' === 43183.
        // Such dates are parsed to UTC+0 timezone with time 12:00 .
    },
    'GRADE': {
        prop: 'grade',
        type: String,
        required: false
    },
    'ASSIGNED_PAS': {
        prop: 'assignedPas',
        type: String,
        required: false
    },
    'OFFICE_SYMBOL': {
        prop: 'officeSymbol',
        type: String,
        required: false
    },
    'DUTY_TITLE': {
        prop: 'dutyTitle',
        type: String,
        required: false
    },
    'DUTY_START_DATE': {
        prop: 'dutyStartDate',
        type: Date,
        required: false
    },
    'DOR': {
        prop: 'dor',
        type: Date,
        required: false
    },
    'DAFSC': {
        prop: 'dafsc',
        type: String,
        required: false
    },
    'PAFSC': {
        prop: 'pafsc',
        type: String,
        required: false
    },
    'DATE_ARRIVED_STATION': {
        prop: 'dateArrivedStation',
        type: Date,
        required: false
    },
    'DOS': {
        prop: 'dos',
        type: Date,
        required: false
    },
    'RNLTD': {
        prop: 'rnltd',
        type: Date,
        required: false
    },
    'SUPV_NAME': {
        prop: 'supvName',
        type: String,
        required: false
    },
    'SUPV_BEGIN_DATE': {
        prop: 'supvBeginDate',
        type: Date,
        required: false
    },
    'DEROS': {
        prop: 'deros',
        type: Date,
        required: false
    }
}

interface Props {
    loading: boolean;
}

export const ProfileMenu: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('xs');
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const browseInputRef: any = React.createRef();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const opens = Boolean(anchorEl);
    const [success, updateSuccess] = useState(false);
    const loading = useSelector(({positions}: ApplicationState) => positions.loading);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuSelect = () => {
        setAnchorEl(null);
        handleShowUploadModal();
    };

    const handleShowUploadModal = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleButtonClick = (e: any) => {
        handleFile(e);
    };


    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
        [classes.buttonLoading]: loading,
    });

    const FileDropClassname = clsx({
        [classes.fileDropSuccess]: success,
        [classes.buttonLoading]: loading,
    });


    function handleFile(e: HTMLInputElement) {
        if (e.files) {
            const data = readXlsxFile(e.files[0], {
                schema, transformData(data: any) {
                    return data.splice(2, data.length - 3)
                }
            }).then(((rows: any, errors: any) => {
                if (errors) {

                    updateSuccess(false);
                } else {
                    dispatch(saveCurrentRoster(rows.rows));
                    updateSuccess(true);
                }
                ;
            }));
        }
        handleClose();
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    // const handleClose = (event: React.MouseEvent<EventTarget>) => {
    //     if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
    //         return;
    //     }
    //
    //     setOpen(false);
    // };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <React.Fragment>
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">Upload Alpha Roster</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Compatable file type: '.xlsx'
                        </DialogContentText>
                        <form className={classes.form} noValidate>
                            <FormControl className={classes.formControl}>
                                <input className={classes.inputArea} type="file" id="raised-button-file"
                                       style={{display: 'none'}} onChange={(e) => {
                                    const {target} = e;
                                    if (target.value.length > 0) {
                                        handleFile(e.target)
                                    }
                                }}
                                       ref={browseInputRef}/>

                                <div className={classes.root}>
                                    <Container className={classNames(classes.fileDropArea, FileDropClassname)}
                                               onDragEnter={(e: any) => {
                                                   let evt = e as Event;
                                                   evt.preventDefault();
                                               }}
                                               onDragOver={(e: any) => {
                                                   let evt = e as Event;
                                                   evt.preventDefault();
                                               }}
                                               onDrop={handleButtonClick}
                                    >

                                        <label htmlFor="raised-button-file" className={classes.fileDropContents}>
                                            {(loading || success) &&
                                            <div className={classes.wrapper}>
                                                <Fab
                                                    aria-label="save"
                                                    color="primary"
                                                    className={buttonClassname}
                                                >
                                                    {success ? <CheckIcon/> : <SaveIcon/>}
                                                </Fab>
                                                {(loading) &&
                                                <CircularProgress size={68} className={classes.fabProgress}/>}
                                            </div>
                                            }

                                            {(!loading && !success) && <div className={classes.uploadButtonGrp}>
                                                <CloudUploadOutlinedIcon color={"primary"} fontSize={"large"}
                                                                         className={classes.uploadIcon}/>
                                                <span id="simple-modal-dialog"
                                                      className={classes.fileDropDialog}>Do not Drag and Drop</span>
                                                < Button variant={"outlined"} component={"span"}
                                                         className={classes.button}>
                                                    Please Browse
                                                </Button>
                                            </div>}
                                        </label>
                                    </Container>

                                </div>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            <Button className={classes.morDots} aria-controls="fade-menu" aria-haspopup="true"
                    onClick={handleClick}>
                <MoreVertIcon/>
            </Button>

            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={opens}
                onClose={handleMenuClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleMenuSelect}>
                    <PublishIcon color={"action"}/>Upload</MenuItem>
            </Menu>
            {/*<div>*/}
            {/*    <IconButton*/}
            {/*        ref={anchorRef}*/}
            {/*        aria-controls={open ? 'menu-list-grow' : undefined}*/}
            {/*        aria-haspopup="true"*/}
            {/*        onClick={handleToggle}*/}
            {/*    >*/}
            {/*        <AccountCircleIcon fontSize={"small"}/>*/}
            {/*    </IconButton>*/}
            {/*    <Popper className={classes.paperMenu} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement={"left-end"}>*/}
            {/*        {({ TransitionProps, placement }) => (*/}
            {/*            <Grow*/}
            {/*                {...TransitionProps}*/}
            {/*                style={{ transformOrigin: placement === 'bottom' ? 'left' : 'left' }}*/}
            {/*            >*/}
            {/*                <Paper >*/}
            {/*                    <ClickAwayListener onClickAway={handleClose}>*/}
            {/*                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>*/}
            {/*                            <MenuItem onClick={handleClose}>*/}
            {/*                                <Input /> UPMR</MenuItem>*/}
            {/*                            /!*<MenuItem onClick={handleClose}>My account</MenuItem>*!/*/}
            {/*                            /!*<MenuItem onClick={handleClose}>Logout</MenuItem>*!/*/}
            {/*                        </MenuList>*/}
            {/*                    </ClickAwayListener>*/}
            {/*                </Paper>*/}
            {/*            </Grow>*/}
            {/*        )}*/}
            {/*    </Popper>*/}
            {/*</div>*/}
        </div>
    );
}

export default ProfileMenu;