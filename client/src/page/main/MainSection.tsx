import * as React from "react";
import {useState} from "react";
import {StyledSideBar} from "../../component/sidebar/SideBar";
import {StyledPanelsContainer} from "../../component/panels/PanelsContainer";
import styled from "styled-components";
import {ROSTER_MENU_SELECT_ACTION} from "../../component/menus/RosterMenu";

interface Props {
    className?: string;
}

const MainSection: React.FC<Props> = props => {
    const [showCurrentPanel, toggleCurrentPanel] = useState(false);
    const [showProjectedPanel, toggleProjectedPanel] = useState(false);
    const [showGainingPanel, toggleGainingPanel] = useState(false);
    const [showLosingPanel, toggleLosingPanel] = useState(false);
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
        }
    }

    return (
        <section className={'main_section'}>
            <div className={'sidebar_area'}>
                <StyledSideBar
                    showCurrentPanel={showCurrentPanel}
                    showProjectedPanel={showProjectedPanel}
                    showGainingPanel={showGainingPanel}
                    showLosingPanel={showLosingPanel}
                    menu_item_select_callback={menuSelectHandler}
                />
            </div>
            <article className={'main'}>
                <StyledPanelsContainer
                    showCurrentPanel={showCurrentPanel}
                    showProjectedPanel={showProjectedPanel}
                    showGainingPanel={showGainingPanel}
                    showLosingPanel={showLosingPanel}
                    callback={menuSelectHandler}
                />
            </article>
        </section>
    );
};


export const StyledMainSection = styled(MainSection)`
width: 100%;
.sidebar_area {
position: relative;
height: 100%;
}

.main {
position: relative;
width: 100%;
height: 100%;
}


`;