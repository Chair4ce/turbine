import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CurrentRosterRow from "./PanelRow";
import MemberModel from "../../store/members/MemberModel";
import {useState} from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import UniqueAFSCContainer from "./UniqueAFSCRows";
import UniqueAFSCRows from "./UniqueAFSCRows";
import UniqueAFSCCollection from "../../store/members/genericAFSCModel";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        divider: {
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
        dividerText: {
            width: '100%',
            padding: theme.spacing(1)
        },
        afscGroup: {
            display: 'block',
            width: '100%'
        }
    }),
);
interface Props {
    data: UniqueAFSCCollection[];
    className?: string;
}

const RowsByAFSCContainer: React.FC<Props> = props => {
    const classes = useStyles();


    return (
        <div className={classNames(props.className, classes.root)}>
            {props.data.map((m: UniqueAFSCCollection, index) =>
             <UniqueAFSCRows key={index} uAFSC={m.genericAFSC} members={m.members}/>
            )}
        </div>
    );
};

export default RowsByAFSCContainer;