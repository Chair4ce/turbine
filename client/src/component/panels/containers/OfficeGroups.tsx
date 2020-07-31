import * as React from 'react';
import {useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MemberModel from "../../../store/members/MemberModel";
import RowsBySkill from "../rows/RowsBySkill";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        officeDivider: {
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
        officeDividerText: {
            width: '100%',
            padding: theme.spacing(1)
        },
        officeGroup: {
            display: 'block',
            width: '100%'
        },
        officeCount: {
            paddingRight: 20
        }
    }),
);

interface Props {
    key: number;
    office: string;
    members?: MemberModel[];
    className?: string;
}

const OfficeGroups: React.FC<Props> = props => {
    const classes = useStyles();
    const [expanded, toggleExpanded] = useState(false);
    const handleClick = () => {
        toggleExpanded(prev => !prev)
    }


    return (
        <div className={classes.officeGroup} key={props.key}>
            <div className={classes.officeDivider} onClick={handleClick}>
                {expanded && <ExpandMoreIcon fontSize={"small"}/>}
                {!expanded && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.officeDividerText}>
                    {props.office}
                               </span>
                <span className={classes.officeCount}>
                    {props.members!.length}
                </span>
            </div>
            {props.members && expanded ? <RowsBySkill data={props.members} className={'office'}/> : null}
        </div>
    );
};

export default OfficeGroups;