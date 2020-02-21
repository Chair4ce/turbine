import { Reducer } from 'redux';
import { GainingState, GainingActionTypes } from './types';
import GainingModel from "./GainingModel";
import {GainingDeserializer} from "../../util/GainingDeserializer";

// Type-safe initialState!
export const initialState: GainingState = {
    data: [] as GainingModel[],
    errors: undefined,
    loading: false,
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<GainingState> = (state = initialState, action) => {
    switch (action.type) {
        case GainingActionTypes.FETCH_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case GainingActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, data: GainingDeserializer.deserialize(action.payload)};
        }
        case GainingActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as gainingReducer };
export { initialState as GainingInitState };
