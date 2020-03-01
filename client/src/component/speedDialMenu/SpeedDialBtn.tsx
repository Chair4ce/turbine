import * as React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import TurbineIcon from "../icon/TurbineLogo";
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "fixed",
            bottom: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            transform: 'translateZ(0px)',
            flexGrow: 1,
            zIndex: 1000,
            pointerEvents: 'none',
        },
        speedDial: {
            position: 'absolute',
            bottom: theme.spacing(2),
            left: theme.spacing(1),
        },
    }),
);

interface Props {
    callbackHandler: (type: string, data?: any) => void;
}


const VIEW_CALLBACK_ENUMS = {
    CHILD_TOGGLE_UPLOAD: 'SPEED_DIAL/SHOW_UPLOAD',
    CHILD_TOGGLE_TASK: 'SPEED_DIAL/SHOW_TASK',
};

const SpeedDialBtn: React.FC<Props> = props => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [hidden] = React.useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onShowUploadModalClick = () => {
        props.callbackHandler(
            VIEW_CALLBACK_ENUMS.CHILD_TOGGLE_UPLOAD,
            true
        )
    };

    // const onShowTaskModalClick = () => {
    //     props.callbackHandler(
    //         VIEW_CALLBACK_ENUMS.CHILD_TOGGLE_TASK,
    //         true
    //     )
    // };


    const actions = [
        {icon: <FileCopyIcon onClick={onShowUploadModalClick}/>, name: 'Upload'},
        // {icon: <SaveIcon onClick={onShowTaskModalClick}/>, name: 'Task'},
    ];

    return (
        <div className={classes.root}>
            {/*<Button onClick={handleVisibility}>Toggle Speed Dial</Button>*/}
            <Backdrop open={open} timeout={10}/>
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classNames(classes.speedDial, 'DialIcon')}
                hidden={hidden}
                icon={<TurbineIcon/>}
                direction={"right"}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map(action => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        // onClick={handleClose}
                        tooltipTitle={action.name}
                        tooltipPlacement={"top"}/>
                ))}
            </SpeedDial>
        </div>
    );
};

export default SpeedDialBtn;

export {
    VIEW_CALLBACK_ENUMS as CALLBACK_ENUMS,
};