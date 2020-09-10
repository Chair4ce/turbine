import React from "react";
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CurrentRosterPanel from "../CurrentRosterPanel";
import GainingRosterPanel from "../GainingRosterPanel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative',
            display: 'block',
            width: '100%',
            height: '100%',
        },
        table: {
            width: '100%',
            position: 'relative',
            boxSizing: 'border-box',
            display: 'flex',
            padding: '12px 4px 12px 12px',
            height: '100%',
            verticalAlign: 'baseline',
        }
    }),
);

interface Props {
    showCurrentPanel?: boolean;
    showProjectedPanel?: boolean;
    showGainingPanel?: boolean;
    showLosingPanel?: boolean;
    showPositionPanel?: boolean;
    callback: (type: string) => void;
    className?: string;
}

const PanelsContainer: React.FC<Props> = props => {
    const classes = useStyles();



    return (
        <section className={classNames(classes.root, props.className)}>
            <div className={classes.table}>
                {props.showCurrentPanel &&
                    <CurrentRosterPanel callback={props.callback}/>}
                {props.showGainingPanel &&
                    <GainingRosterPanel callback={props.callback}/>}
            </div>
        </section>
    )
}

export default PanelsContainer;

