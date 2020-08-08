import * as React from 'react';
import {useState} from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {Collapse, Paper} from "@material-ui/core";
import RowsByRankContainer from "./RowsByRankContainer";
import clsx from "clsx";
import MemberModel from "../../../store/members/models/MemberModel";

interface Props {
    members: MemberModel[];
    skillTitle: string;
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        skilldivider: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            background: '#a8a8a8',
            width: '100%',
            height: 30,
            top: 55,
            zIndex: 121,
            position: 'sticky',
            borderBottom: '1px solid #ddd',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#5D8AA8',
                // color: '#333333',
            }
        },
        skilldividerText: {
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
        }
    }),
);

const RowsForSkill: React.FC<Props> = props => {
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
        <div className={classNames(props.className, classes.root)}>
            <div className={classNames(classes.skilldivider, BarClassName)} onClick={handleClick}>
                {expanded && <ExpandMoreIcon fontSize={"small"}/>}
                {!expanded && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.skilldividerText}>
                    {props.skillTitle}
                               </span>
                <span className={classes.memberCountText}>
                {props.members.length}
                </span>
            </div>
            <div className={classes.container}>
                <Collapse in={expanded} style={{width: '100%'}}>
                    <Paper className={classes.paper}>
                        {props.members && <RowsByRankContainer data={props.members} bigSticky={true}/>}
                    </Paper>
                </Collapse>
            </div>
        </div>
    );
};

export default RowsForSkill;