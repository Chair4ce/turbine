import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {useState} from "react";
import MemberModel from "../../store/members/MemberModel";
import CurrentRosterRow from "./PanelRow";
import RowsBySkill from "./RowsBySkill";



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
            background: '#424651',
            width: '100%',
            height: 20,
            top: 0,
            zIndex: 120,
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
            padding: theme.spacing(1)
        },
        afscGroup: {
            display: 'block',
            width: '100%'
        },
        afscCount: {
            paddingRight: 20
        }
    }),
);

interface Props {
    uAFSC: string;
    members?: MemberModel[];
    className?: string;
}

const UniqueAFSCRows: React.FC<Props> = props => {
    const classes = useStyles();
    const [expanded, toggleExpanded] = useState(false);
    const handleClick = () => {
                toggleExpanded(prev => !prev)
    }


    return (
        <div className={classes.afscGroup}>
            <div className={classes.AFSCdivider} onClick={handleClick}>
                {expanded && <ExpandMoreIcon fontSize={"small"}/>}
                {!expanded && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.AFSCdividerText}>
                    {props.uAFSC}
                               </span>
                <span className={classes.afscCount}>
                    {props.members!.length}
                </span>
            </div>
            {props.members && expanded ? <RowsBySkill data={props.members}/> : null}
        </div>
    );
};

export default UniqueAFSCRows;