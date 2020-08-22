import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
// import moment from "moment";
import DynamicInfoBoxModel from "./DynamicInfoBoxModel";
import {Paper} from "@material-ui/core";
const S = require('string');


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(217, 217, 217, 0.87)',
            border: '0.5px solid #A3A3A3',
            borderRadius: 4,
            padding: theme.spacing(1)
        },
        detailRow: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            color: 'black',
            margin: theme.spacing(.5)
        },
        rowTitle: {
            width: 140,
            display: 'flex',
            fontFamily: 'Rambla',
            fontSize: '14px',
            color: 'black',
            alignItems: 'center'
        },
        rowInfo: {
            display: 'flex',
            cursor: 'text',
            alignItems: 'center',
            background: '#F9F9F9',
            fontFamily: 'Rambla',
            fontSize: '14px',
            width: 280,
            borderRadius: 1,
            paddingLeft: 4,

        },
    }),
);

interface Props {
    rows: DynamicInfoBoxModel[];
    className?: string;
}

const DynamicInfoBox: React.FC<Props> = props => {
    const classes = useStyles();

    function detailRow() {
        return  props.rows.filter(info => info.rowTitle !== 'id').filter(info => info.rowTitle !== 'mbrId').filter(info => info.rowTitle !== 'fullName').map((data,index) =>
            <div className={classes.detailRow} key={data.rowTitle}>
            <div className={classes.rowTitle}>
                <em>{S(data.rowTitle).humanize().titleCase().s}</em>
            </div>
            <div className={classes.rowInfo}>
                <em>{data.rowInfo !== undefined ? data.rowInfo : "-"}</em>
            </div>
        </div>
        )
    }

    return (
        <div className={classNames(props.className, classes.container)}>
            <Paper elevation={1} className={classes.paper} color={'black'}>
                    {detailRow()}
            </Paper>
        </div>
    );
};

export default DynamicInfoBox;