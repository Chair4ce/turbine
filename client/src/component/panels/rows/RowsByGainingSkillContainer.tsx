import MemberModel from "../../../store/members/models/MemberModel";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import * as React from "react";
import classNames from "classnames";
import GainingMemberModel from "../../../store/members/models/GainingMemberModel";
import RowsForGainingSkill from "./RowsForGainingSkill";

interface Props {
    data: GainingMemberModel[];
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
    }),
);

const RowsByGainingSkillContainer: React.FC<Props> = props => {
    const classes = useStyles();

    const lvl0members: GainingMemberModel[] = MemberModel.sortByGradeGainingAscending(props.data).filter(rowData => {
            return rowData.dafsc != null && rowData.dafsc.charAt(3) === "0";
    });
    const lvl1members: GainingMemberModel[] = MemberModel.sortByGradeGainingAscending(props.data).filter(rowData => {
            return rowData.dafsc != null && rowData.dafsc.charAt(3) === "1";
    });
    const lvl3members: GainingMemberModel[] = MemberModel.sortByGradeGainingAscending(props.data).filter(rowData => {
            return rowData.dafsc != null && rowData.dafsc.charAt(3) === "3";
    });
    const lvl5members: GainingMemberModel[] = MemberModel.sortByGradeGainingAscending(props.data).filter(rowData => {
            return rowData.dafsc != null && rowData.dafsc.charAt(3) === "5";
    });
    const lvl7members: GainingMemberModel[] = MemberModel.sortByGradeGainingAscending(props.data).filter(rowData => {
            return rowData.dafsc != null && rowData.dafsc.charAt(3) === "7";
    });
    const lvl9members: GainingMemberModel[] = MemberModel.sortByGradeGainingAscending(props.data).filter(rowData => {
        return rowData.dafsc != null && rowData.dafsc.charAt(3) === "9";

    });

    return (
        <div className={classNames(props.className, classes.root)}>
            {lvl1members.length > 0 ?
                <RowsForGainingSkill members={lvl1members} skillTitle={'1 Level - Helper'}/> : null}
            {lvl3members.length > 0 ? <RowsForGainingSkill members={lvl3members} skillTitle={'3 Level - Apprentice'}/>
                : null}
            {lvl5members.length > 0 ?
                <RowsForGainingSkill members={lvl5members} skillTitle={'5 Level - Journeyman'}/> : null}
            {lvl7members.length > 0 ?
                <RowsForGainingSkill members={lvl7members} skillTitle={'7 Level - Craftsman'}/> : null}
            {lvl9members.length > 0 ?
                <RowsForGainingSkill members={lvl9members} skillTitle={'9 Level - Superintendent'}/> : null}
            {lvl0members.length > 0 ? <RowsForGainingSkill members={lvl0members} skillTitle={'No Data'}/> : null}
        </div>
    );
};

export default RowsByGainingSkillContainer;