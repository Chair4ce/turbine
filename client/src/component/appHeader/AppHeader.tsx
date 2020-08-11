import * as React from "react";
import classNames from "classnames";
import TurbineLogo from "../icon/TurbineLogo";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textRendering: 'optimizeLegibility',
            display: 'block',
            width: '100%',
            height: '100%',
            backgroundColor: '#313131',
            borderBottom: '1px solid #212121',
            minWidth: 1000,
        },
        logo_area: {
            display: 'flex',
            alignContent: 'start',
            marginLeft: 3,
        },
        app_title_text: {
            color: '#ffffff',
            padding: 0,
            margin: 0,
            paddingTop: 3,
            alignItems: 'start',
            height: '100%',
            display: 'flex',
            width: 'min-content',
            fontFamily: 'Rambla',
            fontSize: 24,
            fontStyle: 'normal',
            fontWeight: 'normal',
        },
        headerMenu: {

            height: 28,
            width: '100%'
        },
        headerMenuBtns: {
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            width: 300,
            height: 28
        },
        menuBtn: {
            position: 'relative',
            width: 100,
            height: 20,
            outline: 'none',
            border: 'none',
            fontSize: 13,
            background: 'transparent',
            color: '#fff',
            zIndex: 3000,
            fontFamily: 'Rambla',
            borderRadius: 0,
            '&:hover': {
                fontWeight: 'bold',
                borderBottom: '1px solid #C4C4C4'
            },
            cursor: 'pointer'
        },
        menuBtnDivider: {
            position: 'relative',
            backgroundColor: '#ffff',
            height: 20,
            width: 2
        }
    }),
);

interface Props {
    menuSelectHandler: (type: string) => void;
    className?: string;
}

    const HEADER_MENU_SELECT_ITEM = {
        SHOW_MAIN_SECTION: 'HEADER_MENU/SHOW_MAIN_SECTION',
        SHOW_HEALTH_SECTION: 'HEADER_MENU/SHOW_HEALTH_SECTION',
    }

const MainHeader: React.FC<Props> = props => {
    const classes = useStyles();

    const showMainSection = () => {
        props.menuSelectHandler(
            HEADER_MENU_SELECT_ITEM.SHOW_MAIN_SECTION
        )
    }

    const showHealthSection = () => {
        props.menuSelectHandler(
            HEADER_MENU_SELECT_ITEM.SHOW_HEALTH_SECTION
        )
    }
    return (
        <header className={classNames(classes.root, props.className)}>
            <div className={classes.logo_area}>
                <TurbineLogo/>
            <h1 className={classes.app_title_text}>Turbine</h1>
            </div>
            <div className={classes.headerMenu}>
                <div className={classes.headerMenuBtns}>
                <Button id={'MainSectionBtn'} className={classes.menuBtn} onClick={showMainSection}> Members</Button>
                    <div className={classes.menuBtnDivider}/>
                    <Button id={'HealthSectionBtn'} className={classes.menuBtn} onClick={showHealthSection}>Health</Button>
                </div>
            </div>
        </header>
    )
}

export default MainHeader;

export {
    HEADER_MENU_SELECT_ITEM as HEADER_MENU_SELECT_ACTION,
};