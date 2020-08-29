import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import * as React from "react";
import {lazy, useEffect, useState} from "react";
import {SIDEBAR_ACTION} from "../../component/sidebar/SideBar";
import HealthSideBar from "../../component/sidebar/HealthSideBar";
import {HEALTH_MENU_SELECT_ACTION} from "../../component/menus/HealthMenu";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {getChartData} from "../../store/positions/thunks";
import clsx from "clsx";

const Chart = lazy(() => import("../../component/panels/ManningChart"))

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'absolute',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            top: 68,
            overflow: 'hidden',
            left: 0,
            right: 0,
            bottom: 0,
        },
        sidebar_container: {
            position: 'relative',
            height: '100%',
        },
        main: {
            position: 'relative',
            width: '100%',
            height: '100%',
        },
        show: {},
        hide: {
            display: 'none'
        }
    }),
);

interface Props {
    sideBarExpanded: boolean;
    callBackHandler: (type: string) => void;
    className?: string;
}

const HealthSection: React.FC<Props> = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const chartDataAFSC = useSelector(({positions}: ApplicationState) => positions.chartData);
    const [showManningChart, toggleManningChart] = useState(false);

    useEffect(() => {
        dispatch(getChartData())
        return function cleanup() {
        }
    }, [dispatch]);

    const chartClassName = clsx({
        [classes.show]: showManningChart,
        [classes.hide]: !showManningChart,
    });

    const childCallBackHandler = (type: string) => {
        switch (type) {
            case SIDEBAR_ACTION.TOGGLE_SIDEBAR_EXPAND:
                props.callBackHandler(SIDEBAR_ACTION.TOGGLE_SIDEBAR_EXPAND)
                break;
            case HEALTH_MENU_SELECT_ACTION.TOGGLE_MANNING_CHART:
                toggleManningChart(prev => !prev)
                break;
        }
    }

    return (
        <section className={classes.root}>
            <div className={classes.sidebar_container}>
                <HealthSideBar
                    sideBarExpanded={props.sideBarExpanded}
                    parentCallBack={childCallBackHandler}
                    showManningChart={showManningChart}/>
            </div>
            <article className={classes.main}>
                <Chart chartData={chartDataAFSC} className={chartClassName}/>
            </article>
        </section>
    );
};

export default HealthSection;