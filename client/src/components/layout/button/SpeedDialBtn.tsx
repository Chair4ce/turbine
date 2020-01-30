import * as React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';

interface Props {
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "fixed",
            bottom: 0,
            right: 0,
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
            right: theme.spacing(2),
        },
    }),
);

const actions = [
    { icon: <FileCopyIcon />, name: 'Upload' },
    { icon: <SaveIcon />, name: 'Task' },
];

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

    return (
        <div className={classes.root}>
            {/*<Button onClick={handleVisibility}>Toggle Speed Dial</Button>*/}
            <Backdrop open={open}  timeout={10}/>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                className={classes.speedDial}
                hidden={hidden}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map(action => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={handleClose}
                        title={'Member Actions'}/>
                ))}
            </SpeedDial>
        </div>
    );
};

export default SpeedDialBtn;