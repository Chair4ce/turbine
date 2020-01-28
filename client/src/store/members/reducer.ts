import { Reducer } from 'redux';
import { MembersState, MemberActionTypes } from './types';
import MemberModel from "./MemberModel";

// Type-safe initialState!
export const initialState: MembersState = {
    data: [] as MemberModel[],
    errors: undefined,
    loading: false,
    feedbacks: 0,
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<MembersState> = (state = initialState, action) => {
    switch (action.type) {
        case MemberActionTypes.FETCH_REQUEST: {
            console.log('fetching members');
            return {
                ...state,
                loading: true
            };
        }
        case MemberActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, data: action.payload };
        }
        case MemberActionTypes.SEND_FEEDBACK_SUCCESS: {
            return {...state, feedbacks: action.payload}
        }
        case MemberActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as membersReducer };
