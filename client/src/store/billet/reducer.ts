import { Reducer } from 'redux';
import {BilletActionTypes, BilletState} from "./types";
import BilletModel from "./BilletModel";
import {BilletDeserializer} from "../../util/BilletDeserializer";

// Type-safe initialState!
export const initialState: BilletState = {
    data: [] as BilletModel[],
    errors: undefined,
    loading: false,
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<BilletState> = (state = initialState, action) => {
    switch (action.type) {
        case BilletActionTypes.FETCH_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case BilletActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, data: BilletDeserializer.deserialize(action.payload)};
        }
        case BilletActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        case BilletActionTypes.POST_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        case BilletActionTypes.POST_SUCCESS: {
            return {
                ...state,
                loading: false
            };
        }
        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as billetReducer };
export { initialState as BilletInitState };
