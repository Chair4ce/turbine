import * as React from 'react';
import {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {PositionSerializer} from "../../util/PositionSerializer";
import PositionModel from "../../store/positions/models/PositionModel";
import Paper from "@material-ui/core/Paper";
import {Button, Typography} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import classNames from "classnames";
import Fade from "@material-ui/core/Fade";

interface Props {
    afsc: string;
    pas: string
    mapKi: number;
    callback: (afsc: string) => void;
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
            width: 494,
            color: theme.palette.text.secondary,
            margin: 10,
            overflowY: 'hidden'
        },
        afscCard: {
            margin: 0,
            padding: 0,
            display: 'block',
            height: '100%',
            width: '100%',
        },
        closeBtnArea: {
            // height: 34,
            // width: 34,
            margin: 2
            // marginRight: 2,
            // borderRadius: 4,
            // transition: 'background-color 100ms ease-in',
            // '&:hover': {
            //     backgroundColor: 'rgba(119,119,119,0.27)',
            // }
        },
        cardHeader: {
            width: '100%',
            height: 40,
            background: '#303030',
            display: 'flex',
            alignItems: 'center',
        },
        headerTitle: {
            fontSize: 22,
            fontWeight: 'bold',
            marginLeft: 11,
        },
        headerActionArea: {
            marginLeft: 'auto',
        },
        panelContent: {},
        panelFooter: {}
    }),
);

const AFSCCard: React.FC<Props> = props => {
    const classes = useStyles();
    const [positions, setPositions] = useState([] as PositionModel[]);

    useEffect(() => {

        fetch(`/positions/${props.pas}/${props.afsc}`,
            {
                method: 'get',
            })
            .then(response => response.json())
            .then(json => handleResponse(PositionSerializer.serializeFromBackend(json)))
            .catch(reason => console.log(`Fetch failed: ${reason}`));

    }, []);

    const handleResponse = (positions: PositionModel[]) => {
        setPositions(positions);
    };

    function handlePanelClose() {
        props.callback(props.afsc)
    }

    function renderCardInfo() {
        return (
            <React.Fragment>
                {positions && positions.map((item: PositionModel, index: number) => {
                    return <div key={index}>
                        <span>{"POS NR: " + item.posNr} </span>
                        <span>{"AFSC Auth: " + item.afscAuth} </span>
                        <span>{"Grade Auth: " + item.grdAuth} </span>
                        <span>{"Member Assigned: " + item.mbrIdAssigned} </span>
                        <span>{"DAFSC Assigned: " + item.dafscAssigned} </span>
                    </div>
                })}
            </React.Fragment>
        )
    }

    return (
        <Paper className={classes.paper} key={props.mapKi}>
            <Fade in={true} exit={true}>
                <div className={classes.afscCard}>
                    <header className={classes.cardHeader}>
                        <Typography className={classes.headerTitle}>
                            {props.afsc.toUpperCase()}
                        </Typography>
                        <div className={classes.headerActionArea}>

                        </div>
                        <div className={classNames(classes.closeBtnArea)}>
                            <Button onClick={handlePanelClose}>
                                <CloseIcon color={"action"}/>
                            </Button>
                        </div>
                    </header>
                    <div className={classes.panelContent}>
                        {renderCardInfo()}
                    </div>
                    <div className={classes.panelFooter}>
                    </div>
                </div>
            </Fade>
        </Paper>

    );
};

export default AFSCCard;