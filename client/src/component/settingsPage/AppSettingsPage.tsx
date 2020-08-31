import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import {Dialog} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
// @ts-ignore
import {ApplicationState} from "../../store";
import {MemberFileUpload} from "./MemberFileUpload";
import {AlphaReviewTableConnected} from "./AlphaReviewTable";
import StagingUploadMemberModel from "../../store/members/models/StagingUploadMemberModel";
import {resetGainingSuccess, resetSuccess, stageGainingUploadData, stageMemberUploadData} from "../../store/members";
import Fade from "@material-ui/core/Fade";
import {saveCurrentRoster, saveGainingMembers} from "../../store/members/thunks";
import SettingsListItem from "./SettingsListItem";
import {setPositionsSuccess, stagePositionUploadData} from "../../store/positions";
import StagingUploadGainingModel from "../../store/members/models/StagingUploadGainingModel";
import StagingUploadPositionModel from "../../store/positions/models/StagingUploadPositionModel";
import {savePositions} from "../../store/positions/thunks";
import GainingFileUpload from "./GainingFileUpload";
import UpmrFileUpload from "./UpmrFileUpload";
import {GainingReviewTableConnected} from "./GainingReviewTable";
import {UpmrReviewTableConnected} from "./UpmrReviewTable";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            alignItems: 'center'
        },
        appBar: {
            position: 'relative',
            zIndex: 4000
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        msgContainer: {
            display: 'flex',
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
            height: 32
        },
        msgText: {
            width: '100%',
        },
        listItems: {
            height: 80,
            maxWidth: 400,
            justifyContent: 'space-between',
        },

        uploadItem: {
            height: '100%',
            justifyContent: 'center'
        },
        table: {
            width: '100%'
        },
        fileDataSummary: {
            textAlign: 'center',
            alignItems: 'center'
        },
        uploadContent: {
            position: 'absolute',
            top: 64,
            height: 'calc(100vh - 65px)',
            display: 'block',
            width: '100%',
            padding: theme.spacing(2),
        },
        paper: {
            width: 600,
            height: '100%',
            alignItems: 'center'
        },
        fullScreenDialog: {
            alignItems: 'center'
        },
        fileDrop: {
            display: 'block',
            width: '100%',
            height: '100%',
            padding: theme.spacing(2),
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

const FILE_UPLOAD_ACTIONS = {
    ALPHA_SUCCESS: 'FILE_UPLOAD/ALPHA_SUCCESS',
    GAINING_SUCCESS: 'FILE_UPLOAD/GAINING_SUCCESS',
    UPMR_SUCCESS: 'FILE_UPLOAD/UPMR_SUCCESS',
}

export const AppSettingsPage: React.FC<Props> = props => {
    const stagedMembers: StagingUploadMemberModel[] = useSelector(({members}: ApplicationState) => members.uploadStagingMember);
    const stagedGaining: StagingUploadGainingModel[] = useSelector(({members}: ApplicationState) => members.uploadStagingGaining);
    const stagedUpmr: StagingUploadPositionModel[] = useSelector(({positions}: ApplicationState) => positions.uploadStagingPosition);


    const [alphaUploadFileDrop, showAlphaUpload] = useState(false);
    const [alphaUploaded, setAlphaUploaded] = useState(false);

    const [gainingUploadFileDrop, showGainingUpload] = useState(false);
    const [gainingUploaded, setGainingUploaded] = useState(false);

    const [upmrUploadFileDrop, showUpmrUpload] = useState(false);
    const [upmrUploaded, setUpmrUploaded] = useState(false);

    const dispatch = useDispatch();
    const classes = useStyles();

    function childCallBackHandler(type: string, status: boolean, data?: string) {
        switch (type) {
            case FILE_UPLOAD_ACTIONS.ALPHA_SUCCESS:
                setAlphaUploaded(status);
                break;
            case FILE_UPLOAD_ACTIONS.GAINING_SUCCESS:
                setGainingUploaded(status);
                break;
            case FILE_UPLOAD_ACTIONS.UPMR_SUCCESS:
                setUpmrUploaded(status);
                break;
        }
    }

    const handleAlphaCallback = (data?: any[]) => {
        dispatch(saveCurrentRoster(data));
        showAlphaUpload(false);
    };
    const handleGainingCallback = (data?: any[]) => {
        dispatch(saveGainingMembers(data));
        showGainingUpload(false);
    };
    const handleUpmrCallback = (data?: any[]) => {
        dispatch(savePositions(data));
        showUpmrUpload(false);
    };

    function cleanUp() {
        dispatch(stageMemberUploadData([]));
        dispatch(stageGainingUploadData([]));
        dispatch(stagePositionUploadData([]));
        dispatch(resetSuccess());
        dispatch(resetGainingSuccess());

        dispatch(setPositionsSuccess(false));
        setAlphaUploaded(false);
        setGainingUploaded(false);
        setUpmrUploaded(false);
        showAlphaUpload(false);
        showGainingUpload(false);
        showUpmrUpload(false);
    }

    const handleClose = () => {
        if (alphaUploadFileDrop) {
            handleUploadButtonClick("alpha")
        } else if (gainingUploadFileDrop) {
            handleUploadButtonClick("gaining")
        } else if (upmrUploadFileDrop) {
            handleUploadButtonClick("UPMR")
        } else {
            cleanUp();
            props.callBack();
        }

    };

    function handleUploadButtonClick(type: string) {
        switch (type) {
            case "alpha":
                showAlphaUpload(prev => !prev);
                break;
            case "gaining":
                showGainingUpload(prev => !prev);
                break;
            case "UPMR":
                showUpmrUpload(prev => !prev);
                break;
        }

    };

    function renderFileDrops() {
        if (alphaUploadFileDrop) {
            return <div className={classes.uploadContent}>
                {stagedMembers.length > 0 ?
                    <AlphaReviewTableConnected loading={false} title={"Review Alpha Members before upload"}
                                               filtering={true}
                                               edit={true}
                                               grouping={true} search={true} selection={false}
                                               exportButton={false} callback={handleAlphaCallback}/>
                    : <div className={classes.fileDrop}>
                        <MemberFileUpload parentCallback={childCallBackHandler}/>
                    </div>}
            </div>
        }

        if (gainingUploadFileDrop) {
            return <div className={classes.uploadContent}>
                {stagedGaining.length > 0 ?
                    <GainingReviewTableConnected loading={false}
                                                 title={"Review Gaining Members before upload"}
                                                 filtering={true}
                                                 edit={true}
                                                 grouping={true} search={true} selection={false}
                                                 exportButton={false} callback={handleGainingCallback}/>
                    :
                    <div className={classes.fileDrop}>
                        <GainingFileUpload parentCallback={childCallBackHandler}/>
                    </div>}
            </div>
        }
        if (upmrUploadFileDrop) {
            return <div className={classes.uploadContent}>
                {stagedUpmr.length > 0 ? <UpmrReviewTableConnected loading={false} title={"Review UPMR before upload"}
                                                                   filtering={true}
                                                                   edit={true}
                                                                   grouping={true} search={true} selection={false}
                                                                   exportButton={false}
                                                                   callback={handleUpmrCallback}/> :
                    <div className={classes.fileDrop}>
                        <UpmrFileUpload parentCallback={childCallBackHandler}/>
                    </div>}
            </div>
        }

    }


    function renderTitle() {
        if (alphaUploadFileDrop) {
            return "Upload Alpha Roster (.xlsx)"
        } else if (gainingUploadFileDrop) {
            return "Upload Gaining Roster (.xlsx)"
        } else if (upmrUploadFileDrop) {
            return "Upload UPMR (.xlsx)"
        } else {
            return "Settings"
        }

    }

    return (
        <div className={classes.root}>
            <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}
                    className={classes.fullScreenDialog}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {renderTitle()}
                        </Typography>
                        {/*<Button autoFocus color="inherit" onClick={handleClose}>*/}
                        {/*    save*/}
                        {/*</Button>*/}
                    </Toolbar>
                </AppBar>

                {stagedMembers.length > 0 ? <Typography className={classes.msgText}>

                </Typography> : null}

                {/*<ListItem>*/}
                {/*    <ListItemText primary="Alpha Roster" secondary="Click to upload file"/>*/}
                {/*</ListItem>*/}

                <Fade in={!alphaUploadFileDrop && !upmrUploadFileDrop && !gainingUploadFileDrop}>
                    <List>
                        <ListItem className={classes.listItems} disabled={gainingUploadFileDrop || upmrUploadFileDrop}>
                            <SettingsListItem callback={handleUploadButtonClick} itemTitle={"Alpha Roster"}
                                              itemType={"alpha"}/>
                        </ListItem>
                        <ListItem className={classes.listItems} disabled={alphaUploadFileDrop || upmrUploadFileDrop}>
                            <SettingsListItem callback={handleUploadButtonClick} itemTitle={"Gaining Roster"}
                                              itemType={"gaining"}/>
                        </ListItem>
                        <ListItem className={classes.listItems} disabled={alphaUploadFileDrop || gainingUploadFileDrop}>
                            <SettingsListItem callback={handleUploadButtonClick} itemTitle={"UPMR"}
                                              itemType={"UPMR"}/>
                        </ListItem>
                        {/*<ListItem className={classes.listItems}>*/}
                        {/*    <Typography className={classes.listItemContents}>Gaining Roster</Typography>*/}
                        {/*    <Button className={classes.listItemContents} variant={"outlined"}*/}
                        {/*            onClick={() => handleUploadButtonClick("gaining")}>Upload</Button>*/}
                        {/*</ListItem>*/}

                        {/*<ListItem className={classes.listItems}>*/}
                        {/*    <Typography className={classes.listItemContents}>UMPR Roster</Typography>*/}
                        {/*    <Button className={classes.listItemContents} variant={"outlined"}*/}
                        {/*            onClick={() => handleUploadButtonClick("upmr")}>Upload</Button>*/}
                        {/*</ListItem>*/}
                    </List>
                </Fade>

                {renderFileDrops()}

            </Dialog>
        </div>
    );
}

export {
    FILE_UPLOAD_ACTIONS as FILE_UPLOAD
}
