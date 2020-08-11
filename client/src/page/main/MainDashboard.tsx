import React, {useState} from 'react';
import MainHeader, {HEADER_MENU_SELECT_ACTION} from "../../component/appHeader/AppHeader";
import classNames from "classnames";
import MainSection from "./MainSection";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import HealthSection from "./HealthSection";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        header_container: {
            minWidth: 973,
            height: 66,
        }

    }),
);

interface Props {
    className?: string;
}

const MainDashboard: React.FC<Props> = props => {
    const [showMainSection, toggleMainSection] = useState(false);
    const [showHealthSection, toggleHealthSection] = useState(false);
    const classes = useStyles();


    const headerMenuSelectHandler = (type: string) => {
        switch (type) {
            case HEADER_MENU_SELECT_ACTION.SHOW_MAIN_SECTION:
                toggleHealthSection(false);
                toggleMainSection(true);
                break;
            case HEADER_MENU_SELECT_ACTION.SHOW_HEALTH_SECTION:
                toggleMainSection(false);
                toggleHealthSection(true);
                break;
        }
    }
    return (
        <div className={classNames(classes.root, props.className)}>
            <div className={classes.header_container}>
                <MainHeader menuSelectHandler={headerMenuSelectHandler}/>
            </div>
            {showMainSection && <MainSection/> }
            {showHealthSection && <HealthSection/> }
        </div>
    );
};

export default MainDashboard;






