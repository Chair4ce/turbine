import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import * as React from "react";
import clsx from "clsx";
import classNames from "classnames";
import GainingMemberModel from "../../../store/members/models/GainingMemberModel";
import RowsForGainingRank from "./RowsForGainingRank";

interface Props {
    data: GainingMemberModel[];
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

const RowsByGainingRankContainer: React.FC<Props> = props => {
    const classes = useStyles();

    const BarClassName = clsx({
        [classes.bigSticky]: props.bigSticky,
        [classes.smallSticky]: !props.bigSticky,
    });
    const Amn: GainingMemberModel[] = props.data.filter(rowData => rowData.grade === 'AMN');
    const A1c: GainingMemberModel[] = props.data.filter(rowData => rowData.grade === 'A1C');
    const Sra: GainingMemberModel[] = props.data.filter(rowData => rowData.grade === 'SRA');
    const Ssg: GainingMemberModel[] = props.data.filter(rowData => rowData.grade === 'SSG');
    const Tsg: GainingMemberModel[] = props.data.filter(rowData => rowData.grade === 'TSG');
    const Msg: GainingMemberModel[] = props.data.filter(rowData => rowData.grade === 'MSG');
    const Sms: GainingMemberModel[] = props.data.filter(rowData => rowData.grade === 'SMS');
    const Cms: GainingMemberModel[] = props.data.filter(rowData => rowData.grade === 'CMS');
    const NoGrd: GainingMemberModel[] = props.data.filter(rowData => rowData.grade === '');

    return (
        <div className={classNames(props.className, classes.root)}>
            {Amn.length > 0 ? <RowsForGainingRank members={Amn} rank={'AMN'} className={BarClassName}/> : null}
            {A1c.length > 0 ? <RowsForGainingRank members={A1c} rank={'A1C'} className={BarClassName}/> : null}
            {Sra.length > 0 ? <RowsForGainingRank members={Sra} rank={'SRA'} className={BarClassName}/> : null}
            {Ssg.length > 0 ? <RowsForGainingRank members={Ssg} rank={'SSG'} className={BarClassName}/> : null}
            {Tsg.length > 0 ? <RowsForGainingRank members={Tsg} rank={'TSG'} className={BarClassName}/> : null}
            {Msg.length > 0 ? <RowsForGainingRank members={Msg} rank={'MSG'} className={BarClassName}/> : null}
            {Sms.length > 0 ? <RowsForGainingRank members={Sms} rank={'SMS'} className={BarClassName}/> : null}
            {Cms.length > 0 ? <RowsForGainingRank members={Cms} rank={'CMS'} className={BarClassName}/> : null}
            {NoGrd.length > 0 ? <RowsForGainingRank members={NoGrd} rank={'No Data'} className={BarClassName}/> : null}
        </div>
    );
};

export default RowsByGainingRankContainer;