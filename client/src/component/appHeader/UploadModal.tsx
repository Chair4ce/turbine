import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import {Button, CircularProgress, Container, Dialog, Fab} from "@material-ui/core";
import classNames from "classnames";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import {saveCurrentRoster, saveGainingMembers, setStaging} from "../../store/members/thunks";
import {useDispatch, useSelector} from "react-redux";
// @ts-ignore
import readXlsxFile from "read-excel-file";
import {ApplicationState} from "../../store";
import clsx from "clsx";
import {green} from "@material-ui/core/colors";
import {savePositions} from "../../store/positions/thunks";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
            zIndex: 4000
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        fileFormatMsg: {
            width: '100%'
        },
        msgContainer: {
            display: 'flex',
            height: 'auto',
            width: '100%',
            textAlign: 'center',
            alignItems: 'center'
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
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,

        },
        fileDropSuccess: {
            pointerEvents: 'none',
        },
        buttonLoading: {
            pointerEvents: 'none',
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
            pointerEvents: 'none',
        },
        button: {
            fontWeight: 'bold',
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
        uploadButtonGrp: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
        listItems: {
            height: 88,
        }
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    callBack: () => void;
    open: boolean;
    className?: string;
}

export const FullScreenDialog: React.FC<Props> = props => {
    const loading: boolean = useSelector(({members}: ApplicationState) => members.loading);
    const [error, updateError] = useState("");
    const [success, updateSuccess] = useState(false);
    const browseInputRef: any = React.createRef();
    const dispatch = useDispatch();
    const classes = useStyles();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
        [classes.buttonLoading]: loading,
    });

    const FileDropClassname = clsx({
        [classes.fileDropSuccess]: success,
        [classes.buttonLoading]: loading,
    });

    const handleClose = () => {
        props.callBack();
    };

    // const handleButtonClick = (e: any) => {
    //
    //     handleFile(e);
    // };

    function handleFile(e: HTMLInputElement) {
        if (e.files) {
            let file = e.files[0];
            let fileName = file.name;
            console.log(fileName);
            if(fileName.split('.').pop() === "xlsx") {
                const data = readXlsxFile(e.files[0], {
                    schema, transformData(data: any) {
                        return data.splice(2, data.length - 3)
                    }
                }).then(((rows: any, errors: any) => {
                    if (errors) {
                        updateError(errors);
                    } else {
                        dispatch(saveCurrentRoster(rows.rows));
                        updateSuccess(true);
                    }
                    ;
                }))
            }
            if (fileName.split('.').pop() == "xls") {
                updateError("Please convert file to xlsm before uploading again, thank you!")
            }

        }

    }

    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Upload
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container className={classes.msgContainer}>
                    <Typography className={classes.fileFormatMsg}>
                        Please convert your BLSDM files to a .xlsx file by clicking 'Save As' in excel and choosing
                        '.xlsx' from the menu.
                    </Typography>
                </Container>
                <List>
                    <input type="file" id="raised-button-file"
                                     style={{display: 'none'}} onChange={(e) => {
                    const {target} = e;
                    if (target.value.length > 0) {
                        handleFile(e.target)
                    }
                }}
                                     ref={browseInputRef}/>

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


                        </label>
                    <ListItem >
                        <ListItemText primary="Alpha Roster" secondary="Click to upload file"/>

                    </ListItem>
                    <Divider/>
                    <ListItem button>
                        <ListItemText primary="Gaining Roster"/>

                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}

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
