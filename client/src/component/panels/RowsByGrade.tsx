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
        gradedivider: {
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
        gradeDividerText: {
            width: '100%',
            padding: theme.spacing(1)
        },
        memberCountText: {
            paddingRight: 20
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
    const [showNoGrade, toggleNoGrade] = useState(false);

    const Amn: MemberModel[] = props.data.filter(rowData => rowData.grade === 'AMN');
    const A1c: MemberModel[] = props.data.filter(rowData => rowData.grade === 'A1C');
    const Sra: MemberModel[] = props.data.filter(rowData => rowData.grade === 'SRA');
    const Ssg: MemberModel[] = props.data.filter(rowData => rowData.grade === 'SSG');
    const Tsg: MemberModel[] = props.data.filter(rowData => rowData.grade === 'TSG');
    const Msg: MemberModel[] = props.data.filter(rowData => rowData.grade === 'MSG');
    const Sms: MemberModel[] = props.data.filter(rowData => rowData.grade === 'SMS');
    const Cms: MemberModel[] = props.data.filter(rowData => rowData.grade === 'CMS');
    const NoGrd: MemberModel[] = props.data.filter(rowData => rowData.grade === '');


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
            case 'NoGrd':
                toggleNoGrade(prev => !prev)
                break;
        }
    }

    return (
        <div className={classNames(props.className, classes.root)}>
            <div className={classes.gradedivider} onClick={() => handleClick('AMN')}>
                {showAmn && <ExpandMoreIcon fontSize={"small"}/>}
                {!showAmn && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.gradeDividerText}>
                    AMN
                               </span>
                <span className={classes.memberCountText}>
                {Amn.length}
                </span>
            </div>
            {showAmn && Amn.map((rowData: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    data={rowData}
                />)}

            <div className={classes.gradedivider} onClick={() => handleClick('A1C')}>
                {showA1C && <ExpandMoreIcon fontSize={"small"}/>}
                {!showA1C && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.gradeDividerText}>
                    A1C
                               </span>
                <span className={classes.memberCountText}>
                {A1c.length}
                </span>
            </div>
            {showA1C && A1c.map((rowData: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    data={rowData}
                />)}

            <div className={classes.gradedivider} onClick={() => handleClick('SRA')}>
                {showSRA && <ExpandMoreIcon fontSize={"small"}/>}
                {!showSRA && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.gradeDividerText}>
                    SRA
                               </span>
                <span className={classes.memberCountText}>
                {Sra.length}
                </span>
            </div>
            {showSRA && Sra.map((rowData: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    data={rowData}
                />)}

            <div className={classes.gradedivider} onClick={() => handleClick('SSG')}>
                {showSSG && <ExpandMoreIcon fontSize={"small"}/>}
                {!showSSG && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.gradeDividerText}>
                    SSG
                               </span>
                <span className={classes.memberCountText}>
                {Ssg.length}
                </span>
            </div>
            {showSSG && Ssg.map((rowData: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    data={rowData}
                />)}

            <div className={classes.gradedivider} onClick={() => handleClick('TSG')}>
                {showTSG && <ExpandMoreIcon fontSize={"small"}/>}
                {!showTSG && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.gradeDividerText}>
                    TSG
                               </span>
                <span className={classes.memberCountText}>
                {Tsg.length}
                </span>
            </div>
            {showTSG && Tsg.map((rowData: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    data={rowData}
                />)}

            <div className={classes.gradedivider} onClick={() => handleClick('MSG')}>
                {showMSG && <ExpandMoreIcon fontSize={"small"}/>}
                {!showMSG && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.gradeDividerText}>
                    MSG
                               </span>
                <span className={classes.memberCountText}>
                {Msg.length}
                </span>
            </div>
            {showMSG && Msg.map((rowData: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    data={rowData}
                />)}

            <div className={classes.gradedivider} onClick={() => handleClick('SMS')}>
                {showSMS && <ExpandMoreIcon fontSize={"small"}/>}
                {!showSMS && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.gradeDividerText}>
                    SMS
                               </span>
                <span className={classes.memberCountText}>
                {Sms.length}
                </span>
            </div>
            {showSMS && Sms.map((rowData: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    data={rowData}
                />)}

            <div className={classes.gradedivider} onClick={() => handleClick('CMS')}>
                {showCMS && <ExpandMoreIcon fontSize={"small"}/>}
                {!showCMS && <NavigateNextIcon fontSize={"small"}/>}
                <span className={classes.gradeDividerText}>
                    CMS
                               </span>
                <span className={classes.memberCountText}>
                {Cms.length}
                </span>
            </div>
            {showCMS && Cms.map((rowData: any, index: number) =>
                <CurrentRosterRow
                    key={index}
                    className={'item'}
                    data={rowData}
                />)}

            {NoGrd.length > 0 &&
            <div>
                <div className={classes.gradedivider} onClick={() => handleClick('NoGrd')}>
                    {showNoGrade && <ExpandMoreIcon fontSize={"small"}/>}
                    {!showNoGrade && <NavigateNextIcon fontSize={"small"}/>}
                    <span className={classes.gradeDividerText}>
                    No Grade listed
                               </span>
                    <span className={classes.memberCountText}>
                {NoGrd.length}
                </span>
                </div>

                {NoGrd.map((rowData: any, index: number) =>
                    <CurrentRosterRow
                        key={index}
                        className={'item'}
                        data={rowData}
                    />
                )}
            </div>
            }

        </div>
    );
};

export default RowsByGrade;