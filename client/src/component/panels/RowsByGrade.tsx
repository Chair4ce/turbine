import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CurrentRosterRow from "./PanelRow";
import MemberModel from "../../store/members/MemberModel";
import {useState} from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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
            borderBottom: '1px solid #ddd',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#5D8AA8',
                // color: '#333333',
            }
        },
        dividerText: {
            width: 20,
            padding: theme.spacing(1)
        }
    }),
);

const RowsByGrade: React.FC<Props> = props => {
    const classes = useStyles();

    const [showAmn, toggleAmn] = useState(false);
    const [showA1C, toggleA1C] = useState(false);
    const [showSRA, toggleSRA] = useState(false);
    const [showSSG, toggleSSG] = useState(false);
    const [showTSG, toggleTSG] = useState(false);
    const [showMSG, toggleMSG] = useState(false);
    const [showSMS, toggleSMS] = useState(false);
    const [showCMS, toggleCMS] = useState(false);

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
                {!showAmn && <NavigateNextIcon fontSize={"small"}/>}
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
                {!showA1C && <NavigateNextIcon fontSize={"small"}/>}
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
                {!showSRA && <NavigateNextIcon fontSize={"small"}/>}
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
                {!showSSG && <NavigateNextIcon fontSize={"small"}/>}
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
                {!showTSG && <NavigateNextIcon fontSize={"small"}/>}
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
                {!showMSG && <NavigateNextIcon fontSize={"small"}/>}
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
                {!showSMS && <NavigateNextIcon fontSize={"small"}/>}
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
                {!showCMS && <NavigateNextIcon fontSize={"small"}/>}
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