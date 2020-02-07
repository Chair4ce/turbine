import { Reducer } from 'redux';
import { SquadronsState, SquadronActionTypes } from './types';
import SquadronModel from "./SquadronModel";
import {postNewSquadron} from "./sagas";

// Type-safe initialState!
export const initialState: SquadronsState = {
    squadrons: [] as SquadronModel[],
    errors: undefined,
    loading: false,
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<SquadronsState> = (state = initialState, action) => {
    switch (action.type) {
        case SquadronActionTypes.FETCH_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case SquadronActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, squadrons: action.payload };
        }
        case SquadronActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as squadronsReducer };