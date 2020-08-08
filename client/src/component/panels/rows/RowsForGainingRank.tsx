import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import * as React from "react";
import {useState} from "react";
import clsx from "clsx";
import classNames from "classnames";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {Collapse, Paper} from "@material-ui/core";
import CurrentRosterRow from "./PanelRow";
import GainingMemberModel from "../../../store/members/models/GainingMemberModel";

interface Props {
    members: GainingMemberModel[];
    rank: string;
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        gradedivider: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            background: '#cbcbcb',
            width: '100%',
            height: 29,
            top: 75,
            zIndex: 120,
            position: 'sticky',
            borderBottom: '1px solid #ddd',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#5D8AA8',
                // color: '#333333',
            }
        },
        gradeDividerText: {
            width: '100%',
            paddingLeft: theme.spacing(1)
        },
        memberCountText: {
            paddingRight: 20
        },
        expanded: {
            background: '#b3b3b3',
            color: 'black',
        },
        collapsed: {
            background: '#424651',
        },
        container: {
            display: 'flex',
            width: '100%'
        },
        paper: {
            width: '100%'
        },
        item: {
            display: 'flex',
            width: '100%',
            minHeight: 65,
            alignItems: 'center',
            borderBottom: '1px solid #ddd',
            color: '#33333',
            '&:hover': {
                backgroundColor: 'rgba(180,180,180,0.27)',
            }
        }
    }),
);

const RowsForGainingRank: React.FC<Props> = props => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const BarClassName = clsx({
        [classes.expanded]: expanded,
        [classes.collapsed]: !expanded,
    });

    function handleClick() {
        setExpanded(prev => !prev);
    }

    return (
        <div className={ classes.root}>
            <div className={classNames(classes.gradedivider, BarClassName, props.className)} onClick={handleClick}>
                {expanded && <ExpandMoreIcon fontSize={"small"}/>}
                {!expanded && <NavigateNextIcon fontSize={"small"} style={{zIndex: 118}}/>}
                <span className={classes.gradeDividerText}>
                    {props.rank}
                               </span>
                <span className={classes.memberCountText}>
                {props.members.length}
                </span>
            </div>
            <div className={classes.container}>
                <Collapse in={expanded} style={{width: '100%'}}>
                    <Paper className={classes.paper}>
                        {props.members ? props.members.map((rowData: any) =>
                            <CurrentRosterRow
                                key={rowData.id}
                                className={classes.item}
                                gradeClassName={rowData.grade}
                                data={rowData}
                            />): null}
                    </Paper>
                </Collapse>
            </div>
        </div>
    );
};

export default RowsForGainingRank;