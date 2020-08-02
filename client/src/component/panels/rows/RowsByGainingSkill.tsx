import * as React from 'react';
import {useState} from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import MemberModel from "../../../store/members/models/MemberModel";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import RowsByGainingGradeInOfficeGroup from "./RowsByGainingGradeInOfficeGroup";
import GainingMemberModel from "../../../store/members/models/GainingMemberModel";

interface Props {
    data: GainingMemberModel[];
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
            background: '#393c3d',
            width: '100%',
            height: 20,
            top: 35,
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
            paddingLeft: 80
        },
        memberCountText: {
            paddingRight: 20
        }
    }),
);

const RowsByGainingSkill: React.FC<Props> = props => {
    const classes = useStyles();
    const [show1lvl, toggle1lvl] = useState(false);
    const [show3lvl, toggle3lvl] = useState(false);
    const [show5lvl, toggle5lvl] = useState(false);
    const [show7lvl, toggle7lvl] = useState(false);
    const [show9lvl, toggle9lvl] = useState(false);
    const [showAllOthers, toggleAllOthers] = useState(false);

    const lvl0members: GainingMemberModel[] = MemberModel.sortByGradeGainingAscending(props.data).filter((m) => m.dafsc != null).filter(rowData =>
        rowData.dafsc!.charAt(3) === "0");
    const lvl1members: GainingMemberModel[] = MemberModel.sortByGradeGainingAscending(props.data).filter((m) => m.dafsc != null).filter(rowData =>
        rowData.dafsc!.charAt(3) === "1");
    const lvl3members: GainingMemberModel[] = MemberModel.sortByGradeGainingAscending(props.data).filter((m) => m.dafsc != null).filter(rowData =>
        rowData.dafsc!.charAt(3) === "3");
    const lvl5members: GainingMemberModel[] = MemberModel.sortByGradeGainingAscending(props.data).filter((m) => m.dafsc != null).filter(rowData =>
        rowData.dafsc!.charAt(3) === "5");
    const lvl7members: GainingMemberModel[] = MemberModel.sortByGradeGainingAscending(props.data).filter((m) => m.dafsc != null).filter(rowData =>
        rowData.dafsc!.charAt(3) === "7");
    const lvl9members: GainingMemberModel[] = MemberModel.sortByGradeGainingAscending(props.data).filter((m) => m.dafsc != null).filter(rowData =>
        rowData.dafsc!.charAt(3) === "9");


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
            case 'others':
                toggleAllOthers(prev => !prev)
                break;
        }
    }

    return (
        <div className={classNames(props.className, classes.root)}>

            {lvl1members.length > 0 ? <div>
                <div className={classes.skilldivider} onClick={() => handleClick('1lvl')}>
                    {show1lvl && <ExpandMoreIcon fontSize={"small"}/>}
                    {!show1lvl && <NavigateNextIcon fontSize={"small"}/>}
                    <span className={classes.skilldividerText}>
                    1 Level - Helper
                               </span>
                    <span className={classes.memberCountText}>
                {lvl1members.length}
                </span>
                </div>

                {show1lvl && <RowsByGainingGradeInOfficeGroup data={lvl1members}/>}
            </div> : null}
            {lvl3members.length > 0 ? <div>
                <div className={classes.skilldivider} onClick={() => handleClick('3lvl')}>
                    {show3lvl && <ExpandMoreIcon fontSize={"small"}/>}
                    {!show3lvl && <NavigateNextIcon fontSize={"small"}/>}
                    <span className={classes.skilldividerText}>
                    3 Level - Apprentice
                               </span>
                    <span className={classes.memberCountText}>
                {lvl3members.length}
                </span>
                </div>
                {show3lvl && <RowsByGainingGradeInOfficeGroup data={lvl3members}/>}
            </div> : null}
            {lvl5members.length > 0 ? <div>
                <div className={classes.skilldivider} onClick={() => handleClick('5lvl')}>
                    {show5lvl && <ExpandMoreIcon fontSize={"small"}/>}
                    {!show5lvl && <NavigateNextIcon fontSize={"small"}/>}
                    <span className={classes.skilldividerText}>
                    5 Level - Journeyman
                               </span>
                    <span className={classes.memberCountText}>
                {lvl5members.length}
                </span>
                </div>
                {show5lvl && <RowsByGainingGradeInOfficeGroup data={lvl5members}/>}
            </div> : null}
            {lvl7members.length > 0 ? <div>
                <div className={classes.skilldivider} onClick={() => handleClick('7lvl')}>
                    {show7lvl && <ExpandMoreIcon fontSize={"small"}/>}
                    {!show7lvl && <NavigateNextIcon fontSize={"small"}/>}
                    <span className={classes.skilldividerText}>
                    7 Level - Craftsman
                               </span>
                    <span className={classes.memberCountText}>
                {lvl7members.length}
                </span>
                </div>
                {show7lvl && <RowsByGainingGradeInOfficeGroup data={lvl7members}/>}
            </div> : null}
            {lvl9members.length > 0 ? <div>
                <div className={classes.skilldivider} onClick={() => handleClick('9lvl')}>
                    {show9lvl && <ExpandMoreIcon fontSize={"small"}/>}
                    {!show9lvl && <NavigateNextIcon fontSize={"small"}/>}
                    <span className={classes.skilldividerText}>
                    9 Level - Superintendent
                               </span>
                    <span className={classes.memberCountText}>
                {lvl9members.length}
                </span>
                </div>
                {show9lvl && <RowsByGainingGradeInOfficeGroup data={lvl9members}/>}
            </div> : null}
            {lvl0members.length > 0 ? <div>
                <div className={classes.skilldivider} onClick={() => handleClick('others')}>
                    {show9lvl && <ExpandMoreIcon fontSize={"small"}/>}
                    {!show9lvl && <NavigateNextIcon fontSize={"small"}/>}
                    <span className={classes.skilldividerText}>
                    0 Level - Others
                               </span>
                    <span className={classes.memberCountText}>
                {lvl0members.length}
                </span>
                </div>
                {showAllOthers && <RowsByGainingGradeInOfficeGroup data={lvl0members}/>}
            </div> : null}
        </div>
    );
};

export default RowsByGainingSkill;