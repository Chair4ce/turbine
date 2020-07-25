import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CurrentRosterRow from "./PanelRow";
import MemberModel from "../../store/members/MemberModel";
import {useState} from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

interface Props {
    data: MemberModel[];
    className?: string;
}

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
            cursor: 'pointer',
            borderBottom: '1px solid #ddd'
        },
        dividerText: {
            width: 20,
            padding: theme.spacing(1)
        }
    }),
);

const RowsByGrade: React.FC<Props> = props => {
    const classes = useStyles();

    const [showAmn, toggleAmn] = useState(true);
    const [showA1C, toggleA1C] = useState(true);
    const [showSRA, toggleSRA] = useState(true);
    const [showSSG, toggleSSG] = useState(true);
    const [showTSG, toggleTSG] = useState(true);
    const [showMSG, toggleMSG] = useState(true);
    const [showSMS, toggleSMS] = useState(true);
    const [showCMS, toggleCMS] = useState(true);

    const handleClick = (group: string) => {
        switch (group) {
            case 'AMN':
                toggleAmn(prev => !prev)
                break;
            case 'A1C':
                toggleA1C(prev => !prev)
                break;
            case 'SRA':
                toggleSRA(prev => !prev)
                break;
            case 'SSG':
                toggleSSG(prev => !prev)
                break;
            case 'TSG':
                toggleTSG(prev => !prev)
                break;
            case 'MSG':
                toggleMSG(prev => !prev)
                break;
            case 'SMS':
                toggleSMS(prev => !prev)
                break;
            case 'CMS':
                toggleCMS(prev => !prev)
                break;
        }
    }

    return (
        <div className={classNames(props.className, classes.root)}>
            <div className={classes.divider} onClick={() => handleClick('AMN')}>
                {showAmn && <ExpandMoreIcon fontSize={"small"}/>}
                {!showAmn && <ExpandLessIcon fontSize={"small"}/>}
                <span className={classes.dividerText}>
                    AMN
                               </span>
            </div>

            {props.data && showAmn && props.data.filter((member) => member.grade === 'AMN').map((row: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    name={row.fullName}
                    grade={row.grade}
                    afsc={row.dafsc}
                />)}
            <div className={classes.divider} onClick={() => handleClick('A1C')}>
                {showA1C && <ExpandMoreIcon fontSize={"small"}/>}
                {!showA1C && <ExpandLessIcon fontSize={"small"}/>}
                <span className={classes.dividerText}>
                    A1C
                               </span>
            </div>
            {props.data && showA1C && props.data.filter((member) => member.grade === 'A1C').map((row: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    name={row.fullName}
                    grade={row.grade}
                    afsc={row.dafsc}
                />)}
            <div className={classes.divider} onClick={() => handleClick('SRA')}>
                {showSRA && <ExpandMoreIcon fontSize={"small"}/>}
                {!showSRA && <ExpandLessIcon fontSize={"small"}/>}
                <span className={classes.dividerText}>
                    SRA
                               </span>
            </div>
            {props.data && showSRA && props.data.filter((member) => member.grade === 'SRA').map((row: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    name={row.fullName}
                    grade={row.grade}
                    afsc={row.dafsc}
                />)}
            <div className={classes.divider} onClick={() => handleClick('SSG')}>
                {showSSG && <ExpandMoreIcon fontSize={"small"}/>}
                {!showSSG && <ExpandLessIcon fontSize={"small"}/>}
                <span className={classes.dividerText}>
                    SSG
                               </span>
            </div>
            {props.data && showSSG && props.data.filter((member) => member.grade === 'SSG').map((row: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    name={row.fullName}
                    grade={row.grade}
                    afsc={row.dafsc}
                />)}
            <div className={classes.divider} onClick={() => handleClick('TSG')}>
                {showTSG && <ExpandMoreIcon fontSize={"small"}/>}
                {!showTSG && <ExpandLessIcon fontSize={"small"}/>}
                <span className={classes.dividerText}>
                    TSG
                               </span>
            </div>
            {props.data && showTSG && props.data.filter((member) => member.grade === 'TSG').map((row: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    name={row.fullName}
                    grade={row.grade}
                    afsc={row.dafsc}
                />)}
            <div className={classes.divider} onClick={() => handleClick('MSG')}>
                {showMSG && <ExpandMoreIcon fontSize={"small"}/>}
                {!showMSG && <ExpandLessIcon fontSize={"small"}/>}
                <span className={classes.dividerText}>
                    MSG
                               </span>
            </div>
            {props.data && showMSG && props.data.filter((member) => member.grade === 'MSG').map((row: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    name={row.fullName}
                    grade={row.grade}
                    afsc={row.dafsc}
                />)}
            <div className={classes.divider} onClick={() => handleClick('SMS')}>
                {showSMS && <ExpandMoreIcon fontSize={"small"}/>}
                {!showSMS && <ExpandLessIcon fontSize={"small"}/>}
                <span className={classes.dividerText}>
                    SMS
                               </span>
            </div>
            {props.data && showSMS && props.data.filter((member) => member.grade === 'SMS').map((row: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    name={row.fullName}
                    grade={row.grade}
                    afsc={row.dafsc}
                />)}
            <div className={classes.divider} onClick={() => handleClick('CMS')}>
                {showCMS && <ExpandMoreIcon fontSize={"small"}/>}
                {!showCMS && <ExpandLessIcon fontSize={"small"}/>}
                <span className={classes.dividerText}>
                    CMS
                               </span>
            </div>
            {props.data && showCMS && props.data.filter((member) => member.grade === 'CMS').map((row: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    name={row.fullName}
                    grade={row.grade}
                    afsc={row.dafsc}
                />)}
        </div>
    );
};

export default RowsByGrade;