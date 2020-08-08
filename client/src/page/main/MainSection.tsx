import * as React from "react";
import {useState} from "react";
import SideBar from "../../component/sidebar/SideBar";
import {StyledPanelsContainer} from "../../component/panels/containers/PanelsContainer";
import {ROSTER_MENU_SELECT_ACTION} from "../../component/menus/RosterMenu";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'absolute',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            top: 36,
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
    className?: string;
}

const MainSection: React.FC<Props> = props => {
    const classes = useStyles();
    const [showCurrentPanel, toggleCurrentPanel] = useState(false);
    const [showProjectedPanel, toggleProjectedPanel] = useState(false);
    const [showGainingPanel, toggleGainingPanel] = useState(false);
    const [showLosingPanel, toggleLosingPanel] = useState(false);
    const [showPositionPanel, togglePositionPanel] = useState(false);
    // const [fileData, updateFileData] = useState();
    const menuSelectHandler = (type: string) => {
        switch (type) {
            case ROSTER_MENU_SELECT_ACTION.TOGGLE_CURRENT_ROSTER:
                toggleCurrentPanel(prev => !prev)
                break;
            case ROSTER_MENU_SELECT_ACTION.TOGGLE_PROJECTED_ROSTER:
                toggleProjectedPanel(prev => !prev)
                break;
            case ROSTER_MENU_SELECT_ACTION.TOGGLE_GAINING_ROSTER:
                toggleGainingPanel(prev => !prev)
                break;
            case ROSTER_MENU_SELECT_ACTION.TOGGLE_LOSING_ROSTER:
                toggleLosingPanel(prev => !prev)
                break;
            case ROSTER_MENU_SELECT_ACTION.TOGGLE_POSITION_PANEL:
                togglePositionPanel(prev => !prev)
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
                    menu_item_select_callback={menuSelectHandler}
                />
            </div>
            <article className={classes.main}>
                <StyledPanelsContainer
                    showCurrentPanel={showCurrentPanel}
                    showProjectedPanel={showProjectedPanel}
                    showGainingPanel={showGainingPanel}
                    showLosingPanel={showLosingPanel}
                    showPositionPanel={showPositionPanel}
                    callback={menuSelectHandler}
                />
            </article>
        </section>
    );
};


export default MainSection;