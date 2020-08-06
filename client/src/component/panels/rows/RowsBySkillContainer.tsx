import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import MemberModel from "../../../store/members/models/MemberModel";
import RowsForSkill from "./RowsForSkill";

interface Props {
    data: MemberModel[];
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
    }),
);

const RowsBySkillContainer: React.FC<Props> = props => {
    const classes = useStyles();

    const lvl0members: MemberModel[] = MemberModel.sortByGradeAscending(props.data).filter((m) => m.dafsc != null).filter(rowData =>
        rowData.dafsc.charAt(3) === "0");
    const lvl1members: MemberModel[] = MemberModel.sortByGradeAscending(props.data).filter((m) => m.dafsc != null).filter(rowData =>
        rowData.dafsc.charAt(3) === "1");
    const lvl3members: MemberModel[] = MemberModel.sortByGradeAscending(props.data).filter((m) => m.dafsc != null).filter(rowData =>
        rowData.dafsc.charAt(3) === "3");
    const lvl5members: MemberModel[] = MemberModel.sortByGradeAscending(props.data).filter((m) => m.dafsc != null).filter(rowData =>
        rowData.dafsc.charAt(3) === "5");
    const lvl7members: MemberModel[] = MemberModel.sortByGradeAscending(props.data).filter((m) => m.dafsc != null).filter(rowData =>
        rowData.dafsc.charAt(3) === "7");
    const lvl9members: MemberModel[] = MemberModel.sortByGradeAscending(props.data).filter((m) => m.dafsc != null).filter(rowData =>
        rowData.dafsc.charAt(3) === "9");

    return (
        <div className={classNames(props.className, classes.root)}>
            {lvl1members.length > 0 ? <RowsForSkill members={lvl1members} skillTitle={'1 Level - Helper'}/> : null}
            {lvl3members.length > 0 ? <RowsForSkill members={lvl3members} skillTitle={'3 Level - Apprentice'}/>
             : null}
            {lvl5members.length > 0 ? <RowsForSkill members={lvl5members} skillTitle={'5 Level - Journeyman'}/> : null}
            {lvl7members.length > 0 ? <RowsForSkill members={lvl7members} skillTitle={'7 Level - Craftsman'}/> : null}
            {lvl9members.length > 0 ? <RowsForSkill members={lvl9members} skillTitle={'9 Level - Superintendent'}/> : null}
            {lvl0members.length > 0 ? <RowsForSkill members={lvl0members} skillTitle={'No Data'}/> : null}
        </div>
    );
};

export default RowsBySkillContainer;