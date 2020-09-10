import * as React from "react";
import {useState} from "react";
import SideBar, {SIDEBAR_ACTION} from "../../component/sidebar/SideBar";
import {ROSTER_MENU_SELECT_ACTION} from "../../component/menus/RosterMenu";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import PanelsContainer from "../../component/panels/containers/PanelsContainer";
import TurbineIris from "../../component/icon/TurbineIris";
import Typography from "@material-ui/core/Typography";

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
            zIndex: 2
        },
        main: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
        },
        irisIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60,
            width: 270,
        },
        noContentMsg: {
            display: 'flex',
            height: 200,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        noContentTxt: {
            color: '#6d6d6d',
            fontSize: 32
        }
    }),
);

interface Props {
    sideBarExpandedState: boolean;
    sideBarCallBack: (type: string) => void;
    className?: string;
}

const MainSection: React.FC<Props> = props => {
    const classes = useStyles();
    const [showCurrentPanel, toggleCurrentPanel] = useState(false);
    const [showProjectedPanel, toggleProjectedPanel] = useState(false);
    const [showGainingPanel, toggleGainingPanel] = useState(false);
    const [showLosingPanel, toggleLosingPanel] = useState(false);
    const [showPositionPanel, togglePositionPanel] = useState(false);

    // const currentCollectionAFSC: GenericGroupCollectionModel[] = useSelector(({members}: ApplicationState) => members.genericAFSCList);
    // const [fileData, updateFileData] = useState();
    const menuSelectHandler = (type: string) => {
        switch (type) {
            case ROSTER_MENU_SELECT_ACTION.TOGGLE_CURRENT_ROSTER:
                toggleCurrentPanel(prev => !prev)
                break;
            // case ROSTER_MENU_SELECT_ACTION.TOGGLE_PROJECTED_ROSTER:
            //     toggleProjectedPanel(prev => !prev)
            //     break;
            case ROSTER_MENU_SELECT_ACTION.TOGGLE_GAINING_ROSTER:
                toggleGainingPanel(prev => !prev)
                break;
            // case ROSTER_MENU_SELECT_ACTION.TOGGLE_LOSING_ROSTER:
            //     toggleLosingPanel(prev => !prev)
            //     break;
            // case ROSTER_MENU_SELECT_ACTION.TOGGLE_POSITION_PANEL:
            //     togglePositionPanel(prev => !prev)
            //     break;
            case SIDEBAR_ACTION.TOGGLE_SIDEBAR_EXPAND:
                props.sideBarCallBack(SIDEBAR_ACTION.TOGGLE_SIDEBAR_EXPAND)
                break;
        }
    }


    return (
        <section className={classes.root}>
            <div className={classes.sidebar_container}>
                <SideBar
                    showCurrentPanel={showCurrentPanel}
                    showProjectedPanel={showProjectedPanel}
                    showGainingPanel={showGainingPanel}
                    showLosingPanel={showLosingPanel}
                    showPositionPanel={showPositionPanel}
                    drawerExpanded={props.sideBarExpandedState}
                    menu_item_select_callback={menuSelectHandler}
                />
            </div>
            <article className={classes.main}>
                {!showCurrentPanel && !showGainingPanel &&
                    <div className={classes.noContentMsg}>

                <div className={classes.irisIcon}>
                    {/*<TurbineIris/>*/}
                    {/*<TurbineIris/>*/}
                </div>
                        <Typography className={classes.noContentTxt}>No Panels are open</Typography>
                    </div>
                }
                {(showCurrentPanel || showGainingPanel) && <PanelsContainer
                    showCurrentPanel={showCurrentPanel}
                    showProjectedPanel={showProjectedPanel}
                    showGainingPanel={showGainingPanel}
                    showLosingPanel={showLosingPanel}
                    showPositionPanel={showPositionPanel}
                    callback={menuSelectHandler}
                />}

            </article>
        </section>
    );
};


export default MainSection;