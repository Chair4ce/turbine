import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import PositionModel from "../../store/positions/models/PositionModel";
import moment from "moment";
import {Divider} from "@material-ui/core";
import AssignedPositionModel from "../../store/positions/models/AssignedPositionModel";

interface Props {
    aposition: AssignedPositionModel;
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: 26,
            display: 'block',
            fontSize: 12
        },
        posInfoArea: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 20,
            borderRadius: 3,
            background: '#ffffff',
            width: '172px',
            borderBottom: '5px solid #56899F',
        },
        posInfoGradeAuth: {
            width: 36
        },
        posInfoPosNr: {
            width: 80
        },
        unfunded: {
            borderBottom: '5px solid #906868'
        },
        funded: {
            borderBottom: '5px solid #56899F'
        },
        doubleBilleted: {
            borderBottom: '5px solid #000000'
        },
        assignedInfoArea: {
            marginLeft: 4,
            width: '100%',
            height: 20,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            background: '#ffffff',
            padding: 4,
            borderBottom: '5px solid #C4C4C4',
        },
        assignedInfoGrade: {
            width: 45
        },
        assignedInfoName: {
            width: 232,
            textAlign: 'start',
            paddingLeft: 6,
            overflowY: 'hidden'
        },
        assignedInfoDeros: {
            width: 63
        },
        posDivider: {
            background: '#000000'
        },

        AFSCContentInfo: {
            width: '100%',
            height: 26,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        infoText: {
            color: '#000000',
            fontSize: '13px',
            height: 20,
            lineHeight: '20px',
        }
    }),
);


const AFSCSkillContentRow: React.FC<Props> = props => {
    const classes = useStyles();

    function renderDeros() {
        if (props.aposition.assigned != null) {
            if (props.aposition.assigned.deros != null) {
                return moment(props.aposition.assigned.deros).format("MMM YY")
            }
        }
    }

    return (
        <div className={classNames(props.className, classes.root)}>

            <div className={classes.AFSCContentInfo}>
                <div
                    className={classNames(classes.posInfoArea, props.aposition.position.currQtr == "1" ? classes.funded : classes.unfunded)}>
                    <div className={classNames(classes.posInfoPosNr, classes.infoText)}>
                        {props.aposition.position.posNr}
                    </div>
                    <Divider orientation={"vertical"} className={classes.posDivider}>
                    </Divider>
                    <div className={classNames(classes.posInfoGradeAuth, classes.infoText)}>
                        {props.aposition.position.grdAuth}
                    </div>
                </div>
                <div className={classes.assignedInfoArea}>
                    <span className={classNames(classes.assignedInfoGrade, classes.infoText)}>
                        {props.aposition.position.gradeAssigned}
                    </span>
                    <span className={classNames(classes.assignedInfoName, classes.infoText)}>
                        {props.aposition.position.nameAssigned}
                    </span>
                    <span className={classNames(classes.assignedInfoDeros, classes.infoText)}>
                        {renderDeros()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AFSCSkillContentRow;