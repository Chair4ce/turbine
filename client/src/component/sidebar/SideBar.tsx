import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import ExpandIcon from "../icon/ExpandIcon";
import CollapseIcon from "../icon/CollapseIcon";
import {StyledRosterMenu} from "../menus/RosterMenu";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        expanded: {
            width: 230,
        },
        collapsed: {
            width: 50,
        }
    }),
);

interface Props {
    showCurrentPanel: boolean;
    showProjectedPanel: boolean;
    showGainingPanel: boolean;
    showLosingPanel: boolean;
    menu_item_select_callback: (type: string) => void;
    className?: string;
}

const SideBar: React.FC<Props> = props => {
    const classes = useStyles();
    const [expanded, toggleDrawer] = React.useState(true);
    const drawerToggleClassName = clsx({
        [classes.expanded]: expanded,
        [classes.collapsed]: !expanded,
    });

    const handleClick = () => {
        toggleDrawer(prev => !prev);
    }


    return (
        <aside className={classNames('sidebar', props.className, drawerToggleClassName)}>
            <div className={'sidebar_panels'}>
                <div className={'sidebar_toggleContainer'}>
                    <div className={'toggleButtonArea'}>
                        <button className={'toggleButton'} onClick={handleClick}>
                            {expanded ? <CollapseIcon/> : <ExpandIcon/>}
                        </button>
                    </div>
                </div>
                <div className={'menus_container'}>
                    <StyledRosterMenu
                        showCurrentPanel={props.showCurrentPanel}
                        showProjectedPanel={props.showProjectedPanel}
                        showGainingPanel={props.showGainingPanel}
                        showLosingPanel={props.showLosingPanel}
                        menuSelectHandler={props.menu_item_select_callback}
                        expanded={expanded}
                    />
                </div>
            </div>
        </aside>
    )
}

export const StyledSideBar = styled(SideBar)`
display: block;
position: relative;
width: 230px;
height: 100%;
box-shadow: 5px 0 10px 0 rgba(0,0,0,.15);
border-right: 1px solid #000;
background-color: #2f3337;
display: -ms-flexbox;
display: flex;
-ms-flex-direction: column;
flex-direction: column;

.sidebar_panels {
height: 100%;
}

.sidebar_toggleContainer {
  display: flex;
  align-items: center;
  border-top: 1px solid #393a3c;
  border-bottom: 1px solid #000;
  background-color: #2c2d2f;
  width: 100%;
  height: 50px
}

.menus_container {
  height: 100%;
  flex: 1 1 auto;
  overflow-y: auto;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000;
}

.toggleButtonArea {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  -webkit-transition: background-color 100ms ease-in;
  -moz-transition: background-color 100ms ease-in;
  -o-transition: background-color 100ms ease-in;
  transition: background-color 100ms ease-in;
    :hover {
      background-color: rgba(119,119,119,0.27);
    }
}

.toggleButton {
  cursor: pointer;
  height: 50px;
  width: 50px;
  background: transparent;
  border: none;
  outline: transparent;
}
`;