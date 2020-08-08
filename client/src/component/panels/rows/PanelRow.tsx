import * as React from 'react';
import {useState} from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import MemberModel from "../../../store/members/models/MemberModel";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import PersonIcon from "../../icon/PersonIcon";
import {Button, Collapse, Fade, Typography} from "@material-ui/core";
import DynamicInfoBoxModel from "../forms/DynamicInfoBoxModel";
import DynamicInfoBox from "../forms/DynamicInfoBox";
import GainingMemberModel from "../../../store/members/models/GainingMemberModel";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        root: {
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
            background: '#e2e2e2',
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
            backgroundColor: '#cecece',
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
        },
        rowTitle: {
            fontFamily: 'Rambla',
            fontSize: '18px',
            fontWeight: 400
        },
        displayed: {
            width: '100%'
        },
        hidden: {
            display: 'none'
        },
        grade_text: {
            color: '#000000',
            fontSize: 13,
        },
        grade_cms: {
            background: '#3c09ea'
        },
        grade_sms: {
            background: '#4636d5'
        },
        grade_msg: {
            background: '#3665dc'
        },
        grade_tsg: {
            background: '#3f87d5'
        },
        grade_ssg: {
            background: '#38a8d4'
        },
        grade_sra: {
            background: '#41d595'
        },
        grade_a1c: {
            background: '#38d458'
        },
        grade_amn: {
            background: '#69d93d'
        }
    }),
);

interface Props {
    data: MemberModel | GainingMemberModel;
    gradeClassName: string;
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

    const InfoClassName = clsx({
        [classes.displayed]: !selected,
        [classes.hidden]: selected,
    });

    const BarClassName = clsx({
        [classes.displayed]: selected,
        [classes.hidden]: !selected,
    });


    const GradeClassName = clsx({
        [classes.grade_cms]: props.gradeClassName == 'CMS',
        [classes.grade_sms]: props.gradeClassName == 'SMS',
        [classes.grade_msg]: props.gradeClassName == 'MSG',
        [classes.grade_tsg]: props.gradeClassName == 'TSG',
        [classes.grade_ssg]: props.gradeClassName == 'SSG',
        [classes.grade_sra]: props.gradeClassName == 'SRA',
        [classes.grade_a1c]: props.gradeClassName == 'A1C',
        [classes.grade_amn]: props.gradeClassName == 'AMN',
    });

    function handleExpand() {
        toggleSelected(true);
    }

    function handleCollapse() {
        toggleSelected(false);
    }

    return (
        <div className={classNames(classes.root, props.className)}>
            <Collapse in={selected} className={BarClassName}>
                <div className={classes.expandedView}>
                    <div className={classes.expandedViewTopBar}>
                        <div className={classNames(classes.collapseBtnArea, 'collapseBtnArea')}
                             onClick={handleCollapse}>
                            <ExpandLessIcon fontSize={'small'}/>
                        </div>
                        <div className={classNames(classes.column_data_name)}>
                            <Typography className={classes.rowTitle}>{props.data.fullName}</Typography>
                        </div>
                    </div>
                    <Button className={classes.closeBtn} color="primary" variant="contained" onClick={handleCollapse}>
                        Close
                    </Button>
                    <div className={classes.detailArea}>
                        <DynamicInfoBox rows={DynamicInfoBoxData}/>
                    </div>
                </div>
            </Collapse>

                <Fade in={!selected} style={{width: 'inherit'}}>
                    <div className={InfoClassName}>
                    <div className={classes.collapsedView} onClick={handleExpand}>
                        <div className={classNames(classes.AvataRoot)}>
                            <PersonIcon/>
                            {/*<Avatar variant="square" alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />*/}
                        </div>
                        <div className={classNames(classes.info_area)}>

                            <div className={classNames(classes.column_data_grade)}>
                                <div className={classNames(classes.grade_background, GradeClassName)}>
                                    <Typography className={classes.grade_text}>{props.data.grade ? props.data.grade : '? ?'}</Typography>
                                </div>
                            </div>
                            <div className={classNames(classes.column_data)}>
                                <h4 className={classes.rowText}>{props.data.dafsc}</h4>
                            </div>
                            <div className={classNames(classes.column_data_name)}>
                                <Typography className={classes.rowTitle}>{props.data.fullName}</Typography>
                            </div>
                        </div>
                    </div>
                    </div>
                </Fade>

            {/*{ selected && <img src={AFAM} alt={""} className={classes.awardIcon}/>}*/}
            {/*<img src={AFCM} alt={""} className={classes.awardIcon}/>*/}
            {/*<img src={MSM} alt={""} className={classes.awardIcon}/>*/}
        </div>
    );
};

export default CurrentRosterRow;