import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import * as React from "react";
import clsx from "clsx";
import classNames from "classnames";
import {MenuList} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';

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
    showManningChart: boolean;
    showAFSCPanelView: boolean;
    expanded: boolean;
    menuSelectHandler: (type: string) => void;
    className?: string;
}

const HEALTH_MENU_SELECT_ITEM = {
    TOGGLE_MANNING_CHART: 'HEALTH_MENU/TOGGLE_MANNING_CHART',
    TOGGLE_AFSC_PANEL_VIEW: 'HEALTHMENU/TOGGLE_AFSC_PANEL_VIEW',
}

const HealthMenu: React.FC<Props> = props => {
    const classes = useStyles();

    const toggleManningChart = () => {
        props.menuSelectHandler(
            HEALTH_MENU_SELECT_ITEM.TOGGLE_MANNING_CHART
        )
    }
    //
    const toggleAFSCPanelView = () => {
        props.menuSelectHandler(
            HEALTH_MENU_SELECT_ITEM.TOGGLE_AFSC_PANEL_VIEW
        )
    }
    //
    // const toggleGainingPanel = () => {
    //     props.menuSelectHandler(
    //         ROSTER_MENU_SELECT_ITEM.TOGGLE_GAINING_ROSTER
    //     )
    // }
    //
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
    //

    // const handleProjectedClick = () => {
    //     toggleProjectedPanel();
    // }
    //
    // const handleGainingClick = () => {
    //     toggleGainingPanel();
    // }
    //
    // const handleLosingClick = () => {
    //     toggleLosingPanel();
    // }
    //
    // const handlePositionClick = () => {
    //     togglePositionPanel();
    // }

    const chartSelectorClassName = clsx({
        [classes.selected]: props.showManningChart,
        [classes.unselected]: !props.showManningChart,
    });
    const AFSCPanelSelectorClassName = clsx({
        [classes.selected]: props.showAFSCPanelView,
        [classes.unselected]: !props.showAFSCPanelView,
    });
    //
    // const projectedSelectorClassName = clsx({
    //     [classes.selected]: props.showProjectedPanel,
    //     [classes.unselected]: !props.showProjectedPanel,
    // });
    //
    // const gainingSelectorClassName = clsx({
    //     [classes.selected]: props.showGainingPanel,
    //     [classes.unselected]: !props.showGainingPanel,
    // });
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
                {/*<MenuItem id={'manning_chart_toggle_btn'} className={classNames(classes.menu_btn, chartSelectorClassName)}*/}
                {/*          onClick={toggleManningChart}>*/}
                {/*    <div className={classes.iconArea}>*/}
                {/*        <MultilineChartIcon/>*/}
                {/*    </div>*/}
                {/*    {props.expanded ? <span className={classNames(classes.menu_item_text, chartSelectorClassName)}>*/}
                {/*    Manning*/}
                {/*    </span> : ''}*/}
                {/*    {props.showManningChart ? <div className={classes.selected_item}/> : ''}*/}
                {/*</MenuItem>*/}
                <MenuItem id={'gaining_roster_toggle_btn'}  className={classNames(classes.menu_btn, AFSCPanelSelectorClassName)}
                          onClick={toggleAFSCPanelView}>
                    <div className={classes.iconArea}>
                        <AmpStoriesIcon/>
                    </div>
                    {props.expanded ? <span className={classNames(classes.menu_item_text, AFSCPanelSelectorClassName)}>
                       AFSC info
                        </span> : ''}
                    {props.showAFSCPanelView ? <div className={classes.selected_item}/> : ''}
                </MenuItem>
                {/*<MenuItem className={classNames("losing_roster_toggle_btn",losingSelectorClassName)} onClick={handleLosingClick}>*/}
                {/*    <div className={classes.iconArea}>*/}
                {/*        <RemoveIcon/>*/}
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

export default HealthMenu;

export {
    HEALTH_MENU_SELECT_ITEM as HEALTH_MENU_SELECT_ACTION,
};