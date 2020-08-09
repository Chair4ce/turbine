import * as React from "react";
import {CSSProperties, useState} from "react";
import classNames from "classnames";
import CloseIcon from '@material-ui/icons/Close';
import {ROSTER_MENU_SELECT_ACTION} from "../menus/RosterMenu";
import PublishIcon from '@material-ui/icons/Publish';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
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
    FormControl,
    InputLabel,
    Menu,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import CurrentRosterRow from "./rows/PanelRow";
import {useDispatch} from "react-redux";
import MemberModel from "../../store/members/models/MemberModel";
import {saveCurrentRoster} from "../../store/members/thunks";
import FuzzySearch from 'fuzzy-search';
import UniqueAFSCRows from "./rows/UniqueAFSCRows";
import RowsByGrade from "./rows/RowsByRankContainer";
import RowsByOfficeContainer from "./rows/RowsByOfficeContainer";
import GenericGroupCollectionModel from "../../store/members/models/GenericGroupCollectionModel";
import SkeletonPanelC from "./SkeletonPanelC";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            zIndex: 1500,
            outline: 'none',
            margin: 6,
        },
        panel: {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            marginRight: 10,
            display: 'block',
            position: 'relative',
            width: '100%',
            height: '100%',
            minWidth: 500,
            float: 'left',
            font: 'inherit',
            fontSize: '100%',
            verticalAlign: 'baseline',
        },
        panelHeader: {
            display: 'flex',
            minWidth: 230,
            width: '100%',
            alignItems: 'center',
            flexGrow: 0,
            flexShrink: 1,
            margin: 0,
            border: 0,
            height: 54,
            padding: '0 3px 0 10px',
            background: 'rgb(44, 45, 47)',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            boxSizing: 'border-box',
            lineHeight: 15,
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
        contentContainer: {
            position: 'absolute',
            width: '100%',
            height: 'calc(100vh-122px)'
        },
        item_container: {
            display: 'block',
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
        searchInput: {
            height: 45,
            marginRight: 8,
            marginBottom: 4,
            paddingLeft: 20,
        },
        totalMembersCount: {
            color: '#dcdcdc',
        },
        searchResultStatBar: {
            width: '100%',
            position: 'sticky',
            top: 0,
            background: '#383838',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 4
        },
        endOfList: {
            position: 'relative',
            width: '100%',
            minHeight: 40,
            backgroundColor: '#484f57',
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
        },
        panelTitle: {
            display: 'flex',
            alignItems: 'center',
            flexGrow: 0,
            flexShrink: 1,
        },
        actionArea: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            flexShrink: 0,
            cursor: 'pointer',
        },
        closeBtn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            height: '100%',
            width: '100%',
        },
        closeBtnArea: {
            height: 44,
            marginRight: 2,
            borderRadius: 4,
            transition: 'background-color 100ms ease-in',
            '&:hover': {
                backgroundColor: 'rgba(119,119,119,0.27)',
            }
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
        item: {
            display: 'flex',
            width: '100%',
            minHeight: 65,
            alignItems: 'center',
            borderBottom: '1px solid #ddd',
            color: '#33333',
            '&:hover': {
                backgroundColor: 'rgba(180,180,180,0.27)',
            }
        }
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
    members: MemberModel[];
    loading: boolean;
    collectionAFSC: GenericGroupCollectionModel[];
    collectionOffice: GenericGroupCollectionModel[];
    callback: (type: string) => void;
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
    const [sortByAFSC, toggleSortByAFSC] = useState(false);
    const [sortByOffice, toggleSortByOffice] = useState(false);
    const [searchAll, updateFuzzyAll] = useState("");
    const [searchAFSC, updateFuzzyAFSC] = useState("");
    const [searchOffice, updateFuzzyOffice] = useState("");
    const [state, setState] = React.useState<{ group: string | number; name: string }>({
        group: '',
        name: '',
    });

    const Allsearcher = new FuzzySearch(props.members, ['fullName'],
        {sort: true}
        )

    const searchResultAll = Allsearcher.search(searchAll);

    //


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
                if (errors) {
                    updateErrors(errors)
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

    function handleFuzzy(event: any) {
        if ((!sortByGrade && !sortBySkill && !sortByAFSC && !sortByOffice) || (sortBySkill || sortByGrade) && event.target.value.length !== "") {
            updateFuzzyAll(event.target.value);
        } else if (sortByOffice) {
            updateFuzzyOffice(event.target.value);
        } else if (sortByAFSC) {
            updateFuzzyAFSC(event.target.value)
        }
    }

    const handleChange = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        updateFuzzyAll("");
        updateFuzzyAFSC("");
        const name = event.target.name as keyof typeof state;
        setState({
            ...state,
            [name]: event.target.value,
        });

        switch (event.target.value) {
            case '1':
                toggleSortByGrade(true)
                toggleSortByOffice(false)
                toggleSortByAFSC(false)
                toggleSortBySkill(false)
                break;
            case '2':
                toggleSortBySkill(true)
                toggleSortByOffice(false)
                toggleSortByAFSC(false)
                toggleSortByGrade(false)
                break;
            case '3':
                toggleSortByAFSC(true)
                toggleSortByOffice(false)
                toggleSortByGrade(false)
                toggleSortBySkill(false)
                break;
            case '4':
                toggleSortByOffice(true)
                toggleSortByGrade(false)
                toggleSortBySkill(false)
                toggleSortByAFSC(false)
                break;
            case 'A-Z':
                toggleSortByOffice(false)
                toggleSortByGrade(false)
                toggleSortBySkill(false)
                toggleSortByAFSC(false)
                break;
        }
    };


    const handleButtonClick = (e: any) => {

        handleFile(e);
    };

    return (

        <div className={classes.panel}>
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
            {!props.loading ? (  <div className={classNames(classes.container)}>
                <header className={classNames(classes.panelHeader)}>

                    <div className={classNames(classes.panelTitle)}>
                        <h2>Alpha Roster</h2>
                    </div>

                    <div className={classNames(classes.actionArea)}>
                        <div className={classes.searchInput}>
                            {props.members && !sortByGrade && !sortBySkill && !sortByAFSC && !sortByOffice ?
                                <TextField label="Search" value={searchAll} id="standard-size-small" size="small"
                                           onChange={handleFuzzy}/> : null}
                            {/*{props.members && sortByAFSC ? <TextField label="Search" id="standard-size-small" size="small"*/}
                            {/*                                 onChange={handleFuzzy}/> : null}*/}
                            {/*{props.members && sortByOffice ? <TextField label="Search" id="standard-size-small"  size="small"*/}
                            {/*                                   onChange={handleFuzzy}/> : null}*/}
                        </div>
                        <FormControl variant="outlined" size="small" className={classes.sortFormControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">List By</InputLabel>
                            <Select
                                native
                                value={state.group}
                                onChange={handleChange}
                                label="List By"
                                inputProps={{
                                    name: 'group',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="A-Z" value="A-Z">A-Z</option>
                                {/*<option value={1}>Grade</option>*/}
                                <option value={3}>AFSC</option>
                                {/*<option value={4}>Office</option>*/}
                            </Select>
                        </FormControl>

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

                        <div className={classNames(classes.closeBtnArea)}>
                            <Button className={classes.closeBtn} onClick={handlePanelClose}>
                                <CloseIcon color={"action"}/>
                            </Button>
                        </div>
                    </div>

                </header>

                <div className={classes.contentContainer}>
                    <section className={classNames(classes.panel_content)}>
                        <div className={classNames(classes.item_container)}>
                            <div className={classes.searchResultStatBar}>
                                {searchResultAll.length > 0 && <em className={classes.totalMembersCount}>
                                    {'Total: ' + searchResultAll.length}
                                </em>}
                            </div>
                            {props.members && !sortByGrade && !sortBySkill && !sortByAFSC && !sortByOffice && searchResultAll.map((row: any) =>
                                <CurrentRosterRow
                                    key={row.id}
                                    className={classes.item}
                                    gradeClassName={row.grade}
                                    data={row}
                                />)}

                            {/*{props.members && sortByGrade &&*/}
                            {/*<RowsByGrade data={MemberModel.sortByDorAscending(searchResultAll)} bigSticky={false}/>}*/}
                            {/*{props.members && sortByOffice && <RowsByOfficeContainer data={props.collectionOffice}/>}*/}
                            {props.members && sortByAFSC && props.collectionAFSC.map((m: GenericGroupCollectionModel, index) =>
                                <UniqueAFSCRows key={index} uAFSC={m.genericGroup} members={m.members}
                                                className={'dafsc'}/>)}


                            <div className={classNames(classes.endOfList, 'preview')}>

                                {/*{data && !sortByGrade && !sortBySkill && sortByAFSC && <span className={classes.totalMembersCount}>*/}
                                {/*    {'Total: ' + searchResultAFSC.length}*/}
                                {/*</span> }*/}
                            </div>
                        </div>
                        {/*{fileData ? <div className={classNames('end_of_list', 'preview')}/> : ''}*/}

                    </section>
                </div>
            </div> ) : (<SkeletonPanelC/>)}
        </div>
    )
}

export default CurrentRosterPanel;