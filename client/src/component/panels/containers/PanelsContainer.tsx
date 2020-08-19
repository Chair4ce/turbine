import React, {lazy, Suspense, useEffect} from "react";

import styled from "styled-components";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {
    getDistinctGainingAFSCCollection,
    getGainingMembers,
    getMembers,
    getOfficeCollection,
    getUniqueAFSCCollection
} from "../../../store/members/thunks";
import GenericGroupCollectionModel from "../../../store/members/models/GenericGroupCollectionModel";
import GenericGainingGroupCollectionModel from "../../../store/members/models/GenericGainingGroupCollectionModel";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {getChartData} from "../../../store/positions/thunks";
import CurrentRosterPanel from "../CurrentRosterPanel";
import GainingRosterPanel from "../GainingRosterPanel";

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
    useEffect(() => {
                dispatch(getGainingMembers());
                dispatch(getDistinctGainingAFSCCollection());
        return function cleanup() {
        }
    }, [props.showCurrentPanel]);

    useEffect(() => {
        dispatch(getMembers());
        dispatch(getOfficeCollection());
        dispatch(getUniqueAFSCCollection());
        dispatch(getOfficeCollection());
        return function cleanup() {
            console.log("done");
        }
    }, [props.showGainingPanel]);



    return (
        <section className={classNames(classes.root, props.className)}>
            <div className={classes.table}>
                {props.showCurrentPanel &&
                    <CurrentRosterPanel members={currentMembers} loading={loading} collectionAFSC={currentCollectionAFSC} collectionOffice={currentCollectionOffices} callback={props.callback}/>}
                {props.showGainingPanel &&
                    <GainingRosterPanel members={gainingMembers} loading={gainingLoading} collectionAFSC={gainingCollectionAFSCs} callback={props.callback}/>}
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