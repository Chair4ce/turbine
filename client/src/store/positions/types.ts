import PositionModel from "./models/PositionModel";
import UnassignedMemberModel from "./models/UnassignedMemberModel";
import DoubleBilletModel from "./models/DoubleBilletModel";

export enum PositionActionTypes {
    FETCH_REQUEST = '@@positions/FETCH_REQUEST',
    FETCH_ERROR = '@@positions/FETCH_ERROR',
    FETCH_SUCCESS = '@@positions/FETCH_SUCCESS',

    FETCH_UNASSIGNED_REQUEST = '@@positions/FETCH_UNASSIGNED_EQUEST',
    FETCH_UNASSIGNED_ERROR = '@@positions/FETCH_UNASSIGNED_ERROR',
    FETCH_UNASSIGNED_SUCCESS = '@@positions/FETCH_UNASSIGNED_SUCCESS',
}

export interface PositionState {
    readonly loading: boolean;
    readonly positions: PositionModel[];
    readonly error?: string ;

    readonly unassignedLoading: boolean;
    readonly unassignedMembers: UnassignedMemberModel[];
    readonly unassignedError?: string;

}