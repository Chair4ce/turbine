import React, {lazy, useEffect, Suspense} from "react";

import styled from "styled-components";
import classNames from "classnames";
import CurrentRosterPanel from "../CurrentRosterPanel";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {
    getDistinctGainingAFSCCollection,
    getGainingMembers,
    getMembers,
    getOfficeCollection,
    getUniqueAFSCCollection
} from "../../../store/members/thunks";
import GainingRosterPanel from "../GainingRosterPanel";
import GenericGroupCollectionModel from "../../../store/members/models/GenericGroupCollectionModel";
import GenericGainingGroupCollectionModel from "../../../store/members/models/GenericGainingGroupCollectionModel";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Simulate} from "react-dom/test-utils";
import LoadingSpinner from "../../displayLoading/LoadingSpinner";

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
    const currentMembers = useSelector(({members}: ApplicationState) => members.data);
    const loading = useSelector(({members}: ApplicationState) => members.loading);
    const gainingLoading = useSelector(({members}: ApplicationState) => members.gainingLoading);
    const currentCollectionAFSC: GenericGroupCollectionModel[] = useSelector(({members}: ApplicationState) => members.genericAFSCList);
    const currentCollectionOffices: GenericGroupCollectionModel[] = useSelector(({members}: ApplicationState) => members.officeCollection);
    const gainingMembers = useSelector(({members}: ApplicationState) => members.gainingData);
    const gainingCollectionAFSCs: GenericGainingGroupCollectionModel[] = useSelector(({members}: ApplicationState) => members.genericGainingAFSCList);
    const CurrentRoster = lazy(() => import('../CurrentRosterPanel'));
    const GainingRoster = lazy(() => import('../GainingRosterPanel'));
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
                <Suspense fallback={<div>Loading...</div>}>
                {props.showCurrentPanel ?
                    <CurrentRoster members={currentMembers} loading={loading} collectionAFSC={currentCollectionAFSC} collectionOffice={currentCollectionOffices} callback={props.callback}/>
                    : ''}
                {props.showGainingPanel ?
                    <GainingRoster members={gainingMembers} loading={gainingLoading} collectionAFSC={gainingCollectionAFSCs} callback={props.callback}/> : ''}
                    </Suspense>

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