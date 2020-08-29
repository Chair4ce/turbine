import {PositionActionTypes} from "./types";
import {action} from "typesafe-actions";
import PositionModel from "./models/PositionModel";
import MemberModel from "../members/models/MemberModel";
import ManningChartModel from "./models/ManningChartModel";
import UploadPositionModel from "./models/UploadPositionModel";


export const positionsFetchRequest = () => action(PositionActionTypes.FETCH_REQUEST);
export const positionsFetchError = (message: string) => action(PositionActionTypes.FETCH_ERROR, message);
export const positionsFetchSuccess = (payload: PositionModel[]) => action(PositionActionTypes.FETCH_SUCCESS, payload);
export const stagePositionUploadData = (payload: UploadPositionModel[]) => action(PositionActionTypes.STAGE_UPLOAD_DATA, payload);
export const chartDataFetchSuccess = (payload: ManningChartModel[]) => action(PositionActionTypes.FETCH_CHARTDATA_SUCCESS, payload);

export const unassignedMembersFetchRequest = () => action(PositionActionTypes.FETCH_UNASSIGNED_REQUEST);
export const unassignedMembersFetchError = (message: string) => action(PositionActionTypes.FETCH_UNASSIGNED_REQUEST, message);
export const unassignedMembersFetchSuccess = (payload: MemberModel[]) => action(PositionActionTypes.FETCH_UNASSIGNED_SUCCESS, payload);

export const unFundedMembersFetchRequest = () => action(PositionActionTypes.FETCH_UNFUNDED_REQUEST);
export const unFundedMembersFetchError = (message: string) => action(PositionActionTypes.FETCH_UNFUNDED_REQUEST, message);
export const unFundedMembersFetchSuccess = (payload: MemberModel[]) => action(PositionActionTypes.FETCH_UNFUNDED_SUCCESS, payload);

export const doubleBilletedFetchRequest = () => action(PositionActionTypes.FETCH_DOUBLEBILLET_REQUEST);
export const doubleBilletedPostError = (message: string) => action(PositionActionTypes.FETCH_DOUBLEBILLET_ERROR, message);
export const doubleBilletedPostSuccess = (payload: MemberModel[]) => action(PositionActionTypes.FETCH_DOUBLEBILLET_SUCCESS, payload);