import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import MemberModel from "../../../store/members/models/MemberModel";
import RowsForRank from "./RowsForRank";
import clsx from "clsx";

interface Props {
    data: MemberModel[];
    bigSticky: boolean;
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        bigSticky: {
            top: 85
        },
        smallSticky: {
            top: 15
        }
    }),
);

const RowsByRankContainer: React.FC<Props> = props => {
    const classes = useStyles();

    const BarClassName = clsx({
        [classes.bigSticky]: props.bigSticky,
        [classes.smallSticky]: !props.bigSticky,
    });
    const Amn: MemberModel[] = props.data.filter(rowData => rowData.grade === 'AMN');
    const A1c: MemberModel[] = props.data.filter(rowData => rowData.grade === 'A1C');
    const Sra: MemberModel[] = props.data.filter(rowData => rowData.grade === 'SRA');
    const Ssg: MemberModel[] = props.data.filter(rowData => rowData.grade === 'SSG');
    const Tsg: MemberModel[] = props.data.filter(rowData => rowData.grade === 'TSG');
    const Msg: MemberModel[] = props.data.filter(rowData => rowData.grade === 'MSG');
    const Sms: MemberModel[] = props.data.filter(rowData => rowData.grade === 'SMS');
    const Cms: MemberModel[] = props.data.filter(rowData => rowData.grade === 'CMS');
    const NoGrd: MemberModel[] = props.data.filter(rowData => rowData.grade === '');

    return (
        <div className={classNames(props.className, classes.root)}>
            {Amn.length > 0 ? <RowsForRank members={Amn} rank={'AMN'} className={BarClassName}/> : null}
            {A1c.length > 0 ? <RowsForRank members={A1c} rank={'A1C'} className={BarClassName}/> : null}
            {Sra.length > 0 ? <RowsForRank members={Sra} rank={'SRA'} className={BarClassName}/> : null}
            {Ssg.length > 0 ? <RowsForRank members={Ssg} rank={'SSG'} className={BarClassName}/> : null}
            {Tsg.length > 0 ? <RowsForRank members={Tsg} rank={'TSG'} className={BarClassName}/> : null}
            {Msg.length > 0 ? <RowsForRank members={Msg} rank={'MSG'} className={BarClassName}/> : null}
            {Sms.length > 0 ? <RowsForRank members={Sms} rank={'SMS'} className={BarClassName}/> : null}
            {Cms.length > 0 ? <RowsForRank members={Cms} rank={'CMS'} className={BarClassName}/> : null}
            {NoGrd.length > 0 ? <RowsForRank members={NoGrd} rank={'No Data'} className={BarClassName}/> : null}
        </div>
    );
};

export default RowsByRankContainer;