import * as React from "react";
import {useState} from "react";
import classNames from "classnames";
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';
import {ROSTER_MENU_SELECT_ACTION} from "../menus/RosterMenu";
import PublishIcon from '@material-ui/icons/Publish';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
// @ts-ignore
import readXlsxFile from "read-excel-file";
import {
    Button, CircularProgress, Container,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle, Fab,
    Fade, FormControl, FormControlLabel, InputLabel,
    Menu,
    MenuItem, Select, Switch
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {green} from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            zIndex: 1500,
            outline: 'none',
            margin: 6,
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

        uploadIcon: {},
        fileDropDialog: {
            padding: 10,
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
            width: 5,
            height: 34,
        },
        inputArea: {

        },
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
    }),
);

interface Props {
    callback: (type: string) => void;
    className?: string;
}

const schema = {
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

    // 'COURSE' is not a real Excel file column name,
    // it can be any string — it's just for code readability.
}

const ProjectedRosterPanel: React.FC<Props> = props => {
    const [fileData, updateFileData] = useState();
    const classes = useStyles();
    const browseInputRef: any = React.createRef();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const opens = Boolean(anchorEl);
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
    const [success, updateSuccess] = useState(false);
    const [loading, updateLoading] = useState(false);

    // const loading = useSelector(({importChanges}: ApplicationState) => importChanges.loading);
    // const success = useSelector(({importChanges}: ApplicationState) => importChanges.success);


    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
        [classes.buttonLoading]: loading,
    });

    const FileDropClassname = clsx({
        [classes.fileDropSuccess]: success,
        [classes.buttonLoading]: loading,
    });

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSelectUpload = () => {
        setAnchorEl(null);
        handleClickUploadModalOpen();
    };

    const handlePanelClose = () => {
        props.callback(ROSTER_MENU_SELECT_ACTION.TOGGLE_CURRENT_ROSTER)
    }
    const handleClickUploadModalOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        updateLoading(false);
    };


    function handleFile(e: HTMLInputElement) {
        if (e.files) {
            const data = readXlsxFile(e.files[0], {
                schema, transformData(data: any) {
                    return data.splice(2, data.length - 3)
                }
            }).then(((rows: any, errors: any) => {
                updateFileData(rows.rows);
                updateSuccess(true);
            }));
        }
        handleClose();
    }


    const handleButtonClick = (e: any) => {
        updateLoading(true);
        handleFile(e);
    };

    return (

        <div className={'panel'}>
            <React.Fragment>
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">Upload Projected Roster</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Compatable file type: '.xlxs'
                        </DialogContentText>
                        <form className={classes.form} noValidate>
                            <FormControl className={classes.formControl}>
                                <input  className={classes.inputArea} type="file" id="raised-button-file" style={{display: 'none'}} onChange={(e) => {
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
                                                {(loading) && <CircularProgress size={68} className={classes.fabProgress}/>}
                                            </div>
                                            }

                                            {(!loading && !success) && <div className={classes.uploadButtonGrp}>
                                                <CloudUploadOutlinedIcon color={"primary"} fontSize={"large"} className={classes.uploadIcon}/>
                                                <span id="simple-modal-dialog"
                                                      className={classes.fileDropDialog}>Drag and drop or</span>
                                                < Button variant={"outlined"} component={"span"} className={classes.button}>
                                                    Browse
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
            <div className={classNames('container', props.className)}>
                <header className={classNames('panel_header')}>

                    <div className={classNames('panel_header_title_area')}>
                        <h2>Projected</h2>
                    </div>
                    <div className={classNames('action_area')}>
                        <div>
                            <Button className={classes.morDots} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
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
                                <MenuItem onClick={handleSelectUpload}>
                                    <PublishIcon color={"action"}/>Upload</MenuItem>
                            </Menu>
                        </div>
                        <div className={classNames('panel_header_action_area_close')}>
                            <button className={'close_btn'} onClick={handlePanelClose}>
                                <CloseIcon color={"action"}/>
                            </button>
                        </div>
                    </div>

                </header>

                <header className={classNames('content_header')}>
                    <div className={classNames('column-title', 'column-title-grade')}>
                        <h4>Grade</h4>
                    </div>
                    <div className={classNames('column-title', 'column-title-name')}>
                        <h4>Name</h4>
                    </div>
                    <div className={classNames('column-title', 'column-title-afsc')}>
                        <h4>AFSC</h4>
                    </div>
                    <div className={classNames('column-title', 'column-title-dor')}>
                        <h4>DOR</h4>
                    </div>
                    <div className={classNames('column-title', 'column-title-dos')}>
                        <h4>DOS</h4>
                    </div>
                </header>

                <section className={classNames('panel_content')}>
                    <div className={'items_container'}>
                        {fileData ? fileData.map((row: any, index: number) => <div className={'item'}
                                                                                   key={index}>{row.fullName}</div>) : ''}
                    </div>
                    <div className={classNames('end_of_list', 'preview')}/>
                </section>
            </div>
        </div>
    )
}

export const StyledProjectedRosterPanel = styled(ProjectedRosterPanel)`

.item {
background-color: #f4f4f4 ;
}
  
.column-title-grade {
  margin-left: 10px;
  min-width: 43px;
  max-width: 60px;
}
.column-title-name {
  min-width: 100px;
    max-width: 360px;
}
.column-title-afsc {
  min-width: 80px;
    max-width: 100px;
}
.column-title-dor {
  min-width: 80px;
    max-width: 100px;
}
.column-title-dos {
  min-width: 80px;
    max-width: 100px;
}

`;