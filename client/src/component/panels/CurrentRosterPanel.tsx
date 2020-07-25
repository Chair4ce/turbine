import * as React from "react";
import {useEffect, useState} from "react";
import classNames from "classnames";
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';
import {ROSTER_MENU_SELECT_ACTION} from "../menus/RosterMenu";
import PublishIcon from '@material-ui/icons/Publish';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
import {ApplicationState} from "../../store";
// @ts-ignore
import readXlsxFile from "read-excel-file";
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
    FormControl, InputLabel,
    Menu,
    MenuItem, Select
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import CurrentRosterRow from "./PanelRow";
import {Alert, Skeleton} from "@material-ui/lab";
import PersonIcon from "../icon/PersonIcon";
import {useDispatch, useSelector} from "react-redux";
import {CurrentMemberSerializer} from "../../util/MemberSerializer";
import MemberModel from "../../store/members/MemberModel";
import UploadMemberModel from "../../store/members/UploadMemberModel";
import {getMembers, saveCurrentRoster} from "../../store/members/thunks";
import {membersFetchRequest} from "../../store/members";
import RowsByGrade from "./RowsByGrade";

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
            height: 32,
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
        column_title: {
            width: 65
        },
        content_header: {
            padding: 0,
            display: 'flex',
            position: 'absolute',
            zIndex: 100,
            width: '100%',
            minWidth: 200,
            alignContent: 'center',
            minHeight: 22,
            background: '#575757',
            overflowX: 'hidden',
        },
        column_title_grade: {
            display: 'flex',
            marginLeft: 63,
            alignItems: 'center',
            justifyContent: 'space-between',
            textOverflow: 'ellipsis'
        },
        column_title_name: {
            paddingLeft: 25,
            width: 220,
            minWidth: 150,
            display: 'flex',
            alignItems: 'center',
        },
        content_title_set: {
            display: 'flex',
            minWidth: 200,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        panel_content: {
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: 'calc(100vh - 99px)',
        },
        item_container: {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            height: '100%',
            width: '100%',
        },
        rowTitles: {
            width: 65
        },
        sortFormControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);



const schema = {
    'SSAN': {
        prop: 'ssan',
        type: String,
        required: false
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

    // 'COURSE' is not a real Excel file column name,
    // it can be any string — it's just for code readability.
}

interface Props {
    callback: (type: string) => void;
    data: MemberModel[];
    loading: boolean;
    className?: string;
}

const CurrentRosterPanel: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const browseInputRef: any = React.createRef();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const opens = Boolean(anchorEl);
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('xs');
    const [success, updateSuccess] = useState(false);
    const [errors, updateErrors] = useState("");
    const [sortByGrade, toggleSortByGrade] = useState(false);
    const [sortBySkill, toggleSortBySkill] = useState(false);
    const [state, setState] = React.useState<{ age: string | number; name: string }>({
        age: '',
        name: 'hai',
    });



    // const loading = useSelector(({importChanges}: ApplicationState) => importChanges.loading);
    // const success = useSelector(({importChanges}: ApplicationState) => importChanges.success);


    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
        [classes.buttonLoading]: props.loading,
    });

    const FileDropClassname = clsx({
        [classes.fileDropSuccess]: success,
        [classes.buttonLoading]: props.loading,
    });

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

    const handlePanelClose = () => {
        props.callback(ROSTER_MENU_SELECT_ACTION.TOGGLE_CURRENT_ROSTER)
    }
    const handleShowUploadModal = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    function handleFile(e: HTMLInputElement) {
        if (e.files) {
            const data = readXlsxFile(e.files[0], {
                schema, transformData(data: any) {
                    return data.splice(2, data.length - 3)
                }
            }).then(((rows: any, errors: any) => {
                if(errors) {
                    updateErrors(errors)
                    updateSuccess(false);
                } else {
                dispatch(saveCurrentRoster(rows.rows));
                updateSuccess(true);
                };
            }));
        }
        handleClose();
    }

    const handleChange = (event: React.ChangeEvent<{name?: string, value: unknown }>) => {
        console.log(event.target.value);
        const name = event.target.name as keyof typeof state;
        setState({
            ...state,
            [name]: event.target.value,
        });

        switch (event.target.value) {
            case '1':
                console.log('fired Grade')
                toggleSortBySkill(false)
                toggleSortByGrade(true)
                break;
            case '2':
                console.log('fired Skill')
                toggleSortByGrade(false)
                toggleSortBySkill(true)
                break;
            case 'None':
                toggleSortByGrade(false)
                toggleSortBySkill(false)
                break;
        }
    };



    const handleButtonClick = (e: any) => {

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
                    <DialogTitle id="max-width-dialog-title">Upload Alpha Roster</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Compatable file type: '.xlxs'
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
                                            {(props.loading || success) &&
                                            <div className={classes.wrapper}>
                                                <Fab
                                                    aria-label="save"
                                                    color="primary"
                                                    className={buttonClassname}
                                                >
                                                    {success ? <CheckIcon/> : <SaveIcon/>}
                                                </Fab>
                                                {(props.loading) &&
                                                <CircularProgress size={68} className={classes.fabProgress}/>}
                                            </div>
                                            }

                                            {(!props.loading && !success) && <div className={classes.uploadButtonGrp}>
                                                <CloudUploadOutlinedIcon color={"primary"} fontSize={"large"}
                                                                         className={classes.uploadIcon}/>
                                                <span id="simple-modal-dialog"
                                                      className={classes.fileDropDialog}>Drag and drop or</span>
                                                < Button variant={"outlined"} component={"span"}
                                                         className={classes.button}>
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
                        <h2>Alpha Roster</h2>
                    </div>
                    <div className={classNames('action_area')}>
                        <FormControl variant="outlined" size="small" className={classes.sortFormControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Group By</InputLabel>
                            <Select
                                native
                                value={state.age}
                                onChange={handleChange}
                                label="Group By"
                                inputProps={{
                                    name: 'age',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="None" />
                                <option value={1}>Grade</option>
                                <option value={2}>Skill Level</option>
                            </Select>
                        </FormControl>
                        <div>
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
                        </div>
                        <div className={classNames('panel_header_action_area_close')}>
                            <button className={'close_btn'} onClick={handlePanelClose}>
                                <CloseIcon color={"action"}/>
                            </button>
                        </div>
                    </div>

                </header>
                <div className={'content_container'}>
                    <section className={classNames('panel_content', classes.panel_content)}>
                        <div className={classNames('items_container', classes.item_container)}>
                            {errors && <Alert severity="error">{errors}</Alert>}
                            {props.loading && <Skeleton variant="text" animation={'wave'} style={{height: '80px', margin: '0'}}/>}
                            {props.loading && <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>}
                            {props.loading && <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>}
                            {props.loading && <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>}
                            {props.loading && <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>}
                            {props.loading && <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>}
                            {props.loading && <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>}
                            {props.loading && <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>}
                            {props.loading && <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>}
                            {props.loading && <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>}
                            {props.loading && <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>}
                            {props.loading && <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>}
                            {props.loading && <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>}
                            {props.data && !sortByGrade && !sortBySkill && props.data.map((row: any, index: number) => <CurrentRosterRow
                                key={index}
                                className={'item'}
                                name={row.fullName}
                                grade={row.grade}
                                afsc={row.dafsc}
                            />)}
                            { !props.loading && sortByGrade && <RowsByGrade data={props.data}/>}


                            <div className={classNames('end_of_list', 'preview')}/>
                        </div>
                        {/*{fileData ? <div className={classNames('end_of_list', 'preview')}/> : ''}*/}

                    </section>
                </div>
            </div>
        </div>
    )
}

export const StyledCurrentRosterPanel = styled(CurrentRosterPanel)`


  

`;