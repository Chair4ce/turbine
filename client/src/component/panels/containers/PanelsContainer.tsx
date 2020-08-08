import React, {lazy, Suspense, useEffect} from "react";

import styled from "styled-components";
import classNames from "classnames";
import CurrentRosterPanel from "../CurrentRosterPanel";
import theme from "../../../style/theme";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {
    getDistinctGainingAFSCCollection,
    getGainingMembers,
    getMembers,
    getOfficeCollection,
    getUniqueAFSCCollection
} from "../../../store/members/thunks";
import MemberModel from "../../../store/members/models/MemberModel";
import GainingRosterPanel from "../GainingRosterPanel";
import GenericGroupCollectionModel from "../../../store/members/models/GenericGroupCollectionModel";
import GenericGainingGroupCollectionModel from "../../../store/members/models/GenericGainingGroupCollectionModel";
import LoadingSpinner from "../../displayLoading/LoadingSpinner";
import SkeletonPanelG from "../SkeletonPanelG";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Fade, Zoom} from "@material-ui/core";
import SkeletonPanelC from "../SkeletonPanelC";
import {Skeleton} from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative',
            display: 'block',
            width: '100%',
            height: '100%',
        },
        table: {
            width: '100%',
            position: 'relative',
            boxSizing: 'border-box',
            display: 'flex',
            padding: '12px 4px 12px 12px',
            height: '100%',
            verticalAlign: 'baseline',
        }
    }),
);

interface Props {
    showCurrentPanel?: boolean;
    showProjectedPanel?: boolean;
    showGainingPanel?: boolean;
    showLosingPanel?: boolean;
    showPositionPanel?: boolean;
    callback: (type: string) => void;
    className?: string;
}

const PanelsContainer: React.FC<Props> = props => {
    const classes = useStyles();

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getMembers());
        dispatch(getGainingMembers());
        dispatch(getUniqueAFSCCollection());
        dispatch(getDistinctGainingAFSCCollection());
        dispatch(getOfficeCollection());
    }, [dispatch]);


    return (
        <section className={classNames(classes.root, props.className)}>
            <div className={classes.table}>

                {props.showCurrentPanel ?
                    <CurrentRosterPanel callback={props.callback}/> : null}
                {props.showGainingPanel ?
                    <GainingRosterPanel callback={props.callback}/> : null}

            </div>
        </section>
    )
}

export const StyledPanelsContainer = styled(PanelsContainer)`

//.panel_header_action_area_upload {
//height: 32px;
//    -webkit-transition: background-color 100ms ease-in;
//    -moz-transition: background-color 100ms ease-in;
//    -o-transition: background-color 100ms ease-in;
//    transition: background-color 100ms ease-in;
//  :hover {
//  background-color: rgba(119,119,119,0.27);
//  }
//}



.moreDots {
width: 10px;
}

.upload_btn {
display: flex;
align-items: center;
justify-content: center;
background-color: transparent;
color: white;
border: none;
outline: none;
cursor: pointer;
height: 34px;
width: 90px;
padding: 0;
border-radius: 4px;
-webkit-transition: background-color 100ms ease-in;
-moz-transition: background-color 100ms ease-in;
-o-transition: background-color 100ms ease-in;
transition: background-color 100ms ease-in;
 :hover {
  background-color: rgb(255,133,36);
 }
}




  


`;