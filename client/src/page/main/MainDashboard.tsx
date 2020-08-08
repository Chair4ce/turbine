import React from 'react';
import MainHeader from "../../component/appHeader/AppHeader";
import classNames from "classnames";
import MainSection from "./MainSection";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        header_container: {
            minWidth: 973,
            height: 35,
        }

    }),
);

interface Props {
    className?: string;
}

const MainDashboard: React.FC<Props> = props => {

    const classes = useStyles();
    return (
        <div className={classNames(classes.root, props.className)}>
            <div className={classes.header_container}>
                <MainHeader/>
            </div>
            <MainSection/>
        </div>
    );
};

export default MainDashboard;






