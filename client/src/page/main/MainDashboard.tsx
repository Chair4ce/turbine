import React, {lazy, Suspense, useState} from 'react';
import MainHeader, {HEADER_MENU_SELECT_ACTION} from "../../component/appHeader/AppHeader";
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import LoadingSpinner from "../../component/displayLoading/LoadingSpinner";
import {LinearProgress, Modal, Paper} from "@material-ui/core";
import {SIDEBAR_ACTION} from "../../component/sidebar/SideBar";

const Health = lazy(() => import('./HealthSection'));
const Members = lazy(() => import('./MainSection'));


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        header_container: {
            minWidth: 973,
            height: 66,
        },
        loading: {}
    }),
);

interface Props {
    className?: string;
}

const MainDashboard: React.FC<Props> = props => {
    const [showMainSection, toggleMainSection] = useState(true);
    const [showHealthSection, toggleHealthSection] = useState(false);
    const [sideBarExpanded, toggleExpandedSideBar] = useState(true);
    const classes = useStyles();


    const headerMenuSelectHandler = (type: string) => {
        switch (type) {
            case HEADER_MENU_SELECT_ACTION.SHOW_MAIN_SECTION:
                toggleHealthSection(false)
                toggleMainSection(true)
                break;
            case HEADER_MENU_SELECT_ACTION.SHOW_HEALTH_SECTION:
                toggleMainSection(false)
                toggleHealthSection(true)
                break;
            case SIDEBAR_ACTION.TOGGLE_SIDEBAR_EXPAND:
                toggleExpandedSideBar(prev => !prev)
                break;
        }
    }
    return (
        <div className={classNames(classes.root, props.className)}>
            <div className={classes.header_container}>
                <MainHeader menuSelectHandler={headerMenuSelectHandler}/>
            </div>
            {showMainSection && <Suspense fallback={
                <LinearProgress/>
            }> <Members sideBarCallBack={headerMenuSelectHandler} sideBarExpandedState={sideBarExpanded}/>
            </Suspense>}
            {showHealthSection &&
            <Suspense fallback={
                <LinearProgress/>
            }>
                <Health callBackHandler={headerMenuSelectHandler} sideBarExpanded={sideBarExpanded}/>
            </Suspense>
            }
        </div>
    );
};

export default MainDashboard;






