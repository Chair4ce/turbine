import { Reducer } from 'redux';
import { FlightsState, FlightActionTypes } from './types';
import FlightModel from "./FlightModel";

// Type-safe initialState!
export const initialState: FlightsState = {
    flights: [] as FlightModel[],
    errors: undefined,
    loading: false,
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<FlightsState> = (state = initialState, action) => {
    switch (action.type) {
        case FlightActionTypes.FETCH_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case FlightActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, flights: action.payload };
        }
        case FlightActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as flightsReducer };
export { initialState as FlightInitState }