import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import clsx from "clsx";
import {green} from "@material-ui/core/colors";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
        },
        listItemContents: {
            margin: theme.spacing(2)
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        buttonLoading: {

        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
        actionButton: {
            height: 30,
        }
    }),
);

interface Props {
    itemTitle: string;
    itemType: string;
    callback: (type: string) => void;
    className?: string;
}

const SettingsListItem: React.FC<Props> = props => {
    const classes = useStyles();
    const membersLoading: boolean = useSelector(({members}: ApplicationState) => members.loading);
    const gainingLoading: boolean = useSelector(({members}: ApplicationState) => members.gainingLoading);
    const upmrLoading: boolean = useSelector(({positions}: ApplicationState) => positions.loading);

    const successAlpha: boolean = useSelector(({members}: ApplicationState) => members.successAlpha);
    const successGaining: boolean = useSelector(({members}: ApplicationState) => members.successGaining);
    const successUpmr: boolean = useSelector(({positions}: ApplicationState) => positions.success);

    const AlphaButtonClassname = clsx({
        [classes.buttonSuccess]: successAlpha,
        [classes.buttonLoading]: membersLoading,
    });
    const GainingButtonClassname = clsx({
        [classes.buttonSuccess]: successGaining,
        [classes.buttonLoading]: gainingLoading,
    });
    const UpmrButtonClassname = clsx({
        [classes.buttonSuccess]: successUpmr,
        [classes.buttonLoading]: upmrLoading,
    });

    function returnItemContents() {
        switch(props.itemType) {
            case "alpha":
                return  <div className={classes.wrapper}>
                    <Button
                        variant="outlined"
                        className={classNames(AlphaButtonClassname, classes.actionButton, "Alpha")}
                        disabled={membersLoading}
                        onClick={() => props.callback("alpha")}
                    >
                        Upload
                    </Button>
                    {membersLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                </div>
            case "gaining":
                return  <div className={classes.wrapper}>
                    <Button
                        variant="outlined"
                        className={classNames(GainingButtonClassname, classes.actionButton, "Gaining")}
                        disabled={gainingLoading}
                        onClick={() => props.callback("gaining")}
                    >
                        Upload
                    </Button>
                    {gainingLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                </div>
            case "UPMR":
                return  <div className={classes.wrapper}>
                    <Button
                        variant="outlined"
                        className={classNames(UpmrButtonClassname, classes.actionButton, "UPMR")}
                        disabled={upmrLoading}
                        onClick={() => props.callback("UPMR")}
                    >
                        Upload
                    </Button>
                    {upmrLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                </div>

        }

    }


    return (
        <div className={classes.root}>
            <Typography className={classes.listItemContents}>{props.itemTitle}</Typography>
            {returnItemContents()}
        </div>
    );
};

export default SettingsListItem;