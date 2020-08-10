import PositionModel from "./models/PositionModel";
import MemberModel from "../members/models/MemberModel";

export enum PositionActionTypes {
    FETCH_REQUEST = '@@positions/FETCH_REQUEST',
    FETCH_ERROR = '@@positions/FETCH_ERROR',
    FETCH_SUCCESS = '@@positions/FETCH_SUCCESS',

    FETCH_DOUBLEBILLET_REQUEST = '@@positions/FETCH_DOUBLEBILLET_EQUEST',
    FETCH_DOUBLEBILLET_ERROR = '@@positions/FETCH_DOUBLEBILLET_ERROR',
    FETCH_DOUBLEBILLET_SUCCESS = '@@positions/FETCH_DOUBLEBILLET_SUCCESS',

    FETCH_UNASSIGNED_REQUEST = '@@positions/FETCH_UNASSIGNED_EQUEST',
    FETCH_UNASSIGNED_ERROR = '@@positions/FETCH_UNASSIGNED_ERROR',
    FETCH_UNASSIGNED_SUCCESS = '@@positions/FETCH_UNASSIGNED_SUCCESS',
    FETCH_UNFUNDED_REQUEST = '@@positions/FETCH_UNFUNDED_EQUEST',
    FETCH_UNFUNDED_ERROR = '@@positions/FETCH_UNFUNDED_ERROR',
    FETCH_UNFUNDED_SUCCESS = '@@positions/FETCH_UNFUNDED_SUCCESS',
}

export interface PositionState {
    readonly loading: boolean;
    readonly positions: PositionModel[];
    readonly error?: string ;

    readonly unassignedLoading: boolean;
    readonly unassignedMembers: MemberModel[];
    readonly unassignedError?: string;

    readonly unFundedLoading: boolean;
    readonly unFundedMembers: MemberModel[];
    readonly unFundedError?: string;

    readonly doubleBilletedLoading: boolean;
    readonly doubleBilletedMembers: MemberModel[];
    readonly doubleBilletedError?: string;
}