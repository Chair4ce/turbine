import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import PersonIcon from "../icon/PersonIcon";
import clsx from "clsx";
import {useState} from "react";
import {Avatar} from "@material-ui/core";

interface Props {
    key: number;
    name?: string;
    grade?: string;
    afsc?: string;
    className?: string;
}

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
    }),
);



const CurrentRosterRow: React.FC<Props> = props => {
    const classes = useStyles();
    const AFSCregex = new RegExp(/[^-]+/);
    return (
    <div className={classNames(classes.root, 'item')}>
        <div className={classNames(classes.AvataRoot)}>
            <PersonIcon/>
            {/*<Avatar variant="square" alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />*/}
        </div>
        <div className={classNames(classes.info_area)}>

            <div className={classNames(classes.column_data_grade)}>
                <div className={classNames(classes.grade_background, props.grade)}>
                <h4>{props.grade}</h4>
                </div>
            </div>
                <div className={classNames(classes.column_data)}>
                    <h4 className={classes.rowText}>{AFSCregex.exec(props.afsc as string)}</h4>
                </div>
                <div className={classNames(classes.column_data_name)}>
                    <h4>{props.name}</h4>
                </div>
        </div>
    </div>
    );
};

export default CurrentRosterRow;