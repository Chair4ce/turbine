import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import theme from "../../style/theme";

interface Props {
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            zIndex: 1500,
            outline: 'none',
            margin: 6,
        },
        panel: {
            marginRight: 10,
            display: 'block',
            position: 'relative',
            width: '100%',
            height: '100%',
            minWidth: 500,
            float: 'left',
            font: 'inherit',
            fontSize: '100%',
            verticalAlign: 'baseline',
        },
        container: {
            boxSizing: 'border-box',
            position: 'absolute',
            width: '100%',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            height: '100%',
        },
        panel_content: {
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: 'calc(100vh - 99px)',
        },
        item_container: {
            display: 'block',
            overflowY: 'auto',
            height: '100%',
            width: '100%',
        },
        contentContainer: {
            position: 'absolute',
            width: '100%',
            height: 'calc(100vh-122px)'
        },
        panelHeader: {
            display: 'flex',
            minWidth: 230,
            width: '100%',
            alignItems: 'center',
            flexGrow: 0,
            flexShrink: 1,
            margin: 0,
            border: 0,
            height: 54,
            padding: '0 3px 0 10px',
            background: 'rgb(44, 45, 47)',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            boxSizing: 'border-box',
            lineHeight: 15,
        },
        panelTitle: {},
        endOfList: {
            position: 'relative',
            width: '100%',
            minHeight: 80,
            backgroundColor: '#484f57',
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
        }
    }),
);

const SkeletonPanelG: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <div className={classes.panel}>
            <div className={classNames(classes.container)}>
                <header className={classNames(classes.panelHeader)}>
                    <div className={classNames(classes.panelTitle)}>
                        <Typography>Wait for it...</Typography>
                    </div>
                </header>
                <div className={classes.contentContainer}>
                    <section className={classNames(classes.panel_content)}>
                        <div className={classNames(classes.item_container)}>
                            <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>
                            <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>
                            <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>
                            <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>
                            <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>
                            <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>
                            <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>
                            <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>
                            <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>
                            <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>
                            <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>
                            <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>
                            <Skeleton variant="text" animation={'wave'} style={{height: '80px'}}/>
                            <div className={classNames(classes.endOfList, 'preview')}>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SkeletonPanelG;