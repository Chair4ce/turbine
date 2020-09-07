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
import AFSCSkillRow from "./AFSCSkillContent";
import AFSCSkillContent from "./AFSCSkillContent";
import AssignedPositionModel from "../../store/positions/models/AssignedPositionModel";

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
            height: 433,
            width: 496,
            color: theme.palette.text.secondary,
            margin: 2,
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
        panelContent: {
            overflowY: 'auto',
            width: '100%',
            height: '100%',
            display: 'block',
            padding: 4
        },
        panelFooter: {}
    }),
);

const AFSCCard: React.FC<Props> = props => {
    const classes = useStyles();
    const [allOtherPositions, setAllOtherPositions] = useState([] as AssignedPositionModel[]);
    const [lvl3Positions, setlvl3Positions] = useState([] as AssignedPositionModel[]);
    const [lvl5Positions, setlvl5Positions] = useState([] as AssignedPositionModel[]);
    const [lvl7Positions, setlvl7Positions] = useState([] as AssignedPositionModel[]);

    useEffect(() => {

        fetch(`/positions/${props.pas}/${props.afsc}`,
            {
                method: 'get',
            })
            .then(response => response.json())
            .then(json => handleResponse(PositionSerializer.serializeAssignedPositionsFromBackend(json)))
            .catch(reason => console.log(`Fetch failed: ${reason}`));

    }, []);

    const handleResponse = (positions: AssignedPositionModel[]) => {


        setAllOtherPositions(positions.filter((apos: AssignedPositionModel) => {
            return apos.position.afscAuth.charAt(3) !== "3" && apos.position.afscAuth.charAt(3) !== "5" && apos.position.afscAuth.charAt(3) !== "7"
        }));
        if (props.afsc.charAt(3) === "X") {
            setlvl3Positions(positions.filter((apos: AssignedPositionModel) => apos.position.afscAuth.charAt(3) === "3"));
            setlvl5Positions(positions.filter((apos: AssignedPositionModel) => apos.position.afscAuth.charAt(3) === "5"));
            setlvl7Positions(positions.filter((apos: AssignedPositionModel) => apos.position.afscAuth.charAt(3) === "7"));
        }


    };

    function handlePanelClose() {
        props.callback(props.afsc)
    }

    function renderCardInfo() {
        return (
            <React.Fragment>
                <AFSCSkillContent skillLevel={"3 level"} apositions={lvl3Positions}/>
                <AFSCSkillContent skillLevel={"5 level"} apositions={lvl5Positions}/>
                <AFSCSkillContent skillLevel={"7 level"} apositions={lvl7Positions}/>
                <AFSCSkillContent skillLevel={"Misc"} apositions={allOtherPositions}/>
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