import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import moment from "moment";
import AssignedPositionModel from "../../store/positions/models/AssignedPositionModel";
import {useEffect, useState} from "react";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";
import {Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

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
            height: 22,
            borderRadius: 3,
            background: '#ffffff',
            width: '172px',
            borderBottom: '3px solid #56899F',
        },
        assignedInfoArea: {
            marginLeft: 4,
            width: '100%',
            height: 22,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            background: '#ffffff',
            borderBottom: '3px solid #C4C4C4',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'rgb(132,132,132)',
            },
        },
        posInfoGradeAuth: {
            width: 36,
            textAlign: 'center'
        },
        posInfoPosNr: {
            width: 80,
            textAlign: 'center'
        },
        unfunded: {
            background: '#c8c8c8',
            borderBottom: '3px solid #ffffff'
        },
        funded: {
            borderBottom: '3px solid #56899F'
        },
        doubleBilleted: {
            borderBottom: '3px solid #000000'
        },
        assignedInfoGrade: {
            width: 45,
            textAlign: 'center'
        },
        assignedInfoName: {
            width: 232,
            textAlign: 'start',
            paddingLeft: 6,
            overflowY: 'hidden'
        },
        assignedInfoDeros: {
            width: 63,
            textAlign: 'center'
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
        },
        positionErrorIcon: {
        }
    }),
);

const AFSCSkillContentRow: React.FC<Props> = props => {
    const classes = useStyles();

    const [positionError, setPositionError] = useState("");

    useEffect(() => {
        if (props.aposition.position.nameAssigned != null && props.aposition.assigned == null) {
            setPositionError("Could not find " + props.aposition.position.nameAssigned + " from Alpha Roster");
        }
    }, [props.aposition.assigned,props.aposition.position.nameAssigned])

    const HtmlTooltip = withStyles((theme: Theme) => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 240,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }))(Tooltip);

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
                <div
                    className={classNames(classes.assignedInfoArea, props.aposition.position.currQtr == "1" ? classes.funded : classes.unfunded)}>
                    <span className={classNames(classes.assignedInfoGrade, classes.infoText)}>
                        {props.aposition.position.gradeAssigned}
                    </span>
                    <span className={classNames(classes.assignedInfoName, classes.infoText)}>
                        {props.aposition.position.nameAssigned ? props.aposition.position.nameAssigned.toUpperCase() : ""}
                    </span>
                    <span className={classNames(classes.assignedInfoDeros, classes.infoText)}>
                        {props.aposition.position.nameAssigned != null ? props.aposition.assigned != null ? props.aposition.assigned.deros != null ? moment(props.aposition.assigned.deros).format("MMM YY") : "No Data" : null : null}
                        {positionError ? <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">Missing Data from Alpha Roster</Typography>
                                        <em>{"Could not find member: "}</em>
                                        {' '}<u>{props.aposition.position.nameAssigned}</u>
                                    </React.Fragment>
                                }
                            >
                                <ErrorOutlineIcon fontSize="small" className={classes.positionErrorIcon}/>
                            </HtmlTooltip>
                            : null}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AFSCSkillContentRow;