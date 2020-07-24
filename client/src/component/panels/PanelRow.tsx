import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import PersonIcon from "../icon/PersonIcon";
import clsx from "clsx";
import {useState} from "react";

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
            cursor: 'pointer'
        },
        column_data: {
            width: 65
        },
        avatar_area: {
            height: 48,
            minWidth: 60,
            display: 'flex',
            justifyContent: 'center'
        },
        info_area: {
            display: 'flex',
            width: '100%',
            paddingLeft: 6,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
        },

        column_data_set: {
            width: '100%',
            minWidth: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
            paddingLeft: 20,
            minWidth: 90,
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
        }
    }),
);



const CurrentRosterRow: React.FC<Props> = props => {
    const classes = useStyles();
    const AFSCregex = new RegExp(/[^-]+/);
    return (
    <div className={classNames(classes.root, 'item')}>
        <div className={classes.avatar_area}>
            <PersonIcon/>
        </div>
        <div className={classNames(classes.info_area)}>

            <div className={classNames(classes.column_data_grade)}>
                <div className={classNames(classes.grade_background, props.grade)}>
                <h4>{props.grade}</h4>
                </div>
            </div>

            <div className={classNames(classes.column_data_set)}>
                <div className={classNames(classes.column_data_name)}>
                    <h4>{props.name}</h4>
                </div>
                <div className={classNames(classes.column_data)}>
                    <h4 className={classes.rowText}>{AFSCregex.exec(props.afsc as string)}</h4>
                </div>
            </div>
        </div>
    </div>
    );
};

export default CurrentRosterRow;