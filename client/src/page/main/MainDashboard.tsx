import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";

const MainDashboard: React.FC = () => {

    const showUploadModal = useSelector(({showModal}: ApplicationState) => showModal.uploadModal);

    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        // dispatch(getMembers());
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <CssBaseline/>
        </div>
    );
};

export default MainDashboard;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
    }),
);






