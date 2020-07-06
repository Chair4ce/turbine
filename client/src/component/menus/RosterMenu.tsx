import * as React from "react";
import styled from "styled-components";
import classNames from "classnames";
import {MenuList} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import AssignmentIcon from '@material-ui/icons/Assignment';
import clsx from 'clsx';
import theme from "../../style/theme";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            outline: 'none',
        },
        paper: {
            marginRight: theme.spacing(2),
            outline: 'none',
        },
        iconArea: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24
        },
        selected: {
            // transition: 'color 100ms ease-in',
            color: '#5D8AA8'
        },
        unselected: {
            // transition: 'color 100ms ease-in',
            color: 'white'
        },
        hide: {
            visibility: 'hidden',
        }
    }),
);

interface Props {
    showCurrentPanel: boolean;
    showProjectedPanel: boolean;
    showGainingPanel: boolean;
    showLosingPanel: boolean;
    menuSelectHandler: (type: string) => void;
    expanded: boolean;
    className?: string;
}

const ROSTER_MENU_SELECT_ITEM = {
    TOGGLE_CURRENT_ROSTER: 'ROSTER_MENU/TOGGLE_CURRENT',
    TOGGLE_PROJECTED_ROSTER: 'ROSTER_MENU/TOGGLE_PROJECTED',
    TOGGLE_GAINING_ROSTER: 'ROSTER_MENU/TOGGLE_GAINING',
    TOGGLE_LOSING_ROSTER: 'ROSTER_MENU/TOGGLE_LOSING',
}

const RosterMenu: React.FC<Props> = props => {
    const classes = useStyles();

    const toggleCurrentPanel = () => {
        props.menuSelectHandler(
            ROSTER_MENU_SELECT_ITEM.TOGGLE_CURRENT_ROSTER
        )
    }

    const toggleProjectedPanel = () => {
        props.menuSelectHandler(
            ROSTER_MENU_SELECT_ITEM.TOGGLE_PROJECTED_ROSTER
        )
    }

    const toggleGainingPanel = () => {
        props.menuSelectHandler(
            ROSTER_MENU_SELECT_ITEM.TOGGLE_GAINING_ROSTER
        )
    }

    const toggleLosingPanel = () => {
        props.menuSelectHandler(
            ROSTER_MENU_SELECT_ITEM.TOGGLE_LOSING_ROSTER
        )
    }

    const handleCurrentClick = () => {
        toggleCurrentPanel();
    }

    const handleProjectedClick = () => {
        toggleProjectedPanel();
    }

    const handleGainingClick = () => {
        toggleGainingPanel();
    }

    const handleLosingClick = () => {
        toggleLosingPanel();
    }

    const currentSelectorClassName = clsx({
        [classes.selected]: props.showCurrentPanel,
        [classes.unselected]: !props.showCurrentPanel,
    });

    const projectedSelectorClassName = clsx({
        [classes.selected]: props.showProjectedPanel,
        [classes.unselected]: !props.showProjectedPanel,
    });

    const gainingSelectorClassName = clsx({
        [classes.selected]: props.showGainingPanel,
        [classes.unselected]: !props.showGainingPanel,
    });

    const losingSelectorClassName = clsx({
        [classes.selected]: props.showLosingPanel,
        [classes.unselected]: !props.showLosingPanel,
    });

    return (
        <div className={classNames('roster_menu', props.className)}>
            <div className={classes.root}>
                <MenuList>
                    <MenuItem className={currentSelectorClassName} onClick={handleCurrentClick}>
                        <div className={classes.iconArea}>
                            <AssignmentIcon/>
                        </div>
                        {props.expanded ? <span className={classNames('menu_item_text',currentSelectorClassName)}>
                    Current
                    </span> : ''}
                        {props.showCurrentPanel ? <div className={'selected_bar'}/> : ''}
                    </MenuItem>
                    <MenuItem className={gainingSelectorClassName} onClick={handleGainingClick}>
                        <div className={classes.iconArea}>
                            <AddIcon/>
                        </div>
                        {props.expanded ? <span className={gainingSelectorClassName}>
                        Gaining
                        </span> : ''}
                        {props.showGainingPanel ? <div className={'selected_bar'}/> : ''}
                    </MenuItem>
                    <MenuItem className={losingSelectorClassName} onClick={handleLosingClick}>
                        <div className={classes.iconArea}>
                            <RemoveIcon/>
                        </div>
                        {props.expanded ? <span className={losingSelectorClassName}>
                        Losing
                        </span> : ''}
                        {props.showLosingPanel ? <div className={'selected_bar'}/> : ''}
                    </MenuItem>
                    <MenuItem className={projectedSelectorClassName} onClick={handleProjectedClick}>
                        <div className={classes.iconArea}>
                            <UpdateIcon/>
                        </div>
                        {props.expanded ? <span className={projectedSelectorClassName}>
                        Projected
                        </span> : ''}
                        {props.showProjectedPanel ? <div className={'selected_bar'}/> : ''}
                    </MenuItem>
                </MenuList>

            </div>
        </div>
    )
}

export const StyledRosterMenu = styled(RosterMenu)`
height: 100%;
position: relative;
display: block;
outline: none;
li{
padding-left: 12px;
}
ul {
text-rendering: optimizeLegibility;
width: 100%;
outline: none;
}
span {
text-rendering: optimizeLegibility;
text-shadow: 0 1px 1px rgba(0,0,0,.5);
padding-left: 8px;
}
.selected_bar {
position: absolute;
height: 100%;
right: 0;
flex-shrink: 0;
width: 3px;
background-color: ${theme.color.itemSelected};
}
`;

export {
    ROSTER_MENU_SELECT_ITEM as ROSTER_MENU_SELECT_ACTION,
};