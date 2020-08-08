import * as React from "react";
import classNames from "classnames";
import TurbineLogo from "../icon/TurbineLogo";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textRendering: 'optimizeLegibility',
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#313131',
            borderBottom: '1px solid #212121',
            minWidth: 1000,
        },
        logo_area: {
            display: 'flex',
            alignContent: 'center',
            marginLeft: 3,
        },
        app_title_text: {
            color: '#ffffff',
            padding: 0,
            margin: 0,
            alignItems: 'center',
            height: '100%',
            display: 'flex',
            width: 'min-content',
            fontFamily: 'Rambla',
            fontSize: 24,
            fontStyle: 'normal',
            fontWeight: 'normal',
        }
    }),
);

interface Props {
    className?: string;
}

const MainHeader: React.FC<Props> = props => {
    const classes = useStyles();
    return (
        <header className={classNames(classes.root, props.className)}>
            <div className={classes.logo_area}>
                <TurbineLogo/>
            </div>
            <h1 className={classes.app_title_text}>Turbine</h1>
        </header>
    )
}

export default MainHeader;