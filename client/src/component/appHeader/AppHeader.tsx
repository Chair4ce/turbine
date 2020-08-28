import * as React from "react";
import classNames from "classnames";
import TurbineLogo from "../icon/TurbineLogo";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Button, Typography} from "@material-ui/core";
import clsx from "clsx";
import ProfileMenu from "./ProfileMenu";
import {FullScreenDialog} from "./UploadModal";
import {setStaging} from "../../store/members/thunks";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textRendering: 'optimizeLegibility',
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: '#313131',
            borderBottom: '1px solid #212121',
            minWidth: 1000,
        },
        logo_area: {
            display: 'flex',
            alignContent: 'start',
        },
        titleArea: {
            display: 'block',
            width: '100%',
            height: '100%',
        },
        turbineLogo: {
            margin: '4px 8px 4px 8px'
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
            fontSize: 16,
            fontHeight: 19,
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
            height: 35
        },
        menuBtn: {
            position: 'relative',
            width: 100,
            height: 36,
            outline: 'none',
            border: 'none',
            fontSize: 13,
            background: 'transparent',
            color: '#fff',
            zIndex: 1200,
            fontFamily: 'Rambla',
            borderRadius: 0,
            '&:hover': {
                fontWeight: 'bold',
            },
            cursor: 'pointer'
        },
        menuBtnDivider: {
            position: 'relative',
            backgroundColor: 'rgb(196 196 196 / 43%)',
            height: 15,
            width: 1
        },
        selected: {
            borderBottom: '2px solid #5D8AA8',
        },
        unSelected: {},
        profileActions: {
            width: 100,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        uploadModalBtn: {
            width: 80,
            whiteSpace: 'nowrap'
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
    const [selected, setSelected] = React.useState('HEADER_MENU/SHOW_MAIN_SECTION');
    const dispatch = useDispatch();

    const classes = useStyles();
    const [uploadDialog, setUploadDialog] = React.useState(false);
    const handleClickOpen = () => {
        dispatch(setStaging(true));
        setUploadDialog(true);
    };
    const handleClickClose= () => {
        dispatch(setStaging(false));
        setUploadDialog(false);
    };

    const showMainSection = () => {
        setSelected(HEADER_MENU_SELECT_ITEM.SHOW_MAIN_SECTION);
        props.menuSelectHandler(
            HEADER_MENU_SELECT_ITEM.SHOW_MAIN_SECTION
        )
    }

    const showHealthSection = () => {
        setSelected(HEADER_MENU_SELECT_ITEM.SHOW_HEALTH_SECTION);
        props.menuSelectHandler(
            HEADER_MENU_SELECT_ITEM.SHOW_HEALTH_SECTION
        )
    }

    const MenuItemMainClassName = clsx({
        [classes.selected]: selected === 'HEADER_MENU/SHOW_MAIN_SECTION',
    });
    const MenuItemHealthClassName = clsx({
        [classes.selected]: selected === 'HEADER_MENU/SHOW_HEALTH_SECTION',
    });
    return (
        <header className={classNames(classes.root, props.className)}>
            <div className={classes.titleArea}>
                <div className={classes.logo_area}>
                    <div className={classes.turbineLogo}>
                        <TurbineLogo/>
                    </div>
                    <Typography className={classes.app_title_text}>Turbine</Typography>
                </div>
                <div className={classes.headerMenu}>
                    <div className={classes.headerMenuBtns}>
                        <button id={'MainSectionBtn'} className={classNames(classes.menuBtn, MenuItemMainClassName)}
                                onClick={showMainSection}> Members
                        </button>
                        <div className={classes.menuBtnDivider}/>
                        <button id={'HealthSectionBtn'} className={classNames(classes.menuBtn, MenuItemHealthClassName)}
                                onClick={showHealthSection}>Health
                        </button>
                    </div>
                </div>
            </div>
            <div className={classes.profileActions}>
                <Button variant="outlined" size="small" color="primary" onClick={handleClickOpen} className={classes.uploadModalBtn}>
                    Upload
                </Button>
                <FullScreenDialog callBack={handleClickClose} open={uploadDialog}/>
                {/*<ProfileMenu/>*/}

            </div>
        </header>
    )
}

export default MainHeader;

export {
    HEADER_MENU_SELECT_ITEM as HEADER_MENU_SELECT_ACTION,
};