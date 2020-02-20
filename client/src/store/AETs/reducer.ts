import { Reducer } from 'redux';
import { AETsState, AETActionTypes } from './types';
import AETModel from "./AETModel";

// Type-safe initialState!
export const initialState: AETsState = {
    AETs: [] as AETModel[],
    errors: undefined,
    loading: false,
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<AETsState> = (state = initialState, action) => {
    switch (action.type) {
        case AETActionTypes.FETCH_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case AETActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, AETs: action.payload };
        }
        case AETActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as AETsReducer };
export { initialState as AETsInitState }