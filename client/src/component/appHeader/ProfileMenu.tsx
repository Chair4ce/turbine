import * as React from "react";
import {useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle,
    Fab,
    Fade,
    FormControl,
    Menu,
    MenuItem
} from "@material-ui/core";
import classNames from "classnames";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PublishIcon from "@material-ui/icons/Publish";
// @ts-ignore
import readXlsxFile from "read-excel-file";
import {green} from "@material-ui/core/colors";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {savePositions} from "../../store/positions/thunks";
import {FullScreenDialog} from "./UploadModal";

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
    'PASCODE': {
        prop: 'pasCode',
        type: String,
        required: true
    },
    'ORGN_STRUCT_ID': {
        prop: 'orgStructureId',
        type: String,
        required: false
        // Excel stores dates as integers.
        // E.g. '24/03/2018' === 43183.
        // Such dates are parsed to UTC+0 timezone with time 12:00 .
    },
    'AFSC_AUTH': {
        prop: 'afscAuth',
        type: String,
        required: false
    },
    'GRD_AUTH': {
        prop: 'grdAuth',
        type: String,
        required: false
    },
    'CURR_QTR': {
        prop: 'currQtr',
        type: String,
        required: false
    },
    'PROJ_QTR1': {
        prop: 'projQtr1',
        type: String,
        required: false
    },
    'PROJ_QTR2': {
        prop: 'projQtr2',
        type: String,
        required: false
    },
    'PROJ_QTR3': {
        prop: 'projQtr3',
        type: String,
        required: false
    },
    'PROJ_QTR4': {
        prop: 'projQtr4',
        type: String,
        required: false
    },
    'POS_NR': {
        prop: 'posNr',
        type: String,
        required: false
    },
    'GR_ASGN': {
        prop: 'gradeAssigned',
        type: String,
        required: false
    },
    'DAFSC': {
        prop: 'dafscAssigned',
        type: String,
        required: false
    },
    'NAME': {
        prop: 'nameAssigned',
        type: String,
        required: false
    },
    'SSAN': {
        prop: 'mbrIdAssigned',
        type: String,
        required: false
    },
    //Alternate Misc Column Spellings/chars
    'CURR QTR': {
        prop: 'currQtr',
        type: String,
        required: false
    },
    'PROJ QTR1': {
        prop: 'projQtr1',
        type: String,
        required: false
    },
    'PROJ QTR2': {
        prop: 'projQtr2',
        type: String,
        required: false
    },
    'PROJ QTR3': {
        prop: 'projQtr3',
        type: String,
        required: false
    },
    'PROJ QTR4': {
        prop: 'projQtr4',
        type: String,
        required: false
    }
}

export const ProfileMenu: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('xs');
    const [open, setOpen] = React.useState(false);
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
                    dispatch(savePositions(rows.rows));
                    updateSuccess(true);
                }
            }));
        }
        handleClose();
    }

    // const handleClose = (event: React.MouseEvent<EventTarget>) => {
    //     if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
    //         return;
    //     }
    //
    //     setOpen(false);
    // };

    // return focus to the button when we transitioned from !open -> open
    // const prevOpen = React.useRef(open);
    // React.useEffect(() => {
    //     if (prevOpen.current === true && open === false) {
    //         anchorRef.current!.focus();
    //     }
    //
    //     prevOpen.current = open;
    // }, [open]);

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
                    <DialogTitle id="max-width-dialog-title">Upload UPMR</DialogTitle>
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
                    <PublishIcon color={"action"}/>Upload UPMR</MenuItem>
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