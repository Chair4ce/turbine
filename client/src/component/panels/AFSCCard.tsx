import * as React from 'react';
import {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {PositionSerializer} from "../../util/PositionSerializer";
import PositionModel from "../../store/positions/models/PositionModel";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";

interface Props {
    afsc: string;
    pas: string
    mapKi: number;
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
        container: {},
        AFSCCard: {},
        cardInfo: {
            margin: 0,
            padding: 0,
            display: 'block',
            height: '100%',
            width: '100%',

        },
        cardHeader: {
            width: '100%',
            height: 27,
            display: 'flex',
            background: '#303030',
        },
        headerTitle: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        headerActionArea: {

        }
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

    function renderCardInfo() {
        return (
            <React.Fragment>
                {positions && positions.map((item: PositionModel, index: number) => {
                    return <div className={classes.cardInfo} key={index}>
                        <header className={classes.cardHeader}>
                            <Typography className={classes.headerTitle}>
                                {props.afsc.toUpperCase()}
                            </Typography>
                            <div className={classes.headerActionArea}>

                            </div>
                        </header>

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
            {renderCardInfo()}
        </Paper>

    );
};

export default AFSCCard;