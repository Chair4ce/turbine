import * as React from 'react';
import {useState} from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MemberModel from "../../../store/members/models/MemberModel";
import RowsBySkill from "./RowsBySkillContainer";
import clsx from "clsx";
import {Collapse, Paper} from "@material-ui/core";
import RowsBySkillContainer from "./RowsBySkillContainer";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        AFSCdivider: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            height: 40,
            top: 15,
            zIndex: 123,
            position: 'sticky',
            borderBottom: '1px solid #ddd',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#5D8AA8',
                // color: '#333333',
            }
        },
        AFSCdividerText: {
            width: '100%',
        },
        afscGroup: {
            display: 'block',
            width: '100%'
        },
        afscCount: {
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

interface Props {
    uAFSC: string;
    members: MemberModel[] | undefined;
    className?: string;
}

const UniqueAFSCRows: React.FC<Props> = props => {
    const classes = useStyles();
    const [expanded, toggleExpanded] = useState(false);
    const handleClick = () => {
        toggleExpanded(prev => !prev)
    }

    const buttonClassname = clsx({
        [classes.expanded]: expanded,
        [classes.collapsed]: !expanded,
    });

    return (
        <div className={classes.afscGroup}>
            <div className={classNames(classes.AFSCdivider, props.className, buttonClassname)} onClick={handleClick}>
                {expanded && <ExpandMoreIcon fontSize={"small"}/>}
                {!expanded && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.AFSCdividerText}>
                    {props.uAFSC}
                               </span>
                <span className={classes.afscCount}>
                    {props.members!.length}
                </span>
            </div>
            {/*{props.members && expanded ?*/}
            <div className={classes.container}>
            <Collapse in={expanded} style={{width: '100%'}}>
                <Paper className={classes.paper}>
                    {props.members && <RowsBySkillContainer data={props.members} />}
                </Paper>
            </Collapse>
            </div>
            {/*: null}*/}
        </div>
    );
};

export default UniqueAFSCRows;