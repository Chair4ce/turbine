import {Reducer} from "redux";
import {PositionActionTypes, PositionState} from "./types";
import PositionModel from "./models/PositionModel";
import UnassignedMemberModel from "./models/UnassignedMemberModel";
import DoubleBilletModel from "./models/DoubleBilletModel";


export const initialState: PositionState = {
    loading: false,
    positions: [] as PositionModel[],
    error: undefined,

    unassignedLoading: false,
    unassignedMembers: [] as UnassignedMemberModel[],
    unassignedError: undefined,

};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<PositionState> = (state = initialState, action) => {
    switch (action.type) {
        case PositionActionTypes.FETCH_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case PositionActionTypes.FETCH_UNASSIGNED_REQUEST: {
            return {
                ...state,
                unassignedLoading: true
            };
        }
        case PositionActionTypes.FETCH_ERROR: {
            return {...state, loading: false, error: action.payload};
        }

        case PositionActionTypes.FETCH_UNASSIGNED_ERROR: {
            return {
                ...state,
                unassignedLoading: false, unassignedError: action.payload
            };
        }


        case PositionActionTypes.FETCH_SUCCESS: {
            return {...state, loading: false, data: action.payload};
        }


        case PositionActionTypes.FETCH_UNASSIGNED_SUCCESS: {
            return {...state, unassignedLoading: false, unassignedMembers: action.payload};
        }


        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export {reducer as positionReducer};
export {initialState as PositionInitState};