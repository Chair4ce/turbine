import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import PositionModel from "../../store/positions/models/PositionModel";
import {useEffect, useState} from "react";
import AFSCSkillContentRow from "./AFSCCkillContentRow";
import AssignedPositionModel from "../../store/positions/models/AssignedPositionModel";
import FundedAndUnfundedModel from "../../store/positions/models/FundedAndUnfundedModel";
import {PositionSerializer} from "../../util/PositionSerializer";
import {useDispatch} from "react-redux";

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
    const dispatch = useDispatch();

    const funFunded = sortPositions();

    function sortPositions() {
        let fundedAndUnfunded = [] as FundedAndUnfundedModel[];
        for (let i = 0; i < props.apositions.length; i++) {

            if (props.apositions[i].position.currQtr == "1") {
                let unfundedPositions = [] as AssignedPositionModel[];
                unfundedPositions = props.apositions.filter((fpos: AssignedPositionModel) => fpos.position.posNr == props.apositions[i].position.posNr && fpos.position.currQtr == "0");
                    fundedAndUnfunded.push(new FundedAndUnfundedModel(props.apositions[i], unfundedPositions))
                console.log(unfundedPositions)
            }

        }

        return fundedAndUnfunded;
    }

    const [showPositions, toggleShowPositions] = useState(true);


function renderFunded(funded: AssignedPositionModel, unfunded: AssignedPositionModel[], index: number) {
    return (
        <React.Fragment key={funded.position.posNr}>
            < AFSCSkillContentRow
                aposition={funded}
            />
            {unfunded ? PositionModel.sortPosDescending(unfunded).map((pos: AssignedPositionModel) => <AFSCSkillContentRow key={pos.position.id} aposition={pos}/>) : null}
        </React.Fragment>
    )
}

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
            {showPositions && funFunded.map((fundedAndUnfunded: FundedAndUnfundedModel, index) => {
                return renderFunded(fundedAndUnfunded.position, fundedAndUnfunded.unfunded, index)
            })}
        </div>
    </div>
);
}
;

export default AFSCSkillContent;