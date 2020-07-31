import * as React from 'react';
import {useState} from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import MemberModel from "../../../store/members/MemberModel";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import PersonIcon from "../../icon/PersonIcon";
import moment from 'moment';
import {Button} from "@material-ui/core";
import DynamicInfoBoxModel from "../forms/DynamicInfoBoxModel";
import DynamicInfoBox from "../forms/DynamicInfoBox";

const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        root: {
            backgroundColor: '#f4f4f4',
            cursor: 'pointer',
            minWidth: 301
        },
        column_data: {
            paddingLeft: 20,
            width: 65
        },
        info_area: {
            display: 'flex',
            width: '100%',
            paddingLeft: 6,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
        },
        grade_background: {
            width: 34,
            height: 21,
            background: '#D9AAAA',
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 1px 1px rgba(0,0,0,.5)'
        },

        column_data_name: {
            minWidth: 90,
            paddingLeft: 20,
            display: 'flex',
            alignItems: 'center',
            textOverflow: 'ellipsis'
        },
        column_data_grade: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            textOverflow: 'ellipsis'
        },
        rowText: {
            width: 65
        },
        AvataRoot: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        awardIcon: {
            width: 60,
            height: 40,
            margin: theme.spacing(1)
        },
        expandedView: {
            cursor: 'default',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        },
        collapsedView: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
        },
        detailArea: {
            width: '100%',
            display: 'flex',
            padding: theme.spacing(1)
        },
        expandedViewTopBar: {
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center'
        },
        collapseBtnArea: {
            zIndex: 1200,
            borderRadius: 4,
            cursor: 'pointer',
            margin: 5,
            height: 20,
            width: 20,
            '&:hover': {
                backgroundColor: 'rgb(194,194,194)',
            },
        },
        closeBtn: {
            fontSize: 9,
            width: 100,
            height: 22,
            marginLeft: 200
        }
    }),
);

interface Props {
    key: number;
    data: MemberModel;
    className?: string;
}


const CurrentRosterRow: React.FC<Props> = props => {
    const classes = useStyles();
    // const AFSCregex = new RegExp(/[^-]+/);
    const [selected, toggleSelected] = useState(false);
    const entries = Object.entries(props.data);
    const DynamicInfoBoxData: DynamicInfoBoxModel[] = [...new Set(entries.map(entry => {
        return new DynamicInfoBoxModel(entry[0], entry[1])
    }))]

    function handleExpand() {
        toggleSelected(true);
    }

    function handleCollapse() {
        toggleSelected(false);
    }

    return (
        <div className={classNames(classes.root, 'item')}>
            {selected && <div className={classes.expandedView}>
                <div className={classes.expandedViewTopBar}>
                    <div className={classNames(classes.collapseBtnArea, 'collapseBtnArea')} onClick={handleCollapse}>
                        <ExpandLessIcon fontSize={'small'}/>
                    </div>
                    <div className={classNames(classes.column_data_name)}>
                        <h3>{props.data.fullName}</h3>
                    </div>
                </div>
                <Button className={classes.closeBtn} color="primary" variant="contained" onClick={handleCollapse}>
                    Close
                </Button>
                <div className={classes.detailArea}>
                    <DynamicInfoBox rows={DynamicInfoBoxData}/>
                </div>
            </div>}

            {!selected && <div className={classes.collapsedView} onClick={handleExpand}>
                <div className={classNames(classes.AvataRoot)}>
                    <PersonIcon/>
                    {/*<Avatar variant="square" alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />*/}
                </div>
                <div className={classNames(classes.info_area)}>

                    <div className={classNames(classes.column_data_grade)}>
                        <div className={classNames(classes.grade_background, props.data.grade)}>
                            <h4>{props.data.grade}</h4>
                        </div>
                    </div>
                    <div className={classNames(classes.column_data)}>
                        <h4 className={classes.rowText}>{props.data.dafsc}</h4>
                    </div>
                    <div className={classNames(classes.column_data_name)}>
                        <h4>{props.data.fullName}</h4>
                    </div>
                </div>
            </div>}
            {/*{ selected && <img src={AFAM} alt={""} className={classes.awardIcon}/>}*/}
            {/*<img src={AFCM} alt={""} className={classes.awardIcon}/>*/}
            {/*<img src={MSM} alt={""} className={classes.awardIcon}/>*/}
        </div>
    );
};

export default CurrentRosterRow;