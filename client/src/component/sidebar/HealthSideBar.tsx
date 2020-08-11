import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React from "react";
import clsx from "clsx";
import classNames from "classnames";
import {Button} from "@material-ui/core";
import CollapseIcon from "../icon/CollapseIcon";
import ExpandIcon from "../icon/ExpandIcon";
import HealthMenu from "../menus/HealthMenu";

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
    // showCurrentPanel: boolean;
    // showProjectedPanel: boolean;
    // showGainingPanel: boolean;
    // showLosingPanel: boolean;
    // showPositionPanel: boolean;
    // menu_item_select_callback: (type: string) => void;
    className?: string;
}

const HealthSideBar: React.FC<Props> = props => {
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
        <aside className={classNames(classes.root, drawerToggleClassName)}>
            <div className={classes.expand_btn_area}>
                <Button className={classNames(classes.toggleWidthBtn)} onClick={handleClick}>
                    {expanded ? <CollapseIcon/> : <ExpandIcon/>}
                </Button>
            </div>
            <div className={classes.menu_container}>
                <HealthMenu
                    expanded={expanded}
                />
            </div>
        </aside>
    )
}

export default HealthSideBar;