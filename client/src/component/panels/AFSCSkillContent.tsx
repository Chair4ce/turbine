import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import PositionModel from "../../store/positions/models/PositionModel";
import {useState} from "react";
import AFSCSkillContentRow from "./AFSCCkillContentRow";
import AssignedPositionModel from "../../store/positions/models/AssignedPositionModel";

interface Props {
    skillLevel: string;
    apositions: AssignedPositionModel[];
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'block'
        },
        positionGroupHeader: {
            paddingLeft: 4,
            cursor: 'pointer',
            display: 'flex',
            width: '100%',
            height: 20,
            '&:hover': {
                backgroundColor: 'rgba(119,119,119,0.27)',
            }
        },
        positionContent: {
            width: '100%'
        },
        positionGroupHeaderText: {
            lineHeight: '20px',
            cursor: 'pointer'
        },
        subheader_posNr: {
            width: 77
        },
        subheader_grdAuth: {
            width: 50
        },
        subheader_assigned: {
            width: 95
        },
        subheader_deros: {
            marginLeft: 'auto',
            width: 50
        },
        subHeader: {
            height: 18,
            lineHeight: '18px'
        },
        AFSCContentSubHeader: {
            width: '100%',
            height: 18,
            display: 'flex',
            fontSize: '11px'
        },
    }),
);

const AFSCSkillContent: React.FC<Props> = props => {
    const classes = useStyles();

    const [showPositions, toggleShowPositions] = useState(true);

    return (
        <div className={classNames(props.className, classes.root)}>
            <header className={classes.positionGroupHeader}>
                <span className={classes.positionGroupHeaderText}>
                {props.skillLevel}
                </span>
            </header>
            <div className={classes.positionContent}>
                <div className={classes.AFSCContentSubHeader}>
                <span className={classNames(classes.subHeader, classes.subheader_posNr)}>
                    POS NR
                </span>
                    <span className={classNames(classes.subHeader, classes.subheader_grdAuth)}>
                    Grd
                </span>
                    <span className={classNames(classes.subHeader, classes.subheader_assigned)}>
                    Assigned
                </span>
                    <span className={classNames(classes.subHeader, classes.subheader_deros)}>
                    DEROS
                </span>
                </div>
                {showPositions && PositionModel.sortPosNrAscending(props.apositions).map((pos: AssignedPositionModel) => {
                    return <AFSCSkillContentRow key={pos.position.id} aposition={pos}/>
                })}
            </div>
        </div>
    );
};

export default AFSCSkillContent;