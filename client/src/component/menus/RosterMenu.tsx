import * as React from "react";
import classNames from "classnames";
import {MenuList} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
// import UpdateIcon from '@material-ui/icons/Update';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FlightLandIcon from '@material-ui/icons/FlightLand';
// import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
            position: 'relative',
            display: 'block',
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
            color: '#C1C1C1'
        },
        hide: {
            visibility: 'hidden',
        },
        menu_btn: {
            textRendering: 'optimizeLegibility',
            width: '100%',
            outline: 'none',
        },
        menu_item_text: {
            textRendering: 'optimizeLegibility',
            textShadow: '0 1px 1px rgba(0,0,0,.5)',
            paddingLeft: 8,
            fontFamily: 'Rambla'
        },
        selected_item: {
            position: 'absolute',
            height: '100%',
            left: 0,
            flexShrink: 0,
            width: 3,
            backgroundColor: '#5D8AA8',
        }
    }),
);

interface Props {
    showCurrentPanel: boolean;
    showProjectedPanel: boolean;
    showGainingPanel: boolean;
    showLosingPanel: boolean;
    showPositionPanel: boolean;
    menuSelectHandler: (type: string) => void;
    expanded: boolean;
    className?: string;
}

const ROSTER_MENU_SELECT_ITEM = {
    TOGGLE_CURRENT_ROSTER: 'ROSTER_MENU/TOGGLE_CURRENT',
    TOGGLE_PROJECTED_ROSTER: 'ROSTER_MENU/TOGGLE_PROJECTED',
    TOGGLE_GAINING_ROSTER: 'ROSTER_MENU/TOGGLE_GAINING',
    TOGGLE_LOSING_ROSTER: 'ROSTER_MENU/TOGGLE_LOSING',
    TOGGLE_POSITION_PANEL: 'ROSTER_MENU/TOGGLE_POSITION'
}

const RosterMenu: React.FC<Props> = props => {
    const classes = useStyles();

    const toggleCurrentPanel = () => {
        props.menuSelectHandler(
            ROSTER_MENU_SELECT_ITEM.TOGGLE_CURRENT_ROSTER
        )
    }
    //
    // const toggleProjectedPanel = () => {
    //     props.menuSelectHandler(
    //         ROSTER_MENU_SELECT_ITEM.TOGGLE_PROJECTED_ROSTER
    //     )
    // }

    const toggleGainingPanel = () => {
        props.menuSelectHandler(
            ROSTER_MENU_SELECT_ITEM.TOGGLE_GAINING_ROSTER
        )
    }

    // const toggleLosingPanel = () => {
    //     props.menuSelectHandler(
    //         ROSTER_MENU_SELECT_ITEM.TOGGLE_LOSING_ROSTER
    //     )
    // }
    //
    // const togglePositionPanel = () => {
    //     props.menuSelectHandler(
    //         ROSTER_MENU_SELECT_ITEM.TOGGLE_POSITION_PANEL
    //     )
    // }

    const handleCurrentClick = () => {
        toggleCurrentPanel();
    }

    // const handleProjectedClick = () => {
    //     toggleProjectedPanel();
    // }
    //
    const handleGainingClick = () => {
        toggleGainingPanel();
    }
    //
    // const handleLosingClick = () => {
    //     toggleLosingPanel();
    // }
    //
    // const handlePositionClick = () => {
    //     togglePositionPanel();
    // }

    const currentSelectorClassName = clsx({
        [classes.selected]: props.showCurrentPanel,
        [classes.unselected]: !props.showCurrentPanel,
    });

    // const projectedSelectorClassName = clsx({
    //     [classes.selected]: props.showProjectedPanel,
    //     [classes.unselected]: !props.showProjectedPanel,
    // });

    const gainingSelectorClassName = clsx({
        [classes.selected]: props.showGainingPanel,
        [classes.unselected]: !props.showGainingPanel,
    });
    //
    // const losingSelectorClassName = clsx({
    //     [classes.selected]: props.showLosingPanel,
    //     [classes.unselected]: !props.showLosingPanel,
    // });
    //
    // const positionSelectorClassName = clsx({
    //     [classes.selected]: props.showPositionPanel,
    //     [classes.unselected]: !props.showPositionPanel,
    // });

    return (
        <div className={classNames(classes.root, props.className)}>
            <MenuList>
                <MenuItem id={'alpha_roster_toggle_btn'} className={classNames(classes.menu_btn, currentSelectorClassName)}
                          onClick={handleCurrentClick}>
                    <div className={classes.iconArea}>
                        <AssignmentIcon/>
                    </div>
                    {props.expanded ? <span className={classNames(classes.menu_item_text, currentSelectorClassName)}>
                    Current
                    </span> : ''}
                    {props.showCurrentPanel ? <div className={classes.selected_item}/> : ''}
                </MenuItem>
                <MenuItem id={'gaining_roster_toggle_btn'}  className={classNames(classes.menu_btn, gainingSelectorClassName)}
                          onClick={handleGainingClick}>
                    <div className={classes.iconArea}>
                        <FlightLandIcon/>
                    </div>
                    {props.expanded ? <span className={classNames(classes.menu_item_text, gainingSelectorClassName)}>
                        Gaining
                        </span> : ''}
                    {props.showGainingPanel ? <div className={classes.selected_item}/> : ''}
                </MenuItem>
                {/*<MenuItem className={classNames("losing_roster_toggle_btn",losingSelectorClassName)} onClick={handleUPMRClick}>*/}
                {/*    <div className={classes.iconArea}>*/}
                {/*   */}
                {/*    </div>*/}
                {/*    {props.expanded ? <span className={losingSelectorClassName}>*/}
                {/*    Losing*/}
                {/*    </span> : ''}*/}
                {/*    {props.showLosingPanel ? <div className={'selected_bar'}/> : ''}*/}
                {/*</MenuItem>*/}
                {/*<MenuItem className={classNames("projected_roster_toggle_btn",projectedSelectorClassName)} onClick={handleProjectedClick}>*/}
                {/*    <div className={classes.iconArea}>*/}
                {/*        <UpdateIcon />*/}
                {/*    </div>*/}
                {/*    {props.expanded ? <span className={projectedSelectorClassName}>*/}
                {/*    Projected*/}
                {/*    </span> : ''}*/}
                {/*    {props.showProjectedPanel ? <div className={'selected_bar'}/> : ''}*/}
                {/*</MenuItem>*/}
                {/*<MenuItem className={classNames("position_roster_toggle_btn",positionSelectorClassName)} onClick={handlePositionClick}>*/}
                {/*    <div className={classes.iconArea}>*/}
                {/*        <AssignmentIndIcon/>*/}
                {/*    </div>*/}
                {/*    {props.expanded ? <span className={positionSelectorClassName}>*/}
                {/*    Positions*/}
                {/*    </span> : ''}*/}
                {/*    {props.showPositionPanel ? <div className={'selected_bar'}/> : ''}*/}
                {/*</MenuItem>*/}
            </MenuList>
        </div>
    )
}

export default RosterMenu;

export {
    ROSTER_MENU_SELECT_ITEM as ROSTER_MENU_SELECT_ACTION,
};