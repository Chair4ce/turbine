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
            width: '100%',
            padding: theme.spacing(1)
        }
    }),
);

const RowsBySkill: React.FC<Props> = props => {
    const classes = useStyles();
    const [show1lvl, toggle1lvl] = useState(false);
    const [show3lvl, toggle3lvl] = useState(false);
    const [show5lvl, toggle5lvl] = useState(false);
    const [show7lvl, toggle7lvl] = useState(false);
    const [show9lvl, toggle9lvl] = useState(false);

    const handleClick = (group: string) => {
        switch (group) {
            case '1lvl':
                toggle1lvl(prev => !prev)
                break;
            case '3lvl':
                toggle3lvl(prev => !prev)
                break;
            case '5lvl':
                toggle5lvl(prev => !prev)
                break;
            case '7lvl':
                toggle7lvl(prev => !prev)
                break;
            case '9lvl':
                toggle9lvl(prev => !prev)
                break;
        }
    }

    const sortAscendingGrade = (members: MemberModel[]) => {
        return members.sort(function (a, b) {
            return convertGradeValue(a.grade) > convertGradeValue(b.grade) ? -1 : 1;
        });
    }

    function convertGradeValue(grade: string) {
        switch (grade) {
            case 'AMN':
                return 1;
            case 'A1C':
                return 2;
            case 'SRA':
                return 3;
            case 'SSG':
                return 4;
            case 'TSG':
                return 5;
            case 'MSG':
                return 6;
            case 'SMS':
                return 7;
            case 'CMS':
                return 8;
            default :
                return 9;
        }
    }

    return (
        <div className={classNames(props.className, classes.root)}>
            <div className={classes.divider} onClick={() => handleClick('1lvl')}>
                {show1lvl && <ExpandMoreIcon fontSize={"small"}/>}
                {!show1lvl && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.dividerText}>
                    1 Level - Helper
                               </span>
            </div>

            {show1lvl && sortAscendingGrade(props.data.filter((member) => member.dafsc ? member.dafsc.charAt(3) === "1" : "")).map((row: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    name={row.fullName}
                    grade={row.grade}
                    afsc={row.dafsc}
                />)}
            <div className={classes.divider} onClick={() => handleClick('3lvl')}>
                {show3lvl && <ExpandMoreIcon fontSize={"small"}/>}
                {!show3lvl && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.dividerText}>
                    3 Level - Apprentice
                               </span>
            </div>
            {show3lvl && sortAscendingGrade(props.data.filter((member) => member.dafsc ? member.dafsc.charAt(3) === "3" : "")).map((row: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    name={row.fullName}
                    grade={row.grade}
                    afsc={row.dafsc}
                />)}
            <div className={classes.divider} onClick={() => handleClick('5lvl')}>
                {show5lvl && <ExpandMoreIcon fontSize={"small"}/>}
                {!show5lvl && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.dividerText}>
                    5 Level - Journeyman
                               </span>
            </div>
            {show5lvl && sortAscendingGrade(props.data.filter((member) => member.dafsc ? member.dafsc.charAt(3) === "5" : "")).map((row: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    name={row.fullName}
                    grade={row.grade}
                    afsc={row.dafsc}
                />)}
            <div className={classes.divider} onClick={() => handleClick('7lvl')}>
                {show7lvl && <ExpandMoreIcon fontSize={"small"}/>}
                {!show7lvl && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.dividerText}>
                    7 Level - Craftsman
                               </span>
            </div>
            {show7lvl && sortAscendingGrade(props.data.filter((member) => member.dafsc ? member.dafsc.charAt(3) === "7" : "")).map((row: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    name={row.fullName}
                    grade={row.grade}
                    afsc={row.dafsc}
                />)}
            <div className={classes.divider} onClick={() => handleClick('9lvl')}>
                {show9lvl && <ExpandMoreIcon fontSize={"small"}/>}
                {!show9lvl && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.dividerText}>
                    9 Level - Superintendent
                               </span>
            </div>
            {show9lvl && sortAscendingGrade(props.data.filter((member) => member.dafsc ? member.dafsc.charAt(3) === "9" : "")).map((row: any, index: number) =>
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

export default RowsBySkill;