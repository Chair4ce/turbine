import * as React from "react";
import {useState} from "react";
import classNames from "classnames";
import CloseIcon from '@material-ui/icons/Close';
import {ROSTER_MENU_SELECT_ACTION} from "../menus/RosterMenu";
import PublishIcon from '@material-ui/icons/Publish';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
import SearchIcon from '@material-ui/icons/Search';
// @ts-ignore
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
    TextField
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import CurrentRosterRow from "./rows/PanelRow";
import {useDispatch, useSelector} from "react-redux";
import MemberModel from "../../store/members/models/MemberModel";
import {setStaging} from "../../store/members/thunks";
import FuzzySearch from 'fuzzy-search';
import UniqueAFSCRows from "./rows/UniqueAFSCRows";
import GenericGroupCollectionModel from "../../store/members/models/GenericGroupCollectionModel";
import {ApplicationState} from "../../store";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            zIndex: 1500,
            outline: 'none',
            margin: 6,
        },
        panel: {
            // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            marginRight: 10,
            position: 'relative',
            width: '100%',
            minWidth: 500,
        },
        panelHeader: {
            display: 'flex',

            height: 54,
            padding: '0 3px 0 10px',
            background: 'rgb(44, 45, 47)',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
        },
        container: {
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
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
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        contentContainer: {

        },
        item_container: {
            overflowY: 'auto',
            height: '100%',
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
            paddingLeft: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
        },
        totalMembersCount: {
            color: '#dcdcdc',
        },
        searchResultStatBar: {
            position: 'sticky',
            top: 0,
            background: '#383838',
            zIndex: 1000,
        },
        endOfList: {
            position: 'relative',
            width: '100%',
            height: 40,
            backgroundColor: '#484f57',
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
        },
        panelTitle: {
            display: 'flex',
            alignItems: 'center',
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
        },
        searchInputLabel: {
            fontFamily: 'Rambla'
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        closeButton: {

        }
    }),
);


interface Props {
    callback: (type: string) => void;
    className?: string;
}

const CurrentRosterPanel: React.FC<Props> = props => {
    const collectionAFSC: GenericGroupCollectionModel[] = useSelector(({members}: ApplicationState) => members.genericAFSCList);
    // const collectionOffice: GenericGroupCollectionModel[] = useSelector(({members}: ApplicationState) => members.officeCollection);
    const loading: boolean = useSelector(({members}: ApplicationState) => members.loading);
    const members: MemberModel[] = useSelector(({members}: ApplicationState) => members.data);
    const dispatch = useDispatch();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const opens = Boolean(anchorEl);
    const [open, setOpen] = React.useState(false);
    const [sortByGrade, toggleSortByGrade] = useState(false);
    const [sortBySkill, toggleSortBySkill] = useState(false);
    const [sortByAFSC, toggleSortByAFSC] = useState(false);
    const [sortByOffice, toggleSortByOffice] = useState(false);
    const [searchAll, updateFuzzyAll] = useState("");
    const [state, setState] = React.useState<{ group: string | number; name: string }>({
        group: '',
        name: '',
    });

    const Allsearcher = new FuzzySearch(members, ['fullName'],
        {sort: true}
    )

    const searchResultAll = Allsearcher.search(searchAll);



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
        dispatch(setStaging(true));
        setOpen(true);
    };


    function handleFuzzy(event: any) {
        updateFuzzyAll(event.target.value);
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


    return (

        <div className={classes.panel}>
            <div className={classNames(classes.container)}>
                <header className={classNames(classes.panelHeader)}>

                    <div className={classNames(classes.panelTitle)}>
                        <Typography>Alpha Roster</Typography>
                    </div>

                    <div className={classNames(classes.actionArea)}>
                        <div className={classes.searchInput}>
                            {members && !sortByGrade && !sortBySkill && !sortByAFSC && !sortByOffice ?
                                <TextField className={classes.searchInputLabel} value={searchAll}
                                           id="standard-size-small" size="small"
                                           onChange={handleFuzzy}
                                           InputProps={{
                                               startAdornment: (
                                                   <InputAdornment position="start">
                                                       <SearchIcon/>
                                                   </InputAdornment>
                                               ),
                                           }}/> : null}
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
                                <option value={3}>AFSC</option>
                            </Select>
                        </FormControl>
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
                            {members && !sortByGrade && !sortBySkill && !sortByAFSC && !sortByOffice && searchResultAll.map((row: any) =>
                                <CurrentRosterRow
                                    key={row.id}
                                    className={classes.item}
                                    gradeClassName={row.grade}
                                    data={row}
                                />)}

                            {members && sortByAFSC && collectionAFSC.map((m: GenericGroupCollectionModel, index) =>
                                <UniqueAFSCRows key={index} uAFSC={m.genericGroup} members={m.members}
                                                className={'dafsc'}/>)}
                            <div className={classNames(classes.endOfList, 'preview')}>
                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    )
}

export default CurrentRosterPanel;