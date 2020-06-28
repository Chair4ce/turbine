import React, {useState} from "react";
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        paper: {
            marginRight: theme.spacing(2),
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
            color: 'rgb(86, 137, 159)'
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
    expanded: boolean;
    className?: string;
}

const RosterMenu: React.FC<Props> = props => {
    const classes = useStyles();
    const [currentSelected, setCurrentSelected] = useState(false);
    const [projectedSelected, setProjectedSelected] = useState(false);
    const [gainingSelected, setGainingSelected] = useState(false);
    const [losingSelected, setLosingSelected] = useState(false);

    const handleCurrentClick = () => {
        setCurrentSelected(prev => !prev);
    }
    const handleProjectedClick = () => {
        setProjectedSelected(prev => !prev);
    }
    const handleGainingClick = () => {
        setGainingSelected(prev => !prev);
    }
    const handleLosingClick = () => {
        setLosingSelected(prev => !prev);
    }
    const currentSelectorClassName = clsx({
        [classes.selected]: currentSelected,
        [classes.unselected]: !currentSelected,
    });

    const projectedSelectorClassName = clsx({
        [classes.selected]: projectedSelected,
        [classes.unselected]: !projectedSelected,
    });

    const gainingSelectorClassName = clsx({
        [classes.selected]: gainingSelected,
        [classes.unselected]: !gainingSelected,
    });

    const losingSelectorClassName = clsx({
        [classes.selected]: losingSelected,
        [classes.unselected]: !losingSelected,
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
                        {currentSelected ? <div className={'selected_bar'}/> : ''}
                    </MenuItem>
                    <MenuItem className={projectedSelectorClassName} onClick={handleProjectedClick}>
                        <div className={classes.iconArea}>
                            <UpdateIcon/>
                        </div>
                        {props.expanded ? <span className={projectedSelectorClassName}>
                        Projected

                        </span> : ''}
                        {projectedSelected ? <div className={'selected_bar'}/> : ''}
                    </MenuItem>
                    <MenuItem className={gainingSelectorClassName} onClick={handleGainingClick}>
                        <div className={classes.iconArea}>
                            <AddIcon/>
                        </div>
                        {props.expanded ? <span className={gainingSelectorClassName}>
                        Gaining
                        </span> : ''}
                        {gainingSelected ? <div className={'selected_bar'}/> : ''}
                    </MenuItem>
                    <MenuItem className={losingSelectorClassName} onClick={handleLosingClick}>
                        <div className={classes.iconArea}>
                            <RemoveIcon/>
                        </div>
                        {props.expanded ? <span className={losingSelectorClassName}>
                        Losing
                        </span> : ''}
                        {losingSelected ? <div className={'selected_bar'}/> : ''}
                    </MenuItem>
                </MenuList>

            </div>
        </div>
    )
}

export const StyledRosterMenu = styled(RosterMenu)`

position: relative;
display: block;
li{
padding-left: 12px;
}
ul {
text-rendering: optimizeLegibility;
width: 100%;
}
span {
padding-left: 8px;
}
.selected_bar {
position: absolute;
height: 100%;
right: 0;
flex-shrink: 0;
width: 3px;
background-color: rgb(86, 137, 159);
}
`;