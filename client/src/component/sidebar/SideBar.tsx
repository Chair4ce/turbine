import React from "react";
import classNames from "classnames";
import ExpandIcon from "../icon/ExpandIcon";
import CollapseIcon from "../icon/CollapseIcon";
import RosterMenu from "../menus/RosterMenu";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import clsx from "clsx";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'block',
            position: 'relative',
            width: 230,
            height: '100%',
            boxShadow: '5px 0 10px 0 rgba(0,0,0,.15)',
            borderRight: '1px solid #000',
            background: '#2f3337',
            flexDirection: 'column',
        },
        expand_btn_area: {
            position: 'relative',
            boxShadow: '5px 0 10px 0 rgba(0,0,0,.15)',
            borderRight: '1px solid #000',
            justifyContent: 'start',
            // backgroundColor: '#2f3337',
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid #393a3c',
            borderBottom: '1px solid #000',
            backgroundColor: '#2c2d2f',
            width: '100%',
            height: 50,
        },
        menu_container: {
            height: '100%',
            flex: '1 1 auto',
            overflowY: 'auto',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000',
            outline: 'none',
        },
        expanded: {
            transition: theme.transitions.create(["width"],{ duration: theme.transitions.duration.shortest }),
            width: 230,
        },
        collapsed: {
            transition: theme.transitions.create(["width"],{ duration: theme.transitions.duration.shortest }),
            width: 50,
        },
        toggleWidthBtn: {
            color: '#C1C1C1',
            lineHeight: 0,
            borderRadius: '0px',
            width: 48,
            height: '100%',
        }
    }),
);

interface Props {
    showCurrentPanel: boolean;
    showProjectedPanel: boolean;
    showGainingPanel: boolean;
    showLosingPanel: boolean;
    showPositionPanel: boolean;
    drawerExpanded: boolean;
    menu_item_select_callback: (type: string) => void;
    className?: string;
}

const SIDE_BAR_STATE = {
    TOGGLE_SIDEBAR_EXPAND: 'SIDE_BAR/TOGGLE_SIDEBAR_EXPAND',
}

const SideBar: React.FC<Props> = props => {
    const classes = useStyles();
    const drawerToggleClassName = clsx({
        [classes.expanded]: props.drawerExpanded,
        [classes.collapsed]: !props.drawerExpanded,
    });


    const toggleExpand = () => {
        props.menu_item_select_callback(
            SIDE_BAR_STATE.TOGGLE_SIDEBAR_EXPAND
        )
    }

    return (
        <aside className={classNames(classes.root, drawerToggleClassName)}>
            <div className={classes.expand_btn_area}>
                <Button className={classNames(classes.toggleWidthBtn)} onClick={toggleExpand}>
                    {props.drawerExpanded ? <CollapseIcon/> : <ExpandIcon/>}
                </Button>
            </div>
            <div className={classes.menu_container}>
                <RosterMenu
                    showCurrentPanel={props.showCurrentPanel}
                    showProjectedPanel={props.showProjectedPanel}
                    showGainingPanel={props.showGainingPanel}
                    showLosingPanel={props.showLosingPanel}
                    showPositionPanel={props.showPositionPanel}
                    menuSelectHandler={props.menu_item_select_callback}
                    expanded={props.drawerExpanded}
                />
            </div>
        </aside>
    )
}

export default SideBar;

export {
    SIDE_BAR_STATE as SIDEBAR_ACTION,
};