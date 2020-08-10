import {PositionActionTypes} from "./types";
import {action} from "typesafe-actions";
import PositionModel from "./models/PositionModel";
import UnassignedMemberModel from "./models/UnassignedMemberModel";


export const positionsFetchRequest = () => action(PositionActionTypes.FETCH_REQUEST);
export const positionsFetchError = (message: string) => action(PositionActionTypes.FETCH_ERROR, message);
export const positionsFetchSuccess = (payload: PositionModel[]) => action(PositionActionTypes.FETCH_SUCCESS, payload);

export const unassignedMembersFetchRequest = () => action(PositionActionTypes.FETCH_UNASSIGNED_REQUEST);
export const unassignedMembersPostError = (message: string) => action(PositionActionTypes.FETCH_UNASSIGNED_REQUEST, message);
export const unassignedMembersPostSuccess = (payload: UnassignedMemberModel[]) => action(PositionActionTypes.FETCH_UNASSIGNED_SUCCESS, payload);
