import * as React from "react";
import {useState} from "react";
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
    InputAdornment,
    InputLabel,
    Menu,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import CurrentRosterRow from "./rows/PanelRow";
import {useDispatch, useSelector} from "react-redux";
import FuzzySearch from 'fuzzy-search';
import {saveGainingMembers} from "../../store/members/thunks";
import GenericGainingGroupCollectionModel from "../../store/members/models/GenericGainingGroupCollectionModel";
import UniqueGainingAFSCRows from "./rows/UniqueGainingAFSCRows";
import SkeletonPanelC from "./SkeletonPanelC";
import GainingMemberModel from "../../store/members/models/GainingMemberModel";
import SearchIcon from "@material-ui/icons/Search";
import GenericGroupCollectionModel from "../../store/members/models/GenericGroupCollectionModel";
import {ApplicationState} from "../../store";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            zIndex: 1500,
            outline: 'none',
            margin: 6,
        },
        panel: {
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
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        },
        container: {
            boxSizing: 'border-box',
            position: 'absolute',
            width: '100%',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            height: '100%',
            overflowY: 'hidden'
        },
        panel_content: {
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: 'calc(100vh - 99px)',
        },
        item_container: {
            display: 'block',
            overflowY: 'auto',
            height: '100%',
            width: '100%',
        },
        contentContainer: {
            position: 'absolute',
            width: '100%',
            height: '100%'
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
        rowTitles: {
            width: 65
        },
        sortFormControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        searchInput: {
            height: 40,
            marginRight: 8,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
        },
        totalMembersCount: {
            color: '#dcdcdc'
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
            height: '100%',
            width: '100%',
            flexGrow: 0,
            flexShrink: 1,
        },
        actionArea: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            flexShrink: .2,
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
            marginRight: 4,
            height: 44,
            borderRadius: 4,
            transition: 'background-color 100ms ease-in',
            '&:hover': {
                backgroundColor: 'rgba(119,119,119,0.27)',
            }
        },
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
    'GAINING_PAS': {
        prop: 'gainingPas',
        type: String,
        required: true
    },
    'SSAN': {
        prop: 'mbrId',
        type: String,
        required: true
    },
    'FULL_NAME': {
        prop: 'fullName',
        type: String,
        required: true
    },
    'GRADE': {
        prop: 'grade',
        type: String,
        required: false
    },
    'LOSING_PAS': {
        prop: 'losingPas',
        type: String,
        required: false
    },
    'LOSING_PAS_CLEARTEXT': {
        prop: 'losingPasCleartext',
        type: String,
        required: false
    },
    'DAFSC': {
        prop: 'dafsc',
        type: String,
        required: false
    },
    'SPONSOR_SSAN': {
        prop: 'sponsorId',
        type: String,
        required: false
    },
    'DOR': {
        prop: 'dor',
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

}

interface Props {
    callback: (type: string) => void;
    className?: string;
}

const GainingRosterPanel: React.FC<Props> = props => {
    const members: GainingMemberModel[] = useSelector(({members}: ApplicationState) => members.gainingData);
    const loading: boolean = useSelector(({members}: ApplicationState) => members.gainingLoading);
    const collectionAFSC: GenericGainingGroupCollectionModel[] = useSelector(({members}: ApplicationState) => members.genericGainingAFSCList);
    const dispatch = useDispatch();
    const classes = useStyles();

    const browseInputRef: any = React.createRef();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const opens = Boolean(anchorEl);
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('xs');
    const [success, updateSuccess] = useState(false);
    const [sortByGrade, toggleSortByGrade] = useState(false);
    const [sortByAFSC, toggleSortByAFSC] = useState(false);
    const [searchAll, updateFuzzyAll] = useState("");
    const [state, setState] = React.useState<{ group: string | number; name: string }>({
        group: '',
        name: '',
    });

    const Allsearcher = new FuzzySearch(members, ['fullName'], {sort: true})
    // const AFSCsearcher = new FuzzySearch(collectionAFSC, ['genericGroup'], {sort: true})

    const searchResultAll = Allsearcher.search(searchAll);
    // const searchResultAFSC = AFSCsearcher.search(searchAFSC);


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

    const handleMenuSelect = () => {
        setAnchorEl(null);
        handleShowUploadModal();
    };

    const handlePanelClose = () => {
        props.callback(ROSTER_MENU_SELECT_ACTION.TOGGLE_GAINING_ROSTER)
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
                if (errors)
                {console.log(errors.rows, errors);
                    updateSuccess(false);
                } else {
                    dispatch(saveGainingMembers(rows.rows));
                    updateSuccess(true);
                }
            }));

            console.log(data);
        }
        handleClose();
    }

    function handleFuzzy(event: any) {
        if (!sortByAFSC && !sortByGrade && event.target.value.length !== "") {
            updateFuzzyAll(event.target.value);
        }
        if (sortByAFSC) {
            // updateFuzzyAFSC(event.target.value)
        }

    }

    const handleChange = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        updateFuzzyAll("");
        // updateFuzzyAFSC("");
        const name = event.target.name as keyof typeof state;
        setState({
            ...state,
            [name]: event.target.value,
        });

        switch (event.target.value) {
            case '1':
                toggleSortByGrade(true)
                toggleSortByAFSC(false)
                break;
            case '2':
                toggleSortByAFSC(true)
                toggleSortByGrade(false)
                break;
            case 'A-Z':
                toggleSortByGrade(false)
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
                    <DialogTitle id="max-width-dialog-title">Upload Gaining Roster</DialogTitle>
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

            <div className={classNames(classes.container)}>
                <header className={classNames(classes.panelHeader)}>

                    <div className={classNames(classes.panelTitle)}>
                        <Typography>Gaining Roster</Typography>
                    </div>

                    <div className={classNames(classes.actionArea)}>
                        <div className={classes.searchInput}>
                            {members && !sortByGrade && !sortByAFSC ?
                                <TextField id="standard-size-small" size="small"
                                           onChange={handleFuzzy}
                                           InputProps={{
                                               startAdornment: (
                                                   <InputAdornment position="start">
                                                       <SearchIcon />
                                                   </InputAdornment>
                                               ),
                                           }}/> :
                                <TextField id="standard-size-small" size="small"
                                           onChange={handleFuzzy}
                                           InputProps={{
                                               startAdornment: (
                                                   <InputAdornment position="start">
                                                       <SearchIcon />
                                                   </InputAdornment>
                                               ),
                                           }}/>}
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
                                <option aria-label="A-Z" value={"A-Z"}>A-Z</option>
                                {/*<option value={1}>Grade</option>*/}
                                <option value={2}>AFSC</option>
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
                            {members && !sortByGrade && !sortByAFSC && searchResultAll.map((row: any) =>
                                <CurrentRosterRow
                                    key={row.id}
                                    className={classes.item}
                                    gradeClassName={row.grade}
                                    data={row}
                                />)}

                            {/*{members && sortByGrade &&*/}
                            {/*<RowsByGainingRankContainer data={MemberModel.sortGainingDorAscending(searchResultAll)}*/}
                            {/*                            bigSticky={false}/>}*/}
                            {members && sortByAFSC && collectionAFSC.map((m: GenericGainingGroupCollectionModel, index) =>
                                <UniqueGainingAFSCRows key={index} uAFSC={m.genericGroup} members={m.members}
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
            </div>
        </div>
    )
}

export default GainingRosterPanel;