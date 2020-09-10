import * as React from 'react';
import {useState} from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import PositionModel from "../../store/positions/models/PositionModel";
import AFSCSkillContentRow from "./AFSCCkillContentRow";
import AssignedPositionModel from "../../store/positions/models/AssignedPositionModel";
import FundedAndUnfundedModel from "../../store/positions/models/FundedAndUnfundedModel";

interface Props {
    skillLevel: string;
    afsc: string;
    apositions: AssignedPositionModel[];
    className?: string;
    callBack: (afsc: string, assigned: number, authorized: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'block'
        },
        positionGroupHeader: {
            paddingLeft: 4,
            display: 'flex',
            justifyContent: 'start',
            cursor: 'pointer',
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
            cursor: 'pointer',
            width: 124
        },
        subheader_posNr: {
            width: 84,
            textAlign: 'center'
        },
        subheader_grdAuth: {
            width: 50
        },
        subheader_assigned: {
            width: 95,
            marginLeft: 16
        },
        subheader_deros: {
            marginLeft: 'auto',
            width: 50
        },
        subHeader: {
            height: 18,
            lineHeight: '18px',
            fontSize: '11px'
        },
        AFSCContentSubHeader: {
            width: '100%',
            height: 18,
            display: 'flex',
            fontSize: '11px'
        },
        critical: {
            color: '#c47f7f'
        },
        low: {
            color: '#c3ba7f'
        },
        full: {
            color: '#89b87c'
        },
        manningText: {
            lineHeight: '20px',
            cursor: 'pointer',
        }
    }),
);


const AFSCSkillContent: React.FC<Props> = props => {
        const classes = useStyles();
    const assigned = props.apositions.filter(item => item.assigned != null || item.position.nameAssigned != null).length
    const total = props.apositions.filter(item => item.position.currQtr == "1").length
        const manningPercent = () => {
            let assigned = props.apositions.filter(item => item.assigned != null || item.position.nameAssigned != null).length
            let total = props.apositions.filter(item => item.position.currQtr == "1").length
            return Math.round((assigned * 100) / total);
        }

        function between(x: number, min: number, max: number) {
            return x >= min && x <= max;
        }

        const funFunded = sortPositions();

        function sortPositions() {
            let fundedAndUnfunded = [] as FundedAndUnfundedModel[];
            for (let i = 0; i < props.apositions.length; i++) {
                if (props.apositions[i].position.currQtr == "1") {
                    let unfundedPositions = [] as AssignedPositionModel[];
                    unfundedPositions = props.apositions.filter((fpos: AssignedPositionModel) => fpos.position.posNr == props.apositions[i].position.posNr && fpos.position.currQtr == "0");
                    fundedAndUnfunded.push(new FundedAndUnfundedModel(props.apositions[i], unfundedPositions))
                }
            }
            return fundedAndUnfunded;
        }

        const [showPositions, toggleShowPositions] = useState(true);

        function renderFunded(funded: AssignedPositionModel, unfunded: AssignedPositionModel[], index: number) {
            return (
                <React.Fragment key={index}>
                    < AFSCSkillContentRow
                        aposition={funded}
                    />
                    {unfunded ? PositionModel.sortPosDescending(unfunded).map((pos: AssignedPositionModel) =>
                        <AFSCSkillContentRow key={pos.position.id} aposition={pos}/>) : null}
                </React.Fragment>
            )
        }

        function handleOpen() {
            if(props.afsc.charAt(3) === "X") {
                let newAfsc = props.afsc.substring(0,3) + props.skillLevel.substring(0, 1) + props.afsc.substring(4, props.afsc.length );
                console.log(newAfsc);
                props.callBack(newAfsc, assigned, total)
            } else {
            props.callBack(props.afsc, assigned, total)

            }
        }

        return (
            <div className={classNames(props.className, classes.root)}>
                <header className={classes.positionGroupHeader}>
                    <span className={classes.positionGroupHeaderText}>
                    {props.skillLevel}
                    </span>
                    <span
                        className={classNames(classes.manningText, between(manningPercent(), 0, 70) ? classes.critical : "", between(manningPercent(), 70, 80) ? classes.low : "", between(manningPercent(), 80, 5000) ? classes.full : "")}>
                    {props.apositions.length > 0 ? manningPercent() + "%" : ""}
                    </span>
                    <span className={classNames(classes.subHeader, classes.subheader_assigned)}>
                                {props.apositions ? "Assigned " + props.apositions.filter(item => item.assigned != null || item.position.nameAssigned != null).length : ""}
                    </span>
                    <span className={classNames(classes.subHeader, classes.subheader_assigned)}>
                                {props.apositions ? "funded " + props.apositions.filter(item => item.position.currQtr == "1").length : ""}
                    </span>
                    <span className={classNames(classes.subHeader, classes.subheader_assigned)}>
                                {props.apositions ? "unfunded " + props.apositions.filter(item => item.position.currQtr == "0").length : ""}
                    </span>
                    <button type="button" onClick={handleOpen}>
                        react-transition-group
                    </button>
                </header>
                <div className={classes.positionContent}>
                    <div className={classes.AFSCContentSubHeader}>
                <span className={classNames(classes.subHeader, classes.subheader_posNr)}>
                    POS NR
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