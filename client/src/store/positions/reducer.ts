import {Reducer} from "redux";
import {PositionActionTypes, PositionState} from "./types";
import PositionModel from "./models/PositionModel";
import MemberModel from "../members/models/MemberModel";
import ManningChartModel from "./models/ManningChartModel";
import UploadPositionModel from "./models/UploadPositionModel";
import StagingUploadPositionModel from "./models/StagingUploadPositionModel";


export const initialState: PositionState = {
    loading: false,
    success: false,
    positions: [] as PositionModel[],
    upload: [] as UploadPositionModel[],
    uploadStagingPosition: [] as StagingUploadPositionModel[],
    error: undefined,
    chartData: [] as ManningChartModel[],

    unassignedLoading: false,
    unassignedMembers: [] as MemberModel[],
    unassignedError: undefined,

    unFundedLoading: false,
    unFundedMembers: [] as MemberModel[],
    unFundedError: undefined,

    doubleBilletedLoading: false,
    doubleBilletedMembers: [] as MemberModel[],
    doubleBilletedError: undefined,
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<PositionState> = (state = initialState, action) => {
    switch (action.type) {
        case PositionActionTypes.FETCH_REQUEST: return {...state, loading: true};
        case PositionActionTypes.SET_SUCCESS: return {...state, success: action.payload};
        case PositionActionTypes.UPLOAD_POSITIONS_SUCCESS: return {...state, loading: false, success: true};
        case PositionActionTypes.STAGE_UPLOAD_DATA: return {...state, uploadStagingPosition: action.payload};
        case PositionActionTypes.FETCH_ERROR: return {...state, loading: false, error: action.payload};
        case PositionActionTypes.FETCH_SUCCESS:
            console.log("Position Success");
            return {...state, loading: false, success: true, positions: action.payload};
        case PositionActionTypes.STAGE_UPLOAD_DATA: return {...state, upload: action.payload};
        case PositionActionTypes.FETCH_CHARTDATA_SUCCESS: return {...state, loading: false, chartData: action.payload};
        case PositionActionTypes.FETCH_UNASSIGNED_REQUEST: return {...state, unassignedLoading: true};
        case PositionActionTypes.FETCH_UNASSIGNED_ERROR: return {...state, unassignedLoading: false, unassignedError: action.payload};
        case PositionActionTypes.FETCH_UNASSIGNED_SUCCESS: return {...state, unassignedLoading: false, unassignedMembers: action.payload};
        case PositionActionTypes.FETCH_UNFUNDED_REQUEST: return {...state, unfundedLoading: true};
        case PositionActionTypes.FETCH_UNFUNDED_SUCCESS: return {...state, unFundedLoading: false, unFundedMembers: action.payload};
        case PositionActionTypes.FETCH_UNFUNDED_ERROR: return {...state, unFundedLoading: false, unFundedError: action.payload};
        case PositionActionTypes.FETCH_DOUBLEBILLET_REQUEST: return {...state, doubleBilletLoading: true};
        case PositionActionTypes.FETCH_DOUBLEBILLET_ERROR: return {...state, doubleBilletLoading: false, doubleBilletError: action.payload};
        case PositionActionTypes.FETCH_DOUBLEBILLET_SUCCESS: return {...state, doubleBilletLoading: false, doubleBilletedMembers: action.payload};
        default: return state;
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export {reducer as positionReducer};
export {initialState as PositionInitState};