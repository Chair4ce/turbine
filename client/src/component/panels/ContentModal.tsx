import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ManningChart from "./ManningChart";

interface Props {
    chartData: any[];
    callback: () => void;
    open: boolean;
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%'
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            width: '100%',
            height: '500px',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            outline: 'none'
        },
    }),
);

const ContentModal: React.FC<Props> = props => {
    const classes = useStyles();

    function handleClose() {
        props.callback();
    }

    return (
        <div className={classNames(props.className, classes.root)}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        { props.chartData ? <ManningChart chartData={props.chartData}/> : null}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default ContentModal;