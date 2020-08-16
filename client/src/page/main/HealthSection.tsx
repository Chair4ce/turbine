import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import * as React from "react";
import {lazy, Suspense, useState} from "react";
import {SIDEBAR_ACTION} from "../../component/sidebar/SideBar";
import HealthSideBar from "../../component/sidebar/HealthSideBar";
import {HEALTH_MENU_SELECT_ACTION} from "../../component/menus/HealthMenu";
import LoadingSpinner from "../../component/displayLoading/LoadingSpinner";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";

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
    const chartDataAFSC = useSelector(({positions}: ApplicationState) => positions.chartData);
    const [showManningChart, toggleManningChart] = useState(false);
    // const [showProjectedPanel, toggleProjectedPanel] = useState(false);
    // const [showGainingPanel, toggleGainingPanel] = useState(false);
    // const [showLosingPanel, toggleLosingPanel] = useState(false);
    // const [showPositionPanel, togglePositionPanel] = useState(false);
    // const currentCollectionAFSC: GenericGroupCollectionModel[] = useSelector(({members}: ApplicationState) => members.genericAFSCList);
    // const [fileData, updateFileData] = useState();
    const callBackHandler = (type: string) => {
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
                callbackHandler={callBackHandler}
                 showManningChart={showManningChart}/>
            </div>
            <article className={classes.main}>
                <Suspense fallback={
                    <LoadingSpinner />}>
                {showManningChart &&  <Chart chartData={chartDataAFSC}/>}
                </Suspense>
            </article>
        </section>
    );
};

export default HealthSection;