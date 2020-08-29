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
import {Button, Dialog} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {useDispatch, useSelector} from "react-redux";
// @ts-ignore
import {ApplicationState} from "../../store";
import {FILE_UPLOAD, FileUpload} from "./FileUpload";
import {AlphaReviewTableConnected} from "./AlphaReviewTable";
import StagingUploadMemberModel from "../../store/members/models/StagingUploadMemberModel";
import {stageMemberUploadData} from "../../store/members";
import Grow from "@material-ui/core/Grow";
import Collapse from "@material-ui/core/Collapse";
import Fade from "@material-ui/core/Fade";

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
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: 400
        },
        listItemContents: {
            margin: theme.spacing(2)
        },
        uploadItem: {
            height: '100%',
            justifyContent: 'center'
        },
        uploadBtn: {
            marginBottom: 10,
            position: 'fixed',
            bottom: 0,
            left: '10px',
            width: 'calc(100vw - 20px)',
        },
        table: {
            width: '100%'
        },
        fileDataSummary: {
            textAlign: 'center',
            alignItems: 'center'
        },
        uploadContent: {
            display: 'block',
            width: '100%',
            height: '100%',
            padding: theme.spacing(2),
        },
        paper: {
            width: 600,
            height: '100%',
            alignItems: 'center'
        },
        fullScreenDialog: {
            alignItems: 'center'
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

export const AppSettingsPage: React.FC<Props> = props => {
    const loading: boolean = useSelector(({members}: ApplicationState) => members.loading);
    const stagedMembers: StagingUploadMemberModel[] = useSelector(({members}: ApplicationState) => members.upload);
    const [error, updateError] = useState("");
    const [alphaSuccess, updateAlphaSuccess] = useState(false);
    const [alphaUpload, showAlphaUpload] = useState(false);
    const [gainingSuccess, updateGainingSuccess] = useState(false);
    const [upmrSuccess, updateUpmrSuccess] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();

    function childCallBackHandler(type: string, status: boolean, data?: string) {
        switch (type) {
            case FILE_UPLOAD.ALPHA_SUCCESS:
                updateAlphaSuccess(status);
                break;
            case FILE_UPLOAD.GAINING_SUCCESS:
                updateGainingSuccess(status);
                break;
            case FILE_UPLOAD.UPMR_SUCCESS:
                updateUpmrSuccess(status);
                break;
        }
    }


    const handleClose = () => {
        dispatch(stageMemberUploadData([]));
        showAlphaUpload(false);
        props.callBack();
    };

    function handleUploadButtonClick(type: string) {
        switch (type) {
            case "alpha":
                showAlphaUpload(true);
                break;
            case "gaining":
                break;
        }

    };


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
                            Upload Alpha Roster
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

                <Collapse in={!alphaUpload}>
                    <Fade in={!alphaUpload}>
                        <List>
                            <ListItem className={classes.listItems}>
                                <Typography className={classes.listItemContents}>Alpha Roster</Typography>
                                <Button className={classes.listItemContents} variant={"outlined"}
                                        onClick={() => handleUploadButtonClick("alpha")}>Upload</Button>
                            </ListItem>

                            <ListItem className={classes.listItems}>
                                <Typography className={classes.listItemContents}>Gaining Roster</Typography>
                                <Button className={classes.listItemContents} variant={"outlined"}
                                        onClick={() => handleUploadButtonClick("gaining")}>Upload</Button>
                            </ListItem>

                            <ListItem className={classes.listItems}>
                                <Typography className={classes.listItemContents}>UMPR Roster</Typography>
                                <Button className={classes.listItemContents} variant={"outlined"}
                                        onClick={() => handleUploadButtonClick("upmr")}>Upload</Button>
                            </ListItem>
                        </List>
                    </Fade>
                </Collapse>

                <Grow in={alphaUpload}>
                    <div className={classes.uploadContent}>

                        {stagedMembers.length > 0 ?
                            <div className={classes.uploadContent}>

                                <AlphaReviewTableConnected loading={false} title={"Review Upload"} filtering={true}
                                                           edit={true}
                                                           grouping={true} search={true} selection={false}
                                                           exportButton={false}/>
                                <Button
                                    onClick={handleClose}
                                    variant="contained"
                                    color="default"
                                    className={classes.uploadBtn}
                                    startIcon={<CloudUploadIcon/>}
                                >
                                    Upload
                                </Button>
                            </div>
                            :
                            <FileUpload parentCallback={childCallBackHandler}/>}

                    </div>

                </Grow>


            </Dialog>
        </div>
    );
}
